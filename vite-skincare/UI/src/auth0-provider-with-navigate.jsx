import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();

    const domain = "dev-o5rxkrrd1uyhy7ej.us.auth0.com";
    const clientId = "nLPCeWdxE1ZxHaZHNsW9dyO5NZKoqcck";
    const redirectUri = "https://local.d1g59zf0mc35py.amplifyapp.com";
    const audience = "https://tmcfzmku2xu5akd5qp2kzphhvm0onvhw.lambda-url.ap-southeast-2.on.aws/"

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId && redirectUri && audience)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                audience: audience,
                redirect_uri: redirectUri
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};