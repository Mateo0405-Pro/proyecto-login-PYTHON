from pydantic import BaseModel, EmailStr

class UsuarioCreate(BaseModel):
    usuario: str
    contraseña: str
    nombre: str
    email: EmailStr
    idrol: int  # 1 = Admin, 2 = Usuario

class UsuarioOut(BaseModel):
    IdUsuario: int
    Usuario: str
    Nombre: str
    Email: EmailStr
    IdRol: int
    Estado: bool

    class Config:
        orm_mode = True