from fastapi import FastAPI

app = FastAPI(
    title="Proyecto Login API",
    description="API REST para gestión de usuarios y autenticación con FastAPI y SQL Server",
    version="0.1"
)

@app.get("/")
def read_root():
    return {"mensaje": "¡Bienvenido a la API del Proyecto Login!"}