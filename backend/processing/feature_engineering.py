def create_features(df):
    df["transaction_count"] = df.groupby("from_account")["transaction_id"].transform("count")
    return df