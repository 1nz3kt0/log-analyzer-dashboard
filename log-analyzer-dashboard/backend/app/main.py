from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal, engine, Base
from .models import LogEntry
from .auth import authenticate
from .utils import parse_log_file
from sqlalchemy.orm import Session
import shutil

app = FastAPI()
security = HTTPBasic()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload")
def upload_log(file: UploadFile = File(...), credentials: HTTPBasicCredentials = Depends(security), db: Session = Depends(get_db)):
    if not authenticate(credentials):
        raise HTTPException(status_code=401, detail="Unauthorized")
    tmp_path = f"/tmp/{file.filename}"
    with open(tmp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    entries = parse_log_file(tmp_path)
    for entry in entries:
        log_entry = LogEntry(**entry)
        db.add(log_entry)
    db.commit()
    return {"msg": "File parsed and data stored."}

@app.get("/logs")
def get_logs(severity: str = None, date: str = None, credentials: HTTPBasicCredentials = Depends(security), db: Session = Depends(get_db)):
    if not authenticate(credentials):
        raise HTTPException(status_code=401, detail="Unauthorized")
    query = db.query(LogEntry)
    if severity:
        query = query.filter(LogEntry.severity == severity)
    if date:
        query = query.filter(LogEntry.date.like(f"{date}%"))
    return query.all()