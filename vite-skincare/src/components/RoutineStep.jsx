import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";
import { useRef } from "react";
import RoutineProduct from "./RoutineProduct";

function RoutineStep({ sampleProducts, customProducts, step, routine }) {
    const ref = useRef();
    const handleClick = () => {
        ref.current.classList.toggle('show-form')
    }

    // each droppableId needs to be unique
    let dropId = routine + step;
    let stepProducts = [];

    if (routine === "Sample") {

        for (let i = 0; i < sampleProducts.length; i++) {
            if (sampleProducts[i].hasOwnProperty(routine + step)) {
                sampleProducts[i][routine + step].forEach(product => {
                    stepProducts.push(product)
                })
            }
        };
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
    };

    if (routine === "Custom") {

        for (let i = 0; i < customProducts.length; i++) {
            if (customProducts[i].hasOwnProperty(routine + step)) {
                customProducts[i][routine + step].forEach(product => {
                    stepProducts.push(product)
                })
            }
        }

        return (
            <>
                <h2>{step}</h2>
                <Droppable droppableId={dropId}>
                    {(provided) => (
                        <section {...provided.droppableProps} ref={provided.innerRef}>
                            <RoutineProduct products={stepProducts} />
                            <section className="form">
                                <li>
                                    <button className="form-btn" name="name" value="Name" onClick={handleClick}>Add a Product </button>
                                    <input className="hidden-form" type="text" name="nm" ref={ref}></input>
                                </li>
                            </section>
                            {provided.placeholder}
                        </section>
                    )}
                </Droppable>
            </>

        );
    };
}

export default RoutineStep