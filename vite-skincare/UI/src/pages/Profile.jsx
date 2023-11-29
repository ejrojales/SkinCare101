import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { getUserInfo } from "../components/getUserInfo";
import RoutineCard from "../components/RoutineCard";

export function ProfilePage() {
    const { user } = useAuth0();
    const [userRoutines, setUserRoutines] = useState([])

    if (!user) {
        return null;
    }

    const { getAccessTokenSilently } = useAuth0();

    // Get user routines
    useEffect(() => {

        if (!user) {
            return
        }

        const createUser = async () => {
            if (!user) {
                return;
            }
            const accessToken = await getAccessTokenSilently();
            const data = await getUserInfo(accessToken, user.sub);
            setUserRoutines(data)

        };

        createUser();
    }, [user, getAccessTokenSilently]);

    return (
        <div className="flex m-16">
            <div className="min-w-[40vh]">
                <Card className="h-auto w-auto min-w-full">
                    <CardHeader floated={false} className="flex justify-center h-80">
                        <img src={user.picture} alt="profile-picture" />
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            {user.name}
                        </Typography>
                    </CardBody>
                </Card>
            </div>




            <div className="flex flex-col">
                <Typography variant="h2">My Routines</Typography>
                <div className="flex flex-wrap content-start">
                    <RoutineCard routines={userRoutines} setUserRoutines={setUserRoutines} page={"profile"} />
                </div>
            </div>
        </div>
    );
};