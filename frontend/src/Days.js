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

export function GetAllDays() {
  const { loading, error, data } = useQuery(QUERY_ALL_DAYS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
}