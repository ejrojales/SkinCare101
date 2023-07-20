import { useLoaderData, json } from "react-router-dom";
import RoutineList from "../components/RoutineList";

export function Browse() {
    const routines = useLoaderData()

    const amList = routines.filter(routine =>
        routine.tag === 'AM'
    );

    const pmList = routines.filter(routine =>
        routine.tag === 'PM'
    );

    return (
        <div>
            <h2>AM Routines</h2>
            <RoutineList routines={amList} />
            <h2>PM Routines</h2>
            <RoutineList routines={pmList} />
        </div>

    )
};

export const dataLoader = async () => {
    const routineList = await fetch('/routines');
    return routineList
}