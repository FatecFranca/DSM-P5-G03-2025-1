import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
import joblib

# 1. Carregar a base
df = pd.read_csv("base.csv")

# (Opcional) Padronizar a posição
df['Pos'] = df['Pos'].str.split('-').str[0]

# 2. Separar X e y
X = df[['Pos', 'PPG', 'APG', 'RPG']]
y = df['Label']

# 3. Separar treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# 4. Pipeline com OneHot + Random Forest
preprocessador = ColumnTransformer(
    transformers=[
        ('onehot', OneHotEncoder(drop='first', handle_unknown='ignore'), ['Pos'])
    ],
    remainder='passthrough'
)

pipeline = Pipeline(steps=[
    ('preprocessamento', preprocessador),
    ('classificador', RandomForestClassifier(class_weight='balanced', random_state=42))
])

# 5. Treinar o modelo
pipeline.fit(X_train, y_train)

# 6. Salvar modelo treinado
joblib.dump(pipeline, 'modelo_classificador_nba.joblib')

print("✅ Modelo treinado e salvo com sucesso como 'modelo_classificador_nba.joblib'")
