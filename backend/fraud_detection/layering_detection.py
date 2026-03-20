import networkx as nx

def detect_layering(graph):

    suspicious = []

    for node in graph.nodes():

        paths = nx.single_source_shortest_path(graph, node, cutoff=4)

        for path in paths.values():
            if len(path) >= 4:
                suspicious.append({
                    "account_id": path[0],
                    "reason": "Rapid layering detected",
                    "risk_level": "HIGH"
                })

    return suspicious