from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.usuario import UsuarioCreate, UsuarioOut
from app.schemas.rol import RolOut  
from app.models.usuario import Usuario, Rol
from app.controllers.auth_controller import get_db, admin_required, get_current_user, pwd_context
from app.schemas.usuario import UsuarioUpdate 

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

@router.get("/usuarios", response_model=list[UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db), admin=Depends(admin_required)):
    usuarios = db.query(Usuario).all()
    return usuarios

@router.get("/roles", response_model=list[RolOut])
def listar_roles(db: Session = Depends(get_db), admin=Depends(admin_required)):
    roles = db.query(Rol).all()
    return roles


@router.put("/usuarios/{idusuario}", response_model=UsuarioOut)
def actualizar_usuario(
    idusuario: int,
    request: UsuarioUpdate,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):
    usuario = db.query(Usuario).filter(Usuario.IdUsuario == idusuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if request.usuario:
        # Si cambia el nombre de usuario, verifica que no exista otro igual
        existe_usuario = db.query(Usuario).filter(Usuario.Usuario == request.usuario, Usuario.IdUsuario != idusuario).first()
        if existe_usuario:
            raise HTTPException(status_code=400, detail="El nombre de usuario ya existe")
        usuario.Usuario = request.usuario

    if request.nombre:
        usuario.Nombre = request.nombre

    if request.idrol is not None:
        usuario.IdRol = request.idrol

    if request.contraseña:
        usuario.Contraseña = pwd_context.hash(request.contraseña)

    db.commit()
    db.refresh(usuario)
    return usuario

@router.delete("/usuarios/{idusuario}", status_code=204)
def eliminar_usuario(
    idusuario: int,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):
    usuario = db.query(Usuario).filter(Usuario.IdUsuario == idusuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(usuario)
    db.commit()
    return

@router.get("/mi-perfil", response_model=UsuarioOut)
def leer_mi_perfil(
    db: Session = Depends(get_db), 
    usuario_actual: Usuario = Depends(get_current_user)
):
    # Busca el usuario actual por su id
    usuario = db.query(Usuario).filter(Usuario.IdUsuario == usuario_actual.IdUsuario).first()
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario