import networkx as nx

import networkx as nx

def build_graph(df):

    G = nx.MultiDiGraph()   # 🔥 FIXED

    for _, row in df.iterrows():

        sender = str(row["from_account"]).strip()
        receiver = str(row["to_account"]).strip()
        amount = float(row["amount"])

        G.add_edge(sender, receiver, weight=amount)

    return G

def graph_to_json(G):

    nodes = []
    links = []

    for node in G.nodes():
        nodes.append({"id": node})

    for source, target, key, data in G.edges(keys=True, data=True):
        links.append({
            "source": source,
            "target": target,
            "amount": data.get("weight", 0)
        })

    return {
        "nodes": nodes,
        "links": links
    }