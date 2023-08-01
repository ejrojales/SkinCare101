export const getUserInfo = async (accessToken) => {
    const config = {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
    };

    const data = await fetch('/protectedResource', config);

    return data;
};