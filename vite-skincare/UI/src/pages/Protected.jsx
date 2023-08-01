import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../components/getUserInfo";

export const ProtectedPage = () => {
    const [message, setMessage] = useState("");

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getAccessTokenSilently();
            const data = await getUserInfo(accessToken);

            if (!isMounted) {
                return;
            }

            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently]);

    return (

        <div>
            <h1>
                Protected Page
            </h1>
            <div className="content__body">
                <p id="page-description">
                    <span>
                        This page retrieves a <strong>protected message</strong> from an
                        external API.
                    </span>
                    <span>
                        <strong>Only authenticated users can access this page. {message}</strong>
                    </span>

                </p>
            </div>
        </div>
    );
};