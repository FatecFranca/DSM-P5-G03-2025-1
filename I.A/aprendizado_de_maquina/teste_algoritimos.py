import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC

# 1. Carregar a base
df = pd.read_csv("base_sem_nome.csv")

print(df['Label'].value_counts())


# 2. Separar X e y
X = df[['Pos', 'PPG', 'APG', 'RPG']]
y = df['Label']

# 3. Separar treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# 4. Preparar codificação da coluna Pos
preprocessador = ColumnTransformer(
    transformers=[
        ('onehot', OneHotEncoder(drop='first', handle_unknown='ignore', sparse_output=False), ['Pos'])
    ],
    remainder='passthrough'
)

# 5. Modelos para comparar
modelos = {
    "Random Forest": RandomForestClassifier(class_weight='balanced', random_state=42),
    "SVM": SVC(),
    "Regressão Logística": LogisticRegression(max_iter=1000),
    "Naive Bayes": GaussianNB(),
    "Árvore de Decisão": DecisionTreeClassifier()
}

# 6. Loop para treinar e avaliar cada modelo
for nome, modelo in modelos.items():
    pipeline = Pipeline(steps=[
        ('preprocessamento', preprocessador),
        ('classificador', modelo)
    ])
    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)
    
    print(f"\n🧠 Modelo: {nome}")
    print(classification_report(y_test, y_pred))