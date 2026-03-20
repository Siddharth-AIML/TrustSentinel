def get_graph_edges(graph):

    edges = []

    for u, v, data in graph.edges(data=True):
        edges.append({
            "from": u,
            "to": v,
            "amount": data["weight"]
        })

    return edges