def generate_alerts(accounts):

    alerts = []

    for acc in accounts:

        alerts.append({
            "account_id": acc,
            "risk_level": "HIGH",
            "reason": "Rapid layering detected"
        })

    return alerts