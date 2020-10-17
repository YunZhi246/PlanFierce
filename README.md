# PlanFierce!

## Backend Development

### General Steps:
1. Make database
1. Create virtual environment

### Make database
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
\c
\dt
```

### Create virtual environment
Inside `backend` folder:
```
python -m pip install virtualenv
python -m virtualenv --version
python -m virtualenv venv
```
To activate (on Windows): `.\venv\Scripts\activate`  
To activate (on Mac): `source venv/bin/activate`  
Deactivate: `deactivate`
