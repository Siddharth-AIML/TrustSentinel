def detect_dormant(df):

    suspicious = []

    grouped = df.groupby("from_account")

    for acc, group in grouped:

        amounts = group["amount"].tolist()

        if len(amounts) >= 3:

            if max(amounts[:-1]) < 10000 and amounts[-1] > 50000:
                suspicious.append({
                    "account_id": acc,
                    "reason": "Dormant account spike",
                    "risk_level": "HIGH"
                })

    return suspicious