const DeleteRoutine = async (routineID, routines, setUserRoutines) => {

    const response = await fetch(`http://localhost:3000/routines/${routineID}`, {
        method: "DELETE"
    })

    const updateUserRoutines = routines.filter(routine => routine._id !== routineID)
    console.log(updateUserRoutines)
    setUserRoutines(updateUserRoutines)
}

export default DeleteRoutine;