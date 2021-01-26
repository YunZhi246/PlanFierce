# PlanFierce!

## Backend Development

### GraphQL Steps:
Load data with `python manage.py loaddata workouts` (or just run a `createWorkout` mutation :wink:)  
GraphQL playground at http://127.0.0.1:8000/graphql  
Sample queries in [queries.txt](backend/queries.txt)  
Sample mutations in [mutations.txt](backend/mutations.txt)


### Setup Steps:
1. Make database
1. Create virtual environment
1. Install pip requirements
1. Run Django migration
1. Create project superuser
1. Run server
1. Setup PyCharm

#### Make database
Check if postgres client exists  
`pg_config`  
Inside PSQL:
```
CREATE DATABASE db;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE db TO postgres;
```
To check if database is created:
```
\c db
\dt
```

#### Create virtual environment
Inside `backend` folder:
```
python -m pip install virtualenv
python -m virtualenv --version
python -m virtualenv venv
```
To activate (on Windows): `.\venv\Scripts\activate` or `source '.\venv\Scripts\activate'`
To activate (on Mac): `source venv/bin/activate`  
Deactivate: `deactivate`

#### Install pip requirements
Inside `backend` folder
```
python -m pip install -r requirements.txt
```

#### Run Django migration
You want to do this everytime there is a model change.  
Inside `backend/planfierce`
```
python manage.py makemigrations
python manage.py migrate
```
If you run `\dt` in PSQL, you should see tables created.

#### Create project superuser
```
python manage.py createsuperuser
```
Remember the username and password for access to admin!

#### Run server
Will run at http://127.0.0.1:8000/  
Admin panel at http://127.0.0.1:8000/admin  
Play with GraphQL at http://127.0.0.1:8000/graphql 
```
python manage.py runserver
```

#### Setup PyCharm
Open Project --> folder `backend/planfierce`  
To link to your virtual environemnt:
1. Go into Settings --> Project: Planfierce --> Project Interpreter
1. Change project interpreter to your venv (Existing Interpreter --> `\venv\Scripts\python.exe`)
