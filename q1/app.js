const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const accessToken = 'YourAccessToken';

app.get('/train-schedule', async (req, res) => {
    try {
        const response = await axios.get('http://20.244.56.144/train/trains', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            const data = response.data;

            const sortedTrains = sortAndFilter(data);
            res.json(sortedTrains);
        } else {
            res.status(500).json({ error: 'Unable to fetch train schedule' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

function sortAndFilter(data) {
// i need to implement
    return sortedData;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
