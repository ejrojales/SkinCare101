import 'dotenv/config';
import * as routines from './model.mjs';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import cors from 'cors'


const app = express();


app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

const jwtCheck = auth({
    audience: 'http://localhost:3000',
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
        console.log("test route");

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
    routines.createRoutine(req.body.title, req.body.author, req.body.authorID, req.body.tag, req.body.comments, req.body.date, req.body.hidden, req.body.products)
        .then(routine => {
            res.status(201).json(routine)
        })
});


app.get('/users/:user_ID', jwtCheck, async (req, res) => {
    const token = req.auth.token
    console.log(token)

    const decodedUser_ID = decodeURI(req.params.user_ID)
    console.log(decodedUser_ID)

    const userInfo = await getUserInfo(token);
    console.log(userInfo)

    routines.findUserByUserId(decodedUser_ID)
        .then(user => {
            if (user !== null) {
                res.status(200).json(user)
            } else {
                routines.createUser(userInfo.name, userInfo.email, userInfo.sub, userInfo.date, userInfo.favorites)
                    .then(user => {
                        res.status(201).json(user)
                    }
                    )
            }
        })
        .catch(error => {
            res.status(404).json({ Error: "Not found" });
        });

})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});