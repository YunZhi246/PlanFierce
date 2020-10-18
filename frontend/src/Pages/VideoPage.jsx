

import React, { useState } from 'react';
import injectSheet from 'react-jss';
import '../index.css';
import { Redirect } from 'react-router-dom'
import { GetDayById } from '../Days.js';

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

  const iVideos = (iframeVideo) => {
      return {__html: iframeVideo}
  }

  const createIFrameVideos = (videos) => {
    const prefix = 'https://www.youtube.com/embed/';
    return (
        videos.map((video) => (
            <div style={{marginBottom: '30px'}}>
                <div dangerouslySetInnerHTML={iVideos(`<iframe width="560" height="315" src="${prefix}${video.url.split('watch?v=')[1]}" frameborder="0" allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)}/>
                <span>{video.title}</span>
            </div>
        ))
    );
  }

  return (
    <GetDayById
      dayId={129}
      classes={classes}
      headerImage={headerImage}
    />
  );
}
export default injectSheet(STYLES)
(VideoPage);