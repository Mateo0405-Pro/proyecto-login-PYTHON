from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SOLO esto, no importes modelos aquí
Base = declarative_base()

DB_USER = 'sa'  # Cambia por tu usuario SQL Server si no es 'sa'
DB_PASSWORD = 'root'  # Cambia por tu contraseña real
DB_SERVER = 'localhost'
DB_PORT = '1433'
DB_NAME = 'ProyectoLogin'

DATABASE_URL = (
    f"mssql+pyodbc://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}:{DB_PORT}/{DB_NAME}?driver=ODBC+Driver+17+for+SQL+Server"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)