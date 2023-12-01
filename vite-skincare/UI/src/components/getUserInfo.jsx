export const getUserInfo = async (accessToken, user_ID) => {
    const config = {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
    };

    const response = await fetch(`https://tmcfzmku2xu5akd5qp2kzphhvm0onvhw.lambda-url.ap-southeast-2.on.aws/users/${user_ID}`, config)
    const routines = await response.json()


    return routines;
};