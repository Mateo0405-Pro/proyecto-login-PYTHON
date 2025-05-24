from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.login import LoginRequest, LoginResponse
from app.controllers.auth_controller import get_db, autenticar_usuario, crear_token

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = autenticar_usuario(db, request.usuario, request.contraseña)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token = crear_token(user)
    return LoginResponse(access_token=token)