import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db.database import engine, Base
from .router.user_router import router as router_user
from .router.auth_router import router as router_auth
from .router.history_router import router as router_history
from .router.classification_router import router as router_classification
from .core.config import settings

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}"
)

# Configuração de CORS
origins = [
    "http://localhost:3000",  # Origem permitida (ajuste conforme seu front)
    "http://127.0.0.1:3000",
    "*"  # Liberar qualquer origem
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await create_tables()

app.include_router(router_user)
app.include_router(router_auth)
app.include_router(router_history)
app.include_router(router_classification)
