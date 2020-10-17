import React, { useState } from 'react';
import injectSheet from 'react-jss';
import './styles.css';

import DatePicker from "react-datepicker";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Grid, TextField} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import ClearIcon from '@material-ui/icons/Clear';
import ButtonWeek from '../General/ButtonWeek.jsx';
import "react-datepicker/dist/react-datepicker.css";

const STYLES = {
    modal: {
        display: 'flex',
        position: 'fixed',
        justifyContent:'center',
        width: '100vw',
        height: 'calc(100vh + 100px)',
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
    question: {
      position: 'flex',
      float: 'left',
      paddingTop: '6px',
    },
    xButton: {
        position: 'flex',
    },
    answer: {
        float: 'right',
    }
}



const CreateProgram1 = ({
    classes,
    toggle,
}) => {
  const [startDate, setStartDate] = useState(new Date("2020/10/17"));
  const [endDate, setEndDate] = useState(new Date("2020/10/18"));
  // M, T, W, Th, F, Sat, Sun
  const [week, setWeek] = useState([false, false, false, false, false, false, false]);
  const [selectedDate, setSelectedDate] = useState(new Date('2020-10-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleWeek = (day) => {
    const newWeek = week;
    newWeek[day] = !newWeek[day];
    setWeek(newWeek);
    console.log("Week ", week);
  };

  return (
    <div className={classes.modal}>
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
            </div>
        </div>
   </div>
  );
}

export default injectSheet(STYLES)
(CreateProgram1);


