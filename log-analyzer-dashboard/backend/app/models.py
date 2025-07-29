from sqlalchemy import Column, Integer, String, DateTime
from .database import Base

class LogEntry(Base):
    __tablename__ = "log_entries"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, index=True)
    severity = Column(String, index=True)
    message = Column(String)
    source_ip = Column(String, nullable=True)