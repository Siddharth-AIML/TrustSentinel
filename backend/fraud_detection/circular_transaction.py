import networkx as nx

def detect_circular(graph):

    suspicious = []

    cycles = list(nx.simple_cycles(graph))

    for cycle in cycles:
        for acc in cycle:
            suspicious.append({
                "account_id": acc,
                "reason": "Circular transaction detected",
                "risk_level": "HIGH"
            })

    return suspicious