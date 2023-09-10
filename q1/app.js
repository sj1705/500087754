const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/train-schedule', async (req, res) => {
    try {
        const trains = await fetchTrainData();
        // const filteredTrains = filterAndSortTrains(trains);
        // res.json(filteredTrains);
        console.log(trains);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

async function fetchTrainData() {
    const response = await axios.get('http://20.244.56.144/train/trains', {
        headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMjkyMTQsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMDdlNTI3YTktMWIwMS00Mzc0LWJiYmMtMTk3NGUzZTA3ZWZkIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjUwMDA4Nzc1NCJ9.tEeEdiQyB3Z02E4JCtFJuPZynYmjYyJC5rYbk1N_xYY',
        },
    });
    return response.data;
}

function filterAndSortTrains(trains) {
    const currentTime = new Date();
    const twelveHoursLater = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);

    const filteredTrains = trains.filter((train) => {
        const departureTime = new Date();
        departureTime.setHours(train.departureTime.hours);
        departureTime.setMinutes(train.departureTime.minutes);
        departureTime.setSeconds(train.departureTime.seconds);

        return departureTime > twelveHoursLater;
    });

    const sortedTrains = filteredTrains.sort((a, b) => {
        const priceA = a.price.sleeper + a.price.AC;
        const priceB = b.price.sleeper + b.price.AC;
        if (priceA !== priceB) {
            return priceA - priceB;
        }

        const ticketsA = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
        const ticketsB = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
        if (ticketsA !== ticketsB) {
            return ticketsB - ticketsA;
        }

        const departureTimeA = calculateDelayedDepartureTime(a);
        const departureTimeB = calculateDelayedDepartureTime(b);

        return departureTimeB - departureTimeA;
    });

    return sortedTrains;
}

function calculateDelayedDepartureTime(train) {
    const departureTime = new Date();
    departureTime.setHours(train.departureTime.hours);
    departureTime.setMinutes(train.departureTime.minutes);
    departureTime.setSeconds(train.departureTime.seconds);

    departureTime.setMinutes(departureTime.getMinutes() + train.delayedBy);

    return departureTime;
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
