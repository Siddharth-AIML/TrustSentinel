from fastapi import APIRouter
from processing.data_loader import load_transactions
from graph.graph_builder import build_graph, graph_to_json
import pandas as pd

# 🔥 Import ALL detection modules
from fraud_detection.layering_detection import detect_layering
from fraud_detection.circular_transaction import detect_circular
from fraud_detection.structuring_detection import detect_structuring
from fraud_detection.behaviour_anomaly import detect_anomaly
from fraud_detection.dormant_account_detection import detect_dormant

router = APIRouter()

# ---------------------------------------------------
# 🔥 Helper: merge + remove duplicates
# ---------------------------------------------------
def merge_alerts(*args):

    combined = []

    for alert_list in args:
        combined.extend(alert_list)

    # remove duplicates
    unique = {}
    for a in combined:
        key = (a["account_id"], a["reason"])
        unique[key] = a

    return list(unique.values())


# ---------------------------------------------------
# Existing alert endpoint (for default dataset)
# ---------------------------------------------------
@router.get("/alerts")
def get_alerts():

    df = load_transactions()

    graph = build_graph(df)

    # 🔥 Run ALL detections
    layering = detect_layering(graph)
    circular = detect_circular(graph)
    structuring = detect_structuring(df)
    anomaly = detect_anomaly(df)
    dormant = detect_dormant(df)

    alerts = merge_alerts(layering, circular, structuring, anomaly, dormant)

    return {
        "alerts": alerts,
        "graph": graph_to_json(graph)
    }


# ---------------------------------------------------
# 🔥 MAIN endpoint (USED BY FRONTEND)
# ---------------------------------------------------
@router.post("/analyze")
def analyze(data: dict):

    try:
        transactions = data.get("transactions", [])

        print("RAW TRANSACTIONS:", transactions[:2])  # DEBUG

        df = pd.DataFrame(transactions)
      
        if df.empty:
            return {"error": "No transaction data received"}
        # 🔥 CLEAN DATA (VERY IMPORTANT)
        df.columns = df.columns.str.strip().str.lower()

        df = df.rename(columns={
             "source": "from_account",
            "destination": "to_account"
        })

        df["from_account"] = df["from_account"].astype(str).str.strip()
        df["to_account"] = df["to_account"].astype(str).str.strip()
        df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

        df = df.dropna()
        # 🔥 CRITICAL FIX (THIS IS YOUR BUG)
        df["amount"] = df["amount"].astype(str).str.replace(",", "").str.strip()
        df["amount"] = pd.to_numeric(df["amount"], errors="coerce")
        

        print("CLEAN DF:\n", df.head())
        print("DTYPES:\n", df.dtypes)
        
        graph = build_graph(df)
        graph_data = graph_to_json(graph)

        # run detections
        layering = detect_layering(graph)
        circular = detect_circular(graph)
        structuring = detect_structuring(df)
        anomaly = detect_anomaly(df)
        dormant = detect_dormant(df)

        alerts = merge_alerts(layering, circular, structuring, anomaly, dormant)

        print("ALERTS:", alerts)

        return {
            "alerts": alerts,
            "graph": graph_data
        }

    except Exception as e:
        print("ERROR:", str(e))
        return {"error": str(e)}