const DeleteRoutine = async (routineID, routines, setUserRoutines) => {

    const response = await fetch(`https://tmcfzmku2xu5akd5qp2kzphhvm0onvhw.lambda-url.ap-southeast-2.on.aws/routines/${routineID}`, {
        method: "DELETE"
    })

    const updateUserRoutines = routines.filter(routine => routine._id !== routineID)
    console.log(updateUserRoutines)
    setUserRoutines(updateUserRoutines)
}

export default DeleteRoutine;