# Proyecto Login - API REST y Frontend Vue.js

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg) ![FastAPI](https://img.shields.io/badge/FastAPI-0.75-green.svg) ![Vue.js](https://img.shields.io/badge/Vue.js-3.2-brightgreen.svg) ![Pinia](https://img.shields.io/badge/Pinia-State--Management-yellow.svg) ![SQL Server](https://img.shields.io/badge/SQL%20Server-Database-orange.svg)

## Descripción

Proyecto Login es una aplicación web con backend desarrollado en **FastAPI** para la gestión de usuarios y autenticación, y frontend construido con **Vue.js 3**, **Pinia** para gestión de estado, y **Vue Router** para navegación.

Permite a usuarios autenticarse, ver su perfil, y para administradores gestionar usuarios (crear, listar, eliminar). Incluye control de acceso basado en roles y protección de rutas.

---

## Tecnologías usadas

- **Backend:**
  - Python 3.9+
  - FastAPI
  - SQLAlchemy
  - SQL Server (base de datos)
  - Uvicorn (servidor ASGI)
  - CORS Middleware configurado para comunicación segura con frontend

- **Frontend:**
  - Vue.js 3
  - Vue Router
  - Pinia (estado global)
  - Fetch API para consumo del backend
  - CSS personalizado y diseño responsivo moderno

---

## Instalación y configuración

### Backend

1. Crear entorno virtual y activar

```bash
python -m venv venv
# Linux/macOS
source venv/bin/activate
# Windows
venv\Scripts\activate

2. Instalar dependencias
pip install -r requirements.txt

3. Configurar conexión a SQL Server en app/database.py

4. Ejecutar servidor
uvicorn main:app --reload


#####################################################################################

Frontend

1. Navegar a la carpeta frontend
cd frontend

2. Instalar dependencias
npm install

3. Ejecutar servidor de desarrollo
npm run serve


Uso
- Accede al frontend (En mi caso http://localhost:8081)

- Inicia sesión con credenciales registradas

- Usuarios normales ven su perfil

- Usuarios con rol admin pueden gestionar usuarios

- Botón de cerrar sesión disponible para todos

Estructura del proyecto

backend/
 ├── app/
 │    ├── models/
 │    ├── routes/
 │    ├── database.py
 │    ├── main.py
frontend/
 ├── public/
 ├── src/
 │    ├── views/
 │    ├── components/
 │    ├── stores/
 │    ├── router/
 │    ├── main.js
 │    ├── App.vue
 │    ├── assets/


Seguridad

- Tokens JWT para autenticación

- Protección de rutas y recursos según rol

- CORS configurado en backend para permitir solo orígenes permitidos

Contacto
Mateo Perugachi
matheoperugachi3@gmail.com
GitHub: Mateo0405-Pro
