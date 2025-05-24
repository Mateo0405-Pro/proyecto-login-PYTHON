from pydantic import BaseModel

class RolOut(BaseModel):
    IdRol: int
    NombreRol: str

    class Config:
        from_attributes = True 