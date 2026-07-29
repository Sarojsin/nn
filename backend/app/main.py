from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import router
from app.core.config import get_settings
from app.core.database import engine
from app.models.models import Base

@asynccontextmanager
async def lifespan(_: FastAPI):
    # Development bootstrap. Production deployments must run Alembic migrations before startup.
    if get_settings().environment == "development":
        async with engine.begin() as connection: await connection.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

app = FastAPI(title="NAVYA API", version="1.0.0", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=get_settings().cors_origin_list, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(router, prefix="/api/v1", tags=["v1"])
@app.get("/health")
async def health(): return {"status": "ok"}
