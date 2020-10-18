import React, { useEffect, useState } from 'react';
import injectSheet from 'react-jss';
import '../index.css';

import headerImage from '../Images/headerImage.jpg';
import CreateProgram1 from '../Components/Popups/CreateProgram1';

const STYLES = {
    imageHeader: {
        width: '100vw',
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
const HomePage = ({
    classes,
}) => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [createProgram, setProgram] = useState(false);
  console.log("CreateProgram ", createProgram);

  return (
    <div className={classes.mainContainer}>
      <link href="https://fonts.googleapis.com/css2?family=Allan&display=swap" rel="stylesheet"/>
      <img src={headerImage} className={classes.imageHeader}/>
      <div className={classes.textContainer}>
        <div className={classes.textBox}>
            <div className={classes.titleText}>
                Plan <i>FIERCE</i>
                <div className={classes.subTitleText}>Your home workout planner</div>
            </div>
            <div className={classes.buttonContainer}>
                <button className={classes.buttonPrimary} onClick={() => setProgram(!createProgram)}>
                    Create Now
                </button>
                <button className={classes.buttonSecondary}>
                    Login
                </button>
            </div>
            {createProgram && <CreateProgram1 toggle={() => setProgram(!createProgram)}/>}
        </div>
      </div>
      
      
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default injectSheet(STYLES)
(HomePage);