import React, { useState } from 'react';
import injectSheet from 'react-jss';

import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const STYLES = {
    circle: {
        marginLeft: '5px',
        borderRadius: '100%',
        height: '3.5em',
        width: '3.5em',
        textAlign: 'center',
        background: '#8F3CA4',
    },
    dayOfWeek: {
        fontSize: '16px',
        paddingTop: '22%',
        color: 'white',
    },
    week: {
        display: 'flex',
        fontFamily: 'Roboto',
        float: 'right',
        marginRight: '11px',
    }

}

// const RoundButton = withStyles((theme) => ({
//     root: {
//         borderRadius: '100%',
//         height: '36px',
//         width: '10px',
//         textAlign: 'center',
//         background: '#8F3CA4',
//         '&:hover': {
//             background: '#592566',
//         },
//     }
// }))(Button);

const ButtonWeek = ({
    classes,
    handleWeek,
}) => {

    return (
        <div className={classes.week}>
            <div className={classes.circle} onClick={() => handleWeek(0)}>
                <div className={classes.dayOfWeek}><b>M</b></div>
            </div>
            <div className={classes.circle} onClick={() => handleWeek(1)}>
                <div className={classes.dayOfWeek}><b>T</b></div>
            </div>
            <div className={classes.circle} onClick={() => handleWeek(2)}>
                <div className={classes.dayOfWeek}><b>W</b></div>
            </div>
            <div className={classes.circle} onClick={() => handleWeek(3)}>
                <div className={classes.dayOfWeek}><b>Th</b></div>
            </div>
            <div className={classes.circle} onClick={() => handleWeek(4)}>
                <div className={classes.dayOfWeek}><b>F</b></div>
            </div>
            <div className={classes.circle} onClick={() => handleWeek(5)}>
                <div className={classes.dayOfWeek}><b>S</b></div>
            </div>
            <div className={classes.circle} onClick={() => handleWeek(6)}>
                <div className={classes.dayOfWeek}><b>Sun</b></div>
            </div>
        </div>
    );
}

export default injectSheet(STYLES)
(ButtonWeek);