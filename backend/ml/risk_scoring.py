from sklearn.ensemble import IsolationForest
import numpy as np

def compute_risk(amounts):

    model = IsolationForest(contamination=0.2)

    amounts = np.array(amounts).reshape(-1,1)

    model.fit(amounts)

    scores = model.decision_function(amounts)

    return scores.tolist()