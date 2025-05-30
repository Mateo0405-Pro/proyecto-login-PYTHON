from fastapi import FastAPI
from app.models.usuario import Rol, Usuario  # Esto va antes de todo
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Proyecto Login API",
    description="API REST para gestión de usuarios y autenticación con FastAPI y SQL Server",
    version="0.1"
)

# Configuración de orígenes permitidos para CORS (tu frontend)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8081",    # <-- Agregado para Vue frontend
    "http://127.0.0.1:8081",   # Opcional, por si usas esta ruta
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite solo estos orígenes
    allow_credentials=True,
    allow_methods=["*"],    # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc)
    allow_headers=["*"],    # Permite todos los headers
)


# Después importa y registra las rutas
from app.routes.auth_routes import router as auth_router
app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"mensaje": "¡Bienvenido a la API del Proyecto Login!"}

from app.database import SessionLocal
from sqlalchemy import text

@app.get("/prueba-db")
def prueba_db():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        return {"ok": True, "mensaje": "Conexión exitosa con SQL Server"}
    except Exception as e:
        return {"ok": False, "error": str(e)}

from app.routes.usuario_routes import router as usuario_router
app.include_router(usuario_router)