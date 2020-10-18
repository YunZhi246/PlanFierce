import React, { useState } from 'react';
import injectSheet from 'react-jss';
import '../index.css';

import headerImage from '../Images/headerImage.jpg';
import CreateProgram1 from '../Components/Popups/CreateProgram1';

const STYLES = {
    imageHeader: {
        width: '100vw',
        height: '50vh',
        boxShadow: 'rgba(204, 0, 255, 0.4)',
    },
    titleText: {
        color: 'white',
        fontFamily: 'Allan',
        fontSize: '144px',
        fontSize: '10vw',
    },
    textContainer: {
        display: 'flex',
        justifyContent:'center',
    },
    textBox: {
        textAlign: 'right',
        position: 'absolute',
        display: 'flex',
        top: '12%',
        justifyContent:'center',
    },
    subTitleText: {
        paddingRight: '30px',
        fontSize: '36px',
        fontSize: '3vw',
    },
    buttonContainer: {
        marginTop: '50%',
        position: 'absolute',
        display:'flex',
        textAlign: 'center',
    },
    buttonPrimary: {
        fontSize: '18px',
        padding: '9px 15px 9px 15px',
        backgroundColor: '#592566',
        marginTop: '12px',
        marginBottom: '15px',
        color: 'white',
        border: '1px solid white',
    },
    buttonSecondary: {
        marginLeft: '10px',
        textAlign: 'center',
        fontSize: '18px',
        padding: '9px 37px 9px 37px',
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid white',
    },
    mainContainer: {
        position: 'absolute',
        textAlign: 'center',
        marginRight: '11vw',
    },
}
/*
 
 
*/

const CalendarPage = ({
    classes,
}) => {
  // Declare a new state variable, which we'll call "count"
  const [createProgram, setProgram] = useState(false);
  const iframeCalendar = '<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23B39DDB&amp;ctz=America%2FToronto&amp;src=cGxhbmZpZXJjZUBnbWFpbC5jb20&amp;color=%23039BE5&amp;title=Your%20Workout%20Schedule" style="border:solid 1px #777" width="800" height="600" frameborder="0" scrolling="no"></iframe>';
  
  console.log("CreateProgram ", createProgram);

  const calendar = () => {
      return {__html: iframeCalendar}
  }

  return (
    <div className={classes.mainContainer}>
      <link href="https://fonts.googleapis.com/css2?family=Allan&display=swap" rel="stylesheet"/>
      <img src={headerImage} className={classes.imageHeader}/>
      <div className={classes.textContainer}>
        <div className={classes.textBox}>
            <div className={classes.titleText}>
                Plan <i>FIERCE!</i>
                <div className={classes.subTitleText}>Your calendar</div>
            </div>
            {createProgram && <CreateProgram1 toggle={() => setProgram(!createProgram)}/>}
        </div>
      </div>
      <button className={classes.buttonPrimary} onClick={() => setProgram(!createProgram)}>
        Create Now
      </button>
      <div dangerouslySetInnerHTML={calendar()}/>
    </div>
  );
}

export default injectSheet(STYLES)
(CalendarPage);