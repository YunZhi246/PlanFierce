

import React, { useState } from 'react';
import injectSheet from 'react-jss';
import '../index.css';
import { Redirect } from 'react-router-dom'

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

  const warmup = [
    {
        "id": "1",
        "url": "https://www.youtube.com/watch?v=VKIiCOZ2Eo4",
        "title": "Test Video"
    },
    {
        "id": "2",
        "url": "https://www.youtube.com/watch?v=VKIiCOZ2Eo4",
        "title": "Test Video2"
    }
  ];

  const workout = [
    {
        "id": "1",
        "url": "https://www.youtube.com/watch?v=VKIiCOZ2Eo4",
        "title": "Test Video"
    },
    {
        "id": "2",
        "url": "https://www.youtube.com/watch?v=VKIiCOZ2Eo4",
        "title": "Test Video2"
    }
  ];

  const cooldown = [
    {
        "id": "1",
        "url": "https://www.youtube.com/watch?v=VKIiCOZ2Eo4",
        "title": "Test Video"
    },
    {
        "id": "2",
        "url": "https://www.youtube.com/watch?v=VKIiCOZ2Eo4",
        "title": "Test Video2"
    }
  ];

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
    <div className={classes.mainContainer}>
      <img src={headerImage} className={classes.imageHeader}/>
      {warmup.length && <h1>WARM UP</h1>}
      {warmup.length && createIFrameVideos(warmup)}
      {workout.length && <h1>Work out</h1>}
      {workout.length && createIFrameVideos(workout)}
      {cooldown.length && <h1>Cool down</h1>}
      {cooldown.length && createIFrameVideos(cooldown)}
    </div>
  );
}
export default injectSheet(STYLES)
(VideoPage);