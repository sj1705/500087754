const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/train-schedule', async (req, res) => {
    try {
        const trains = await fetchTrainData();
        const filteredTrains = filterAndSortTrains(trains);
        res.json(filteredTrains);
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

    return filteredAndSortedTrains;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
