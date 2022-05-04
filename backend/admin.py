from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from app import app
from model import Session, Vaccination, Case

admin = Admin(app, name='Zenysis Analytics Database', template_mode='bootstrap3')

admin.add_view(ModelView(Case, Session))
admin.add_view(ModelView(Vaccination, Session))