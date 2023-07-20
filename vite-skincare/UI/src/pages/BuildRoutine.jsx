import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import RoutineTable from '../components/RoutineTable.jsx'
import AddProduct from '../components/AddProduct.jsx';
import HandleOnDragEnd from '../helpers/HandleOnDragEnd.jsx';
import SaveRoutine from '../helpers/SaveRoutine.jsx';
import styled from 'styled-components'
const Container = styled.div`
    display:flex;
    flex-direction: row;
  `;

const RoutineStyle = styled.div`
    flex-direction: column;
    margin: 8px;
    width: 220px;
    border: 1px solid lightgrey;
    border-radius: 2px;
  `;

function BuildRoutine() {
    const SAMPLEPRODUCTS = [
        {
            "SampleCleanse": [
                { id: 0, step: "Cleanse", name: "Senka Perfect Whip Cleanser" },
                { id: 1, step: "Cleanse", name: "Cerave Acne Foaming Cleanser" },
                { id: 2, step: "Cleanse", name: "Cosrx Low-pH Good Morning Cleanser" }
            ]
        },
        {
            "SampleMoisturize": [
                { id: 3, step: "Moisturize", name: "Aestura AtoBarrier Moisturizer" }

            ]
        },
        {
            "SampleProtect": [
                { id: 4, step: "Protect", name: "Round Lab Birch Juice Sunscreen" }
            ]
        }
    ]


    const AMPRODUCTS = [
        { "AmCleanse": [] },
        { "AmMoisturize": [] },
        { "AmProtect": [] }
    ];

    const PMPRODUCTS = [
        { "PmCleanse": [] },
        { "PmMoisturize": [] },
        { "PmProtect": [] }
    ];
    const [sampleProducts, updateProducts] = useState(SAMPLEPRODUCTS);
    const [amProducts, updateAmProducts] = useState(AMPRODUCTS);
    const [pmProducts, updatePmProducts] = useState(PMPRODUCTS);
    const [productId, setProductId] = useState(5);

    return (
        < Container >
            <DragDropContext onDragEnd={(e) => HandleOnDragEnd(e, sampleProducts, amProducts, pmProducts, updateProducts, updateAmProducts, updatePmProducts)}>

                <RoutineStyle>
                    <h2>Sample Routine</h2>
                    <RoutineTable products={sampleProducts} routine="Sample" />
                </RoutineStyle>

                <RoutineStyle>
                    <h2>AM Routine</h2>
                    <RoutineTable products={amProducts} routine="Am" updateProducts={updateAmProducts} productId={productId} setProductId={setProductId} />
                    <button onClick={(e) => SaveRoutine("am", amProducts, pmProducts)}>Save Routine</button>
                </RoutineStyle>

                <RoutineStyle>
                    <h2>PM Routine</h2>
                    <RoutineTable products={pmProducts} routine="Pm" updateProducts={updatePmProducts} productId={productId} setProductId={setProductId} />
                    <button onClick={(e) => SaveRoutine("pm", amProducts, pmProducts)}>Save Routine</button>
                </RoutineStyle>

            </DragDropContext>
            <AddProduct amProds={amProducts} pmProds={pmProducts} updateAM={updateAmProducts} updatePM={updatePmProducts} productID={productId} setProductID={setProductId} />

        </Container >
    )

}

export default BuildRoutine;