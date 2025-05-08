import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'super-secret-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://Mikoto:0@localhost:5432/saw_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
