from flask_sqlalchemy import SQLAlchemy
from config import app
import pandas as pd
from serilaizer import Serializer

db = SQLAlchemy(app)
Session = db.session


class Vaccination(db.Model, Serializer):

    """Vaccination Schema"""
    __tablename__ = 'vaccinations'

    id = db.Column(db.Integer, primary_key=True)
    vaccinated_date = db.Column(db.DateTime)
    doses_admin = db.Column(db.Integer)
    People_partially_vaccinated = db.Column(db.Integer)
    People_fully_vaccinated = db.Column(db.Integer)
    state = db.Column(db.String)
    country = db.Column(db.String)

    def __repr__(self):
        return f"Vaccination('{self.id}')"


class Case(db.Model, Serializer):

    """"Case Schema"""
    __tablename__ = 'cases'

    id = db.Column(db.Integer, primary_key=True)
    last_update = db.Column(db.DateTime)
    confirmed = db.Column(db.Integer)
    recovered = db.Column(db.Integer)
    death = db.Column(db.Integer)
    active = db.Column(db.Integer)
    state = db.Column(db.String)
    country = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)


def load_data_to_db():

    """load data from file to DB"""
    engine = db.engine
    case_df = pd.read_csv('cases.csv')
    case_df.drop(['X', 'Y', 'Admin2', 'FIPS', 'Combined_Key'], axis=1, inplace=True)
    column_mapping = {
        'OBJECTID': 'id',
        'Province_State': 'state',
        'Country_Region': 'country',
        'Last_Update': 'last_update',
        'Lat': 'latitude',
        'Long_': 'longitude',
        'Confirmed': 'confirmed',
        'Recovered': 'recovered',
        'Deaths': 'death',
        'Active': 'active',

    }
    case_df.rename(columns=column_mapping, inplace=True)
    case_df.to_sql('cases', con=engine, if_exists='replace', chunksize=5, method='multi')

    vaccination_df = pd.read_csv(
        'https://raw.githubusercontent.com/govex/COVID-19/master/data_tables/vaccine_data/global_data/time_series_covid19_vaccine_global.csv')
    vaccination_df.drop(['Report_Date_String', 'UID'], axis=1, inplace=True)
    vaccination_df.reset_index(inplace=True)
    column_mapping = {
        'Date': 'vaccinated_date',
        'Doses_admin': 'doses_admin',
        'Province_State': 'state',
        'Country_Region': 'country',
        'index': 'id'
    }
    vaccination_df.rename(columns=column_mapping, inplace=True)
    vaccination_df.to_sql('vaccinations', con=engine, if_exists='replace', chunksize=5, method='multi')


db.create_all()


