from fastapi import HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.usuario import Usuario
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi import status
from jose.exceptions import JWTError

# Clave secreta para JWT (cambia esto por algo más seguro en producción)
SECRET_KEY = "supersecreto"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def autenticar_usuario(db: Session, usuario: str, contraseña: str):
    user = db.query(Usuario).filter(Usuario.Usuario == usuario).first()
    if not user or not pwd_context.verify(contraseña, user.Contraseña):
        return None
    return user

def crear_token(usuario):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": usuario.Usuario, "exp": expire, "rol": usuario.IdRol}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

bearer_scheme = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No autorizado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        user = db.query(Usuario).filter(Usuario.Usuario == username).first()
        if user is None:
            raise credentials_exception
        return user
    except JWTError:
        raise credentials_exception

def admin_required(user = Depends(get_current_user)):
    if user.IdRol != 1:  # Solo admin
        raise HTTPException(status_code=403, detail="Solo el administrador puede acceder")
    return user