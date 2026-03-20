def detect_anomaly(df):

    suspicious = []

    avg_amount = df["amount"].mean()

    for _, row in df.iterrows():

        if row["amount"] > 2 * avg_amount:
            suspicious.append({
                "account_id": row["from_account"],
                "reason": "Unusual high transaction",
                "risk_level": "MEDIUM"
            })

    return suspicious