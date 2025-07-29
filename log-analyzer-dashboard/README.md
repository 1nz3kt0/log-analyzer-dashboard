# Log Analyzer Web (Open Source)

Aplicación web para visualizar y analizar archivos de logs del sistema.

## Tecnologías

- Backend: Python (FastAPI, SQLAlchemy, SQLite)
- Frontend: React, TailwindCSS, Chart.js
- Autenticación básica
- Docker y docker-compose

## Uso

1. Clonar el repositorio
2. `docker-compose up --build`
3. Accede al frontend en [http://localhost:3000](http://localhost:3000)

## Funcionalidades

- Login básico
- Carga de logs (syslog, auth.log, etc.)
- Parsing por severidad y fecha
- Gráficos interactivos