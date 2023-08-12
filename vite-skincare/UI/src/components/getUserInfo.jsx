export const getUserInfo = async (accessToken, user_ID) => {
    const config = {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
    };

    const response = await fetch(`http://localhost:3000/users/${user_ID}`, config)
    const routines = await response.json()


    return routines;
};