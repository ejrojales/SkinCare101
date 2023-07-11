import { useRef } from "react";
import { useState } from "react";



function AddProduct({ amProds, pmProds, updateAM, updatePM, productID, setProductID }) {

    const [productName, setProductName] = useState('');
    const [routineStep, setRoutineStep] = useState('Cleanse');
    const [routineTime, setRoutineTime] = useState('');

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        console.log(productName, routineStep, routineTime)
        if (routineTime === "Am") {

            // Add a product
            let newProducts = Array.from(amProds)
            for (let i = 0; i < newProducts.length; i++) {
                if (newProducts[i].hasOwnProperty(routineTime + routineStep)) {
                    newProducts[i][routineTime + routineStep].push({ id: productID, step: routineStep, name: productName })
                }
            }

            setProductID(productID + 1)
            updateAM(newProducts)

        } else if (routineTime === "Pm") {

            // Add a product
            let newProducts = Array.from(pmProds)
            for (let i = 0; i < newProducts.length; i++) {
                if (newProducts[i].hasOwnProperty(routineTime + routineStep)) {
                    newProducts[i][routineTime + routineStep].push({ id: productID, step: routineStep, name: productName })
                }
            }

            setProductID(productID + 1)
            updatePM(newProducts)
        }

    }

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        value={productName}
                        onChange={e => setProductName(e.target.value)} />
                </label>
                <br></br>

                <label>
                    Select a skincare step:
                    <select name="selectedStep" value={routineStep} onChange={e => setRoutineStep(e.target.value)}>
                        <option value="Cleanse">Cleanse</option>
                        <option value="Moisturize">Moisturize</option>
                        <option value="Protect">Protect</option>
                    </select>
                </label> <br></br>

                <label>
                    Routine Time:
                    <input type="radio" name="myRadio" value="Am" checked={routineTime === 'Am'} onChange={e => setRoutineTime(e.target.value)} />
                    AM
                </label>
                <label>
                    <input type="radio" name="myRadio" value="Pm" checked={routineTime === 'Pm'} onChange={e => setRoutineTime(e.target.value)} />
                    PM
                </label> <br></br>


                <button type="submit">Submit form</button>

            </form>
        </div>
    );
}

export default AddProduct;