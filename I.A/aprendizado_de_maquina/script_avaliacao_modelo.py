import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Carregar a base
df = pd.read_csv("base_classificada.csv")

# Criar pasta de saída
output_dir = "/mnt/data/avaliacao_automatizada"
os.makedirs(output_dir, exist_ok=True)

# 1. Distribuição de classes
class_distribution = df['Label'].value_counts()
class_distribution.to_csv(f"{output_dir}/distribuicao_classes.csv")

# 2. Estatísticas descritivas por classe
stats_por_classe = df.groupby('Label')[['PPG', 'APG', 'RPG', 'Score']].describe()
stats_por_classe.to_csv(f"{output_dir}/estatisticas_por_classe.csv")

# 3. Gráficos de distribuição
sns.set(style="whitegrid")
for col in ['PPG', 'APG', 'RPG', 'Score']:
    plt.figure(figsize=(10, 6))
    sns.boxplot(data=df, x='Label', y=col, palette="Set3")
    plt.title(f'Distribuição de {col} por Classe')
    plt.savefig(f"{output_dir}/boxplot_{col}.png")
    plt.close()

# Arquivos gerados
import os
avaliacao_files = os.listdir(output_dir)
avaliacao_files
