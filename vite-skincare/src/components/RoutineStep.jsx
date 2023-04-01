import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";
import { useRef } from "react";
import RoutineProduct from "./RoutineProduct";

function RoutineStep({ sampleProducts, customProducts, step, routine, updateCustomProducts, productId, setProductId }) {


    // handleClick: 
    // if input has no value: button shows input field
    // if input has a value: button submits value and hides input field
    const ref = useRef();
    const handleClick = () => {
        if (!(ref.current.value)) {
            ref.current.classList.toggle('show-form')
        } else {

            // Add a product
            let newProducts = Array.from(customProducts)
            for (let i = 0; i < newProducts.length; i++) {
                if (newProducts[i].hasOwnProperty("Custom" + ref.current.name)) {
                    console.log({ id: productId, step: ref.current.name, name: ref.current.value })
                    newProducts[i]["Custom" + ref.current.name].push({ id: productId, step: ref.current.name, name: ref.current.value })
                }
            }
            ref.current.value = ""
            ref.current.classList.toggle('show-form')

            setProductId(productId + 1)
            updateCustomProducts(newProducts)
        }
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
                        <article {...provided.droppableProps} ref={provided.innerRef}>
                            <RoutineProduct products={stepProducts} />
                            <section className="form">
                                <li>
                                    <button className="form-btn" name="name" value="Name" onClick={handleClick}>Add a Product </button>
                                    <input className="hidden-form" type="text" name={step} ref={ref}></input>
                                </li>
                            </section>
                            {provided.placeholder}
                        </article>
                    )}
                </Droppable>
            </>

        );
    };
}

export default RoutineStep