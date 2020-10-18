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
  mutation createWorkout ($name: String!, $startDate: String!, $endDate: String!, $daysOfWeek: [Int]!, $startTime: Time!, $warmupDurations: [Int], $workoutDurations: [Int], $cooldownDurations: [Int], $types: [String], $youtubers: [String]){
    createWorkout (name: $name, startDate: $startDate, endDate: $endDate, daysOfWeek: $daysOfWeek, startTime: $startTime, warmupDurations: $warmupDurations, workoutDurations: $workoutDurations, cooldownDurations: $cooldownDurations, types: $types, youtubers: $youtubers){
        workout {
            id
            name
            startDate
            endDate
            days {
              date
              startTime
              endTime
            }
        }
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
    const [createWorkout, { loading: mutationLoading, error: mutationError }  ] = useMutation(CREATE_WORKOUT, {
        onCompleted(response) {
            console.log("Workout Created!")
            console.log(response.createWorkout.workout);
        }
    });

    const processDaysOfWeek = (daysOfWeek) => {
        let intDays = [];
        var i;
        for (i=0; i<daysOfWeek.length; i++) {
            if (daysOfWeek[i]) {
                intDays.push(i);
            }
        }
        return intDays;
    };

    const processDurations = (workoutStruct, workoutTimes) => {
        let warmups = [];
        let workouts = [];
        let cooldowns = [];
        var i;
        for (i=0; i<workoutStruct.length; i++) {
            if (workoutStruct[i] === "Warmup") {
                warmups.push(workoutTimes[i]);
            } else if (workoutStruct[i] === "Workout") {
                workouts.push(workoutTimes[i]);
            } else if (workoutStruct[i] === "Cooldown") {
                cooldowns.push(workoutTimes[i]);
            }
        }
        return [warmups, workouts, cooldowns];
    };

    const daysOfWeek = processDaysOfWeek(props.daysOfWeek);
    const [warmups, workouts, cooldowns] = processDurations(props.workoutStruct, props.workoutTimes);

    const handleSubmit = () => {
        console.log("Submit");
        createWorkout({
            variables: {
                name: props.name,
                startDate: props.startDate,
                endDate: props.endDate,
                daysOfWeek: daysOfWeek,
                startTime: props.startTime,
                warmupDurations: warmups,
                workoutDurations: workouts,
                cooldownDurations: cooldowns,
                types: props.types,
                youtubers: props.youtubers
            }
        });
    };

    return (
        <div>
            <button className={props.class} onClick={() => handleSubmit()}>
                Submit
            </button>
            {mutationLoading && <p>Loading...</p>}
            {mutationError && <p>Error :( Please try again</p>}
        </div>
    );
}