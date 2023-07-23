import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export function ProfilePage() {
    const { user } = useAuth0();

    if (!user) {
        return null;
    }

    return (
        <div >
            <h1>
                Profile Page
            </h1>
            <div >
                <p >
                    <span>
                        You can use the <strong>ID Token</strong> to get the profile
                        information of an authenticated user.
                    </span>
                    <span>
                        <strong>Only authenticated users can access this page.</strong>
                    </span>
                </p>
                <div >
                    <div >
                        <img
                            src={user.picture}
                            alt="Profile"

                        />
                        <div >
                            <h2 >{user.name}</h2>
                            <span >{user.email}</span>
                        </div>
                    </div>
                    <div >
                        <h2>{JSON.stringify(user, null, 2)}</h2>

                    </div>
                </div>
            </div>
        </div>
    );
};