import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";
import RoutineProduct from "./RoutineProduct";

function RoutineStep({ sampleProducts, customProducts, step, routine }) {

    let stepProducts = [];

    if (routine === "Sample") {

        for (let i = 0; i < sampleProducts.length; i++) {
            if (sampleProducts[i].hasOwnProperty(routine + step)) {
                sampleProducts[i][routine + step].forEach(product => {
                    stepProducts.push(product)
                })

            }
        }
    };

    if (routine === "Custom") {

        for (let i = 0; i < customProducts.length; i++) {
            if (customProducts[i].hasOwnProperty(routine + step)) {
                customProducts[i][routine + step].forEach(product => {
                    stepProducts.push(product)
                })
            }
        }
    };

    // each droppableId needs to be unique
    let dropId = routine + step;
    return (
        <>
            <h2>{step}</h2>
            <Droppable droppableId={dropId}>

                {(provided) => (
                    <section {...provided.droppableProps} ref={provided.innerRef}>

                        <RoutineProduct products={stepProducts} />
                        {provided.placeholder}
                    </section>
                )}
            </Droppable>
        </>

    );
}

export default RoutineStep