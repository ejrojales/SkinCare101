import 'dotenv/config';
import * as routines from './model.mjs';
import express from 'express';
import serverless from "serverless-http";
import { auth } from 'express-oauth2-jwt-bearer';
import cors from 'cors'


const app = express();


app.use(express.json());

if (process.env.DEVELOPMENT) {
    app.use(cors());
}

const PORT = 3000;

const jwtCheck = auth({
    audience: 'https://tmcfzmku2xu5akd5qp2kzphhvm0onvhw.lambda-url.ap-southeast-2.on.aws/',
    issuerBaseURL: 'https://dev-o5rxkrrd1uyhy7ej.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

async function getUserInfo(accessToken) {
    const response = await fetch('https://dev-o5rxkrrd1uyhy7ej.us.auth0.com/userinfo', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const userInfo = await response.json();
    return userInfo
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get('/routines',
    (req, res) => {
        routines.findRoutines()
            .then(routineList => {
                res.send(routineList);
            })
            .catch(error => {
                console.error(error);
                res.send({ Error: 'Request failed' });
            });
    });

app.get('/:user_ID/routines',
    (req, res) => {

        routines.findUserRoutines(req.params.user_ID)
            .then(routineList => {
                res.json(routineList);
            })
            .catch(error => {
                console.error(error);
                res.send({ Error: 'Request failed' });
            });
    });

app.post('/routines', (req, res) => {
    routines.createRoutine(req.body.title, req.body.author, req.body.author_ID, req.body.tag, req.body.comments, req.body.date, req.body.hidden, req.body.products)
        .then(routine => {
            res.status(201).json(routine)
        })
});


app.get('/users/:user_ID', jwtCheck, async (req, res) => {
    const token = req.auth.token

    const decodedUser_ID = decodeURI(req.params.user_ID)

    routines.findUserRoutines(decodedUser_ID)
        .then(routines => {
            res.status(200).json(routines)
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

})

app.delete('/routines/:_id', async (req, res) => {
    routines.deleteRoutineById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).json({ Success: 'Deleted routine' });
            } else {
                res.status(404).json({ Error: "Not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.json({ error: 'Request failed' });
        });
});


if (process.env.DEVELOPMENT) {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
    });
}

export const handler = serverless(app);