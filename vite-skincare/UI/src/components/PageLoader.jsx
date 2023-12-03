import React from "react";

export const PageLoader = () => {
    const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

    return (
        <div className="flex h-full w-full">
            <img src={loadingImg} alt="Loading..." />
        </div>
    );
};