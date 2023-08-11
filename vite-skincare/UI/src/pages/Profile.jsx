import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { getUserInfo } from "../components/getUserInfo";

export function ProfilePage() {
    const { user } = useAuth0();

    if (!user) {
        return null;
    }

    const { getAccessTokenSilently } = useAuth0();

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

        };

        createUser();
    }, [user, getAccessTokenSilently]);

    return (
        <Card className="w-96">
            <CardHeader floated={false} className="flex justify-center h-80">
                <img src={user.picture} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {user.name}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                    <Typography
                        as="a"
                        href="#facebook"
                        variant="lead"
                        color="blue"
                        textGradient
                    >
                        My Routines
                        <i className="fab fa-facebook" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#instagram"
                        variant="lead"
                        color="purple"
                        textGradient
                    >
                        Favorites
                        <i className="fab fa-instagram" />
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>
    );
};