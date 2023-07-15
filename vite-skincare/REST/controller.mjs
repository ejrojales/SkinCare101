import 'dotenv/config';
import * as routines from './model.mjs';
import express from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT;


app.post('/AMroutines', (req, res) => {
    routines.createAMRoutine(req.body.title, req.body.author, req.body.comments, req.body.date, req.body.hidden, req.body.products)
        .then(routine => {
            res.status(201).json(routine)
        })
});

app.post('/PMroutines', (req, res) => {
    routines.createPMRoutine(req.body.title, req.body.author, req.body.comments, req.body.date, req.body.hidden, req.body.products)
        .then(routine => {
            res.status(201).json(routine)
        })
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});