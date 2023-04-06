import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";
import { useRef } from "react";
import RoutineProduct from "./RoutineProduct";

function RoutineStep({ products, step, routine, updateProducts, productId, setProductId }) {


    // handleClick: 
    // if input has no value: button shows input field
    // if input has a value: button submits value and hides input field
    const ref = useRef();
    const handleClick = () => {
        if (!(ref.current.value)) {
            ref.current.classList.toggle('show-form')
        } else {

            // Add a product
            let newProducts = Array.from(products)
            for (let i = 0; i < newProducts.length; i++) {
                if (newProducts[i].hasOwnProperty(routine + ref.current.name)) {
                    console.log({ id: productId, step: ref.current.name, name: ref.current.value })
                    newProducts[i][routine + ref.current.name].push({ id: productId, step: ref.current.name, name: ref.current.value })
                }
            }
            ref.current.value = ""
            ref.current.classList.toggle('show-form')

            setProductId(productId + 1)
            updateProducts(newProducts)
        }
    }

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

    // Display add product button only for custom routines
    if (routine === "Am" || routine === "Pm") {

        return (
            <>
                <h2>{step}</h2>
                <Droppable droppableId={dropId}>
                    {(provided) => (
                        <article {...provided.droppableProps} ref={provided.innerRef}>
                            <RoutineProduct products={stepProducts} />
                            <section className="form">
                                <li>
                                    <button className="form-btn" name="name" value="Name" onClick={handleClick}>Add a Product</button>
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