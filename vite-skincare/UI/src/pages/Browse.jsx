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
                <RoutineCard routines={amList} page={"browse"} setUserRoutines={"None"} />
            </div>

            <div>
                <h2 className="mt-24 mb-8 text-2xl">PM Routines</h2>
                <RoutineCard routines={pmList} page={"browse"} setUserRoutines={"None"} />
            </div>


        </div>

    )
};

export const dataLoader = async () => {
    const routineList = await fetch('https://tmcfzmku2xu5akd5qp2kzphhvm0onvhw.lambda-url.ap-southeast-2.on.aws/routines');
    return routineList
}