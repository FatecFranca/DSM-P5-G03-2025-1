import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# Carregar a base
df = pd.read_csv("base_sem_classificacao.csv")

# Normalizar atributos
scaler = MinMaxScaler()
df[['PPG_norm', 'APG_norm', 'RPG_norm']] = scaler.fit_transform(df[['PPG', 'APG', 'RPG']])

# ----- Funções de Score por posição -----

def pontuacao_armador(row):
    return (
        row['PPG_norm'] * 0.45 +
        row['APG_norm'] * 0.50 +
        row['RPG_norm'] * 0.05
    )

def pontuacao_ala_armador(row):
    return (
        row['PPG_norm'] * 0.40 +
        row['APG_norm'] * 0.40 +
        row['RPG_norm'] * 0.20
    )

def pontuacao_ala(row):
    return (
        row['PPG_norm'] * 0.45 +
        row['RPG_norm'] * 0.35 +
        row['APG_norm'] * 0.20
    )

def pontuacao_ala_pivo(row):
    return (
        row['RPG_norm'] * 0.50 +
        row['PPG_norm'] * 0.35 +
        row['APG_norm'] * 0.15
    )

def pontuacao_pivo(row):
    return (
        row['RPG_norm'] * 0.60 +
        row['PPG_norm'] * 0.30 +
        row['APG_norm'] * 0.10
    )

# ----- Função para aplicar score por posição -----

def gerar_pontuacao(row):
    pos = row['Pos'].upper()
    if pos == 'PG':
        return pontuacao_armador(row)
    elif pos == 'SG':
        return pontuacao_ala_armador(row)
    elif pos == 'SF':
        return pontuacao_ala(row)
    elif pos == 'PF':
        return pontuacao_ala_pivo(row)
    elif pos == 'C':
        return pontuacao_pivo(row)
    else:
        return 0

# ----- Classificação por score -----

def classificar_por_pontuacao(score):
    if score >= 0.60:
        return 'Superstar'
    elif score >= 0.45:
        return 'All-Star'
    elif score >= 0.25:
        return 'Role Player'
    else:
        return 'Reserva'

# ----- Aplicar classificação -----
df['Score'] = df.apply(gerar_pontuacao, axis=1)
df['Label'] = df['Score'].apply(classificar_por_pontuacao)

# Salvar a nova base
df.to_csv("base_classificada_nova.csv", index=False)

# Exibir a distribuição final
print(df['Label'].value_counts())
