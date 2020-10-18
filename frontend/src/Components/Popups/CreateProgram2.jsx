import React, { useState } from 'react';
import injectSheet from 'react-jss';
import './styles.css';

import { Select, MenuItem, InputLabel, Input, FormControl, Chip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ChipInput from 'material-ui-chip-input';
import 'react-datepicker/dist/react-datepicker.css';
import { CreateWorkout } from '../../Workouts.js';


const STYLES = {
    modal: {
        display: 'flex',
        position: 'fixed',
        justifyContent:'center',
        width: '100vw',
        height: 'calc(100vh + 150px)',
    },
    modalContent: {
        backgroundColor: 'white',
        position: 'absolute',
        padding: '20px',
        borderRadius: '5px',
        justifyContent:'center',
        width: '50vw',
        height:'60vh',
        display: 'block',
    },
    stepCircle: {
        borderRadius: '100%',
        height: '3.5em',
        width: '3.5em',
        textAlign: 'center',
        background: '#592566',
    },
    stepNumber: {
        fontSize: '36px',
        paddingTop: '10%',
        color: 'white',
    },
    header: {
        position: 'absolute',
        display: 'flex',
        fontFamily: 'Allan',
    },
    headerText: {
        verticalAlign: 'middle',
        paddingTop: '8px',
        paddingLeft: '10px',
        fontSize: '36px',
    },
    bodyContainer: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: '12px',
        marginTop: '80px',
        width: '100%',
        textAlign: 'left',
        position: 'absolute',
        display: 'block',
    },
    rowContainer: {
        marginBottom: '100px',
        marginRight: '25px',
    },
    question: {
      position: 'flex',
      float: 'left',
      paddingTop: '6px',
      display: 'block',
    },
    xButton: {
        position: 'flex',
    },
    answer: {
        float: 'right',
        display: 'inline',
    },
    footer: {
        textAlign: 'center', 
        marginTop: '53vh',
    },
    footerButton: {
        fontSize: '18px',
        padding: '5px 15px 5px 15px',
        backgroundColor: '#592566',
        color: 'white',
        border: '1px solid #592566',
        height: '30px',
        justifyContent: 'center',

    },
    formControl: {
      float: 'right',
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
    display: 'flex',
    flexWrap: 'wrap',
    },
    chip: {
    margin: 2,
    },
}

const workoutTypesList = [
    'arms',
    'legs',
    'back',
    'booty',
    'yoga',
    'dance',
    'full body',
    'core',
    'cardio',
    'HIIT',
];

const CreateProgram2 = (props) => {
  const classes = props.classes
  const toggle = props.toggle
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [youtubers, setYoutubers] = useState([]);

  return (
    <div className={classes.modal}>
        <div className={classes.modalContent}>
            <div className={classes.header}>
                <div className={classes.stepCircle}>
                    <div className={classes.stepNumber}><b>2</b></div>
                </div>
                <div className={classes.headerText}><b>Specify your workout details</b></div>
            </div>
            <ClearIcon className={classes.xButton} style={{ color: '#592566' }} onClick={toggle}/>
            <div className={classes.bodyContainer}>
                <div className={classes.rowContainer}>
                    <span className={classes.question}>Which types of workouts would you like to do?</span>
                    <span className={classes.answer}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id='workout-chip-label'></InputLabel>
                            <Select
                            style={{float: 'right', marginTop: '-10px'}}
                            labelId='workout-type-labels'
                            id='workout-id-label'
                            multiple
                            value={workoutTypes}
                            onChange={(e) => setWorkoutTypes(e.target.value)}
                            input={<Input id='select-multiple-workout-types' />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                                </div>
                            )}
                            >
                            {workoutTypesList.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </span>
                </div>
                <div className={classes.rowContainer}>
                    <span className={classes.question}>Which days of the week do you plan on working out?</span>
                        <ChipInput
                            style={{marginTop: '-10px', maxWidth: '350px', float: 'right'}}
                            onChange={(chips) => setYoutubers(chips)}
                        />
                </div>
            </div>
            <div className={classes.footer}>
                <CreateWorkout
                    class={classes.footerButton}
                    name={props.name}
                    startDate={props.startDate}
                    endDate={props.endDate}
                    startTime={props.startTime}
                    daysOfWeek={props.daysOfWeek}
                    workoutStruct={props.workoutStruct}
                    workoutTimes={props.workoutTimes}
                    types={workoutTypes}
                    youtubers={youtubers}
                />
            </div>
        </div>
   </div>
  );
}

export default injectSheet(STYLES)
(CreateProgram2);


