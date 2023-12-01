
const SaveRoutine = async (routineTime, AMPRODUCTS, PMPRODUCTS, user, routineName) => {

    if (routineTime === "am") {

        const newRoutine = {
            title: routineName,
            author: user.name,
            author_ID: user.sub,
            tag: "AM",
            comments: [{ "body": "No comment" }],
            hidden: false,
            products: {
                "cleanse": AMPRODUCTS[0]["AmCleanse"],
                "moisturize": AMPRODUCTS[1]["AmMoisturize"],
                "protect": AMPRODUCTS[2]["AmProtect"]
            }
        };
        const response = await fetch('https://tmcfzmku2xu5akd5qp2kzphhvm0onvhw.lambda-url.ap-southeast-2.on.aws/routines', {
            method: 'POST',
            body: JSON.stringify(newRoutine),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the routine!");
        } else {
            alert(`Failed to add routine, status code = ${response.status}`);
        }

    } else {
        const newRoutine = {
            title: routineName,
            author: user.name,
            author_ID: user.sub,
            tag: "PM",
            comments: [{ "body": "No comment" }],
            hidden: false,
            products: {
                "cleanse": PMPRODUCTS[0]["PmCleanse"],
                "moisturize": PMPRODUCTS[1]["PmMoisturize"],
                "protect": PMPRODUCTS[2]["PmProtect"]
            }
        };
        const response = await fetch('https://tmcfzmku2xu5akd5qp2kzphhvm0onvhw.lambda-url.ap-southeast-2.on.aws/routines', {
            method: 'POST',
            body: JSON.stringify(newRoutine),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the routine!");
        } else {
            alert(`Failed to add routine, status code = ${response.status}`);
        }
    }

};

export default SaveRoutine