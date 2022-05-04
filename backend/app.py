"""App API"""

import json
from flask import jsonify
from config import app
from model import load_data_to_db, Case, db
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import cast
from sqlalchemy import func, Integer, Float, desc
from admin import *
from flask_cors import CORS, cross_origin

Session = sessionmaker(bind=db.engine)
session = Session()
cors = CORS(app)

def get_json_dumps(query_list):
    """
    Accept: 
        query_list -> list of Model Object
    Return sorted list of json objects

    """
    query_list_dict = [case._asdict() for case in query_list]
    return json.dumps(query_list_dict)


@app.route('/total_case_statistics')
@cross_origin()
def total_case_statistics():

    """
    Get total confirmed cases and total death
    return {total_case -> int, total_death -> int} -> dict
    """
    statistics = session.query(
        cast(func.sum(Case.confirmed), Integer).label('total_case'),
        cast(func.sum(Case.death), Integer).label('total_death')
    ).first()
    return jsonify(statistics._asdict())




@app.route('/total_vaccination_doses')
@cross_origin()
def total_case_vaccination_doses():

    """
    Get total  vaccinaction doses
    return {total_doses -> int} -> dict
    """

    statistics = session.query(
        cast(func.sum(Vaccination.doses_admin), Float).label('total_doses')
    ).first()
    return jsonify(statistics._asdict())


@app.route('/vaccination_doses_by_country')
@cross_origin()
def vaccination_doses_by_country():

    """
    Get  vaccinaction doses by country
    return [{country => str, total_doses -> int} -> dict] -> list
    """

    does_by_country = session.query(
        Vaccination.country,
        cast(func.sum(Vaccination.doses_admin), Float).label('total_doses')
    ).group_by(Vaccination.country).order_by(desc('total_doses')).filter(
        Vaccination.country != 'World', 
        Vaccination.country != 'US (Aggregate)').all()
    return get_json_dumps(does_by_country)




@app.route('/sum_of_cases_by_country')
@cross_origin()
def sum_of_cases_by_country():

    """
    Get the sum of cases (confirmed and death) by country
    return [{country => str, confirmed -> int, death -> int} -> dict ] -> list
    """
    case_aggregrate = session.query(
        Case.country,
        cast(func.sum(Case.confirmed), Integer).label('confirmed'),
        cast(func.sum(Case.death), Integer).label('death')
        ).group_by(Case.country).order_by(desc('confirmed')).all()
    return get_json_dumps(case_aggregrate)

@app.route('/vaccination_time_series')
@cross_origin()
def vaccination_time_series():

    """
    Get vacciantion dosage by time series
    return [{dose_admin -> int, date -> datetime } -> dict ] -> list
    """
    time_series = session.query(
        cast(func.sum(Vaccination.doses_admin), Float).label('y'),
        Vaccination.vaccinated_date.label('x')
    ).group_by(Vaccination.vaccinated_date).all()
    time_series_dict = [series_._asdict() for series_ in time_series]
    return  json.dumps(time_series_dict)




@app.route('/')
@cross_origin()
def home():
    """
    API Home page, use to load that to DB
    """
    load_data_to_db()
    return jsonify({'home': 'Welcome'})




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
