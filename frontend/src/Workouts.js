import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const QUERY_ALL_WORKOUTS = gql`
    query {
        allSeries {
            id
            name
            startDate
            endDate
            days {
                id
                date
                startTime
                endTime
                warmupVideos {
                    id
                    url
                }
                videos {
                    id
                    url
                }
                cooldownVideos {
                    id
                    url
                }
            }
        }
    }
`;

const CREATE_WORKOUT = gql`
  mutation createWorkout ($name: String!){
    createWorkout (name: $name){
      id
      name
  }
}
`;

export function GetAllWorkouts() {
  const { loading, error, data } = useQuery(QUERY_ALL_WORKOUTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
}

export function CreateWorkout(props) {
    const [createWorkout, { data }  ] = useMutation(CREATE_WORKOUT);

    const handleSubmit = () => {
        console.log("Submit");
        createWorkout();
    }

    return (
        <button className={props.class} onClick={() => handleSubmit()}>
            Submit
        </button>
    )
}