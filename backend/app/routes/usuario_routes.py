from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.usuario import UsuarioCreate, UsuarioOut
from app.models.usuario import Usuario
from app.controllers.auth_controller import get_db, admin_required, pwd_context

router = APIRouter()

@router.post("/usuarios", response_model=UsuarioOut, status_code=status.HTTP_201_CREATED)
def crear_usuario(request: UsuarioCreate, db: Session = Depends(get_db), admin=Depends(admin_required)):
    # Verifica que el usuario y el email no existan
    if db.query(Usuario).filter(Usuario.Usuario == request.usuario).first():
        raise HTTPException(status_code=400, detail="El nombre de usuario ya existe")
    if db.query(Usuario).filter(Usuario.Email == request.email).first():
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    # Hashea la contraseña antes de guardar
    hashed_pw = pwd_context.hash(request.contraseña)
    nuevo_usuario = Usuario(
        Usuario=request.usuario,
        Contraseña=hashed_pw,
        Nombre=request.nombre,
        Email=request.email,
        IdRol=request.idrol,
        Estado=True
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario