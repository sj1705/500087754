import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllTrains = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch all trains from your backend API
    axios.get('http://localhost:3000/train-schedule')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error fetching trains:', error);
      });
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      <table>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Train Number</th>
            <th>Departure Time</th>
            <th>Seat Availability</th>
            <th>Price</th>
            <th>Delay (minutes)</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(train => (
            <tr key={train.trainNumber}>
              <td>{train.trainName}</td>
              <td>{train.trainNumber}</td>
              <td>{`${train.departureTime.hours}:${train.departureTime.minutes}:${train.departureTime.seconds}`}</td>
              <td>Sleeper: {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</td>
              <td>Sleeper: {train.price.sleeper}, AC: {train.price.AC}</td>
              <td>{train.delayedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrains;
