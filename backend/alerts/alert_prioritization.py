def prioritize(alerts):

    return sorted(alerts, key=lambda x: x["risk_level"])