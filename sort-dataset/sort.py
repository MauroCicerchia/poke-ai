import pandas as pd

df = pd.read_csv("../build-dataset/pokemon_data.csv", index_col=0)
df.sort_index(inplace=True)

df.to_csv("pokemon_data.csv")