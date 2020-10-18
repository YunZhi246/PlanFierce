import React from 'react';
import { useQuery, gql } from '@apollo/client';

const QUERY_ALL_DAYS = gql`
    query {
        allDays {
            id
            date
            startTime
            endTime
            sharedWith
            workoutSeries {
                id
                name
            }
            videos {
                id
                url
            }
        }
    }
`;

const QUERY_DAY_BY_ID = gql`
    query dayById($dayId: ID!){
        dayById(dayId: $dayId) {
            id
            date
            startTime
            endTime
            sharedWith
            videos {
                id
                title
                url
            }
            warmupVideos {
                id
                url
            }
            cooldownVideos {
                id
                url
            }
        }
    }
`;

export function GetAllDays() {
  const { loading, error, data } = useQuery(QUERY_ALL_DAYS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
}

export function GetDayById({ classes, headerImage, dayId }) {
    const { loading, error, data } = useQuery(QUERY_DAY_BY_ID, {
        variables: { dayId }
    });

    if (loading) return (
        <div className={classes.mainContainer}>
            <img src={headerImage} className={classes.imageHeader}/>
            <p>Loading...</p>
        </div>
    );
    if (error) return (
        <div className={classes.mainContainer}>
            <img src={headerImage} className={classes.imageHeader}/>
            <p>Error :(</p>
        </div>
    );

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

    console.log(data);
    const warmup = data.dayById.warmupVideos
    const workout = data.dayById.videos;
    const cooldown = data.dayById.cooldownVideos;

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
