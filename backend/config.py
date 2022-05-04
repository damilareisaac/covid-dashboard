from flask import Flask
from decouple import config

CONFIG_URI = f"postgresql://{config('DB_USER')}:{config('DB_PASSWORD')}@localhost:5432/{config('DB_NAME')}"

app = Flask(__name__)
app.config["SECRET_KEY"] = config("SECRET_KEY")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = CONFIG_URI
app.config['FLASK_ADMIN_SWATCH'] = "cerulean"
app.config['CORS_HEADERS'] = 'Content-Type'