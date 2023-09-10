import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleTrain = () => {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    // Fetch the details of a single train from your backend API
    axios.get(`http://localhost:3000/train-schedule/${trainNumber}`)
      .then(response => {
        setTrain(response.data);
      })
      .catch(error => {
        console.error('Error fetching train details:', error);
      });
  }, [trainNumber]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Train Details</h1>
      <p>Train Name: {train.trainName}</p>
      <p>Train Number: {train.trainNumber}</p>
      <p>Departure Time: {`${train.departureTime.hours}:${train.departureTime.minutes}:${train.departureTime.seconds}`}</p>
      <p>Seat Availability - Sleeper: {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</p>
      <p>Price - Sleeper: {train.price.sleeper}, AC: {train.price.AC}</p>
      <p>Delay (minutes): {train.delayedBy}</p>
    </div>
  );
};

export default SingleTrain;
