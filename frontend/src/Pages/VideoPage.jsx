

import React, { useState } from 'react';
import injectSheet from 'react-jss';
import '../index.css';
import { Redirect } from 'react-router-dom'
import { GetDayById } from '../Days.js';
import { useParams } from "react-router";

import headerImage from '../Images/headerImage.jpg';

const STYLES = {
    mainContainer: {
        position: 'absolute',
        textAlign: 'center',
        marginRight: '11vw',
    },
    imageHeader: {
        width: '100vw',
        height: '50vh',
        boxShadow: 'rgba(204, 0, 255, 0.4)',
    },
};

const VideoPage = ({
    classes,
}) => {

  let { id } = useParams();

  return (
    <GetDayById
      dayId={id}
      classes={classes}
      headerImage={headerImage}
    />
  );
}
export default injectSheet(STYLES)
(VideoPage);