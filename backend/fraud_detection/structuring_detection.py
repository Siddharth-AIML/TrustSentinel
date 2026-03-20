def detect_structuring(df):

    suspicious = []

    grouped = df.groupby("from_account")

    for acc, group in grouped:

        if len(group) >= 3:

            amounts = group["amount"]

            if amounts.max() - amounts.min() < 5000:
                suspicious.append({
                    "account_id": acc,
                    "reason": "Structuring detected",
                    "risk_level": "MEDIUM"
                })

    return suspicious