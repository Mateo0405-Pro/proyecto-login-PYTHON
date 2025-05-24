from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime
from app.database import Base  # SOLO esto

class Rol(Base):
    __tablename__ = "Roles"
    IdRol = Column(Integer, primary_key=True, index=True)
    NombreRol = Column(String(50), unique=True, nullable=False)

class Usuario(Base):
    __tablename__ = "Usuarios"
    IdUsuario = Column(Integer, primary_key=True, autoincrement=True)
    Usuario = Column(String(50), unique=True, nullable=False)
    Contraseña = Column(String(255), nullable=False)
    Nombre = Column(String(100), nullable=False)
    Email = Column(String(100), unique=True, nullable=False)
    IdRol = Column(Integer, ForeignKey("Roles.IdRol"), nullable=False)
    Estado = Column(Boolean, default=True)
    FechaCreacion = Column(DateTime, default=datetime.utcnow)