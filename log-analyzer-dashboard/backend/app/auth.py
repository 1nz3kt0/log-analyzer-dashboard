from fastapi.security import HTTPBasicCredentials

def authenticate(credentials: HTTPBasicCredentials):
    # Usuario y contraseña básicos
    return credentials.username == "admin" and credentials.password == "admin"