import React, { useState } from 'react';
import injectSheet from 'react-jss';
import './styles.css';

import DatePicker from "react-datepicker";
import { TextField, Select, MenuItem } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import ButtonWeek from '../General/ButtonWeek.jsx';
import CreateProgram2 from './CreateProgram2';
import "react-datepicker/dist/react-datepicker.css";

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
        marginBottom: '50px',
        marginRight: '25px',
    },
    rowContainer2: {
        marginTop: '100px',
        marginRight: '38px',
    },
    rowContainer3: {
        marginTop: '150px',
        marginRight: '38px',
    },
    rowContainer4: {
        marginTop: '250px',
        marginRight: '38px',
        display: 'block',
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
        display: 'block',
    },
    nameAnswer: {
        float: 'right',
        display: 'block',
        marginBottom: '23px',
    },
    workoutAnswer: {
        float: 'right',
        display: 'block',
        width: '230px',
    },
    workoutStructure: {
        maxHeight: '100px',
        position: 'relative',
        overflowY: 'scroll',
        overflowX: 'hidden',
        float: 'right',
    },
    footer: {
        textAlign: 'center', 
        marginTop: '53vh',
    },
    buttonPrimary: {
        fontSize: '16px',
        float: 'right',
        //padding: '9px 15px 9px 15px',
        backgroundColor: '#592566',
        color: 'white',
        border: '1px solid #592566',
        height: '30px',

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
    buttonNext: {
        fontSize: '18px',
        //padding: '9px 15px 9px 15px',
        backgroundColor: '#592566',
        color: 'white',
        border: '1px solid white',
        height: '50px',

    },
}

const CreateProgram1 = ({
    classes,
    toggle,
}) => {
  const [startDate, setStartDate] = useState(new Date("2020/10/17"));
  const [endDate, setEndDate] = useState(new Date("2020/10/18"));
  // M, T, W, Th, F, Sat, Sun
  const [week, setWeek] = useState([false, false, false, false, false, false, false]);
  const [workoutStructure, setWorkoutStructure] = useState([]);
  const [workoutTimes, setWorkoutTimes] = useState([]);
  const [structDisplay, setStructDisplay] = useState([]);
  const [programName, setProgramName] = useState('');
  const [structCount, setStructCount] = useState(0);
  const [startTime, setStartTime] = useState('9:30');
  const [isSecondModal, setIsSecondModal] = useState(false);

  const handleWeek = (day) => {
    const newWeek = week;
    newWeek[day] = !newWeek[day];
    setWeek(newWeek);
    console.log("Week ", week);
  };

  const handleStructure = (e, key) => {
    const newStruct = workoutStructure;
    const splitString = e.target.value.split(",");
    const index = parseInt(splitString[0]);
    console.log("Key string ", key);
    newStruct[index] = splitString[1];
    console.log("key ", index);
    setWorkoutStructure(newStruct);
    console.log("Workout struct ", workoutStructure);
  };

  const handleTime = (e, key) => {
    console.log("e ", e.target);
    const newTimes = workoutTimes;
    newTimes[parseInt(e.target.id)] = parseInt(e.target.value);
    setWorkoutTimes(newTimes);
    console.log("Workout Times ", workoutTimes);
  };

  const displayWorkoutStructure = () => {
    setStructCount(structCount + 1);
    setWorkoutStructure([...structDisplay, 'Warmup']);
    setWorkoutTimes([...workoutTimes, '9:30']);
    setStructDisplay([...structDisplay, 
    <span style={{display: 'block', paddingTop: '20px', float: 'right'}}>
        <TextField
            style={{width: '60px', height: '15px'}}
            id={structCount}
            label="mins"
            variant="outlined"
            onChange = {handleTime}
        />
        <Select
            variant="outlined"
            style={{marginLeft: '5px', height: '56px'}}
            key={structCount}
            id={structCount}
            onChange={handleStructure}
            >
            <MenuItem value={structCount + ',Warmup'}>Warm Up</MenuItem>
            <MenuItem value={structCount + ',Workout'}>Workout</MenuItem>
            <MenuItem value={structCount + ',Cooldown'}>Cooldown</MenuItem>
        </Select>
    </span>]);
    console.log("Display workout structure ", structDisplay);
  };

  return (
    <>
    {!isSecondModal && <div className={classes.modal}>
        <div className={classes.modalContent}>
            <div className={classes.header}>
                <div className={classes.stepCircle}>
                    <div className={classes.stepNumber}><b>1</b></div>
                </div>
                <div className={classes.headerText}><b>Set your workout schedule</b></div>
            </div>
            <ClearIcon className={classes.xButton} style={{ color: '#592566' }} onClick={toggle}/>
            <div className={classes.bodyContainer}>
                <div className={classes.rowContainer}>
                    <span className={classes.question}>What is the duration of this workout program? (Start Date, End Date)</span>
                    <span>
                        <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        />
                        <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        />
                    </span>
                </div>
                <div className={classes.rowContainer}>
                    <span className={classes.question}>Which days of the week do you plan on working out?</span>
                    <span>
                        <ButtonWeek handleWeek={handleWeek}/>
                    </span>
                </div>
                <div className={classes.rowContainer2}>
                    <span className={classes.question}>What time would you like to start your workout?</span>
                    <span className={classes.answer}>
                        <form noValidate>
                            <TextField
                                onChange = {(e) => setStartTime(e.target.value)}
                                id="time"
                                type="time"
                                defaultValue="09:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </form>
                    </span>
                </div>
                <div className={classes.rowContainer3}>
                    <span className={classes.question}>How, and for how long, would you like to structure each workout session?</span>
                    <div className={classes.workoutAnswer}>
                        <button className={classes.buttonPrimary} onClick={() => displayWorkoutStructure()}>
                            Add workout schedule
                        </button>
                        <div className={classes.workoutStructure}>
                            {structDisplay}
                        </div>
                    </div>
                </div>
                <div className={classes.rowContainer4}>
                    <span className={classes.question}>Name of your workout program</span>
                    <span className={classes.answer}>
                        <TextField
                            style={{marginTop: '-16px', display: 'block', height: '15px'}}
                            //style={{position: 'absolute', display: 'inline', width: '60px', height: '10px', float: 'right', fontSize: '16px', color: 'black'}}
                            className={classes.textField}
                            id={structCount}
                            label="Name"
                            variant="outlined"
                            onChange = {(e) => setProgramName(e.target.value)}
                        />
                    </span>
                </div>
            </div>
            <div className={classes.footer}>
                <button className={classes.footerButton} onClick={() => setIsSecondModal(true)}>
                    Next
                </button>
            </div>
        </div>
   </div>}
   {
       isSecondModal && 
       <CreateProgram2 
            toggle={toggle}
            name={programName}
            startDate={startDate}
            endDate={endDate}
            daysOfWeek={week}
            startTime={startTime}
            workoutStruct={workoutStructure}
            workoutTimes={workoutTimes}
       />
   }
   </>
  );
}

export default injectSheet(STYLES)
(CreateProgram1);


