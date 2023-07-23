import { useLoaderData } from "react-router-dom";
import RoutineCard from "../components/RoutineCard";

export function Browse() {
    const routines = useLoaderData()

    const amList = routines.filter(routine =>
        routine.tag === 'AM'
    );

    const pmList = routines.filter(routine =>
        routine.tag === 'PM'
    );

    return (
        <div className="flex flex-row justify-around">
            <div>
                <h2 className="mt-24 mb-8 text-2xl">AM Routines</h2>
                <RoutineCard routineCard={amList} />
            </div>

            <div>
                <h2 className="mt-24 mb-8 text-2xl">PM Routines</h2>
                <RoutineCard routineCard={pmList} />
            </div>


        </div>

    )
};

export const dataLoader = async () => {
    const routineList = await fetch('/routines');
    return routineList
}