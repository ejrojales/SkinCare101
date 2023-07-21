import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";
import { useRef } from "react";
import RoutineProduct from "./RoutineProduct";

function RoutineStep({ products, step, routine }) {

    // each droppableId needs to be unique
    let dropId = routine + step;
    let stepProducts = [];

    for (let i = 0; i < products.length; i++) {
        if (products[i].hasOwnProperty(routine + step)) {
            products[i][routine + step].forEach(product => {
                stepProducts.push(product)
            })
        }
    };

    if (routine === "Sample") {

        return (
            <>
                <h2 className="text-xl/8 font-medium">{step}</h2>
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
    };

    if (routine === "Am" || routine === "Pm") {

        return (
            <>
                <h2 className="text-xl/8 font-medium">{step}</h2>
                <Droppable droppableId={dropId}>
                    {(provided) => (
                        <article {...provided.droppableProps} ref={provided.innerRef}>
                            <RoutineProduct products={stepProducts} />
                            {provided.placeholder}
                        </article>
                    )}
                </Droppable>
            </>

        );
    };
}

export default RoutineStep