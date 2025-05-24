from pydantic import BaseModel

class LoginRequest(BaseModel):
    usuario: str
    contraseña: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"