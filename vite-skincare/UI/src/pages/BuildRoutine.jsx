import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import RoutineTable from '../components/RoutineTable.jsx'
import AddProduct from '../components/AddProduct.jsx';
import HandleOnDragEnd from '../helpers/HandleOnDragEnd.jsx';
import SaveRoutine from '../helpers/SaveRoutine.jsx';
import { Card, Button } from "@material-tailwind/react";


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
        <div className="flex flex-row justify-center mt-72">
            <DragDropContext onDragEnd={(e) => HandleOnDragEnd(e, sampleProducts, amProducts, pmProducts, updateProducts, updateAmProducts, updatePmProducts)}>

                <div className="flex flex-col">
                    <Card className="w-96 m-8">
                        <h2 className="text-xl/8 font-semibold">AM Routine</h2>
                        <RoutineTable products={amProducts} routine="Am" updateProducts={updateAmProducts} productId={productId} setProductId={setProductId} />
                    </Card>
                    <div>
                        <Button className="w-96 bg-brown-200" onClick={(e) => SaveRoutine("am", amProducts, pmProducts)}>Save Routine</Button>
                    </div>

                </div>

                <div className="flex flex-col">
                    <Card className="w-96 m-8">
                        <h2 className="text-xl/8 font-semibold">PM Routine</h2>
                        <RoutineTable products={pmProducts} routine="Pm" updateProducts={updatePmProducts} productId={productId} setProductId={setProductId} />
                    </Card>
                    <div>
                        <Button className="w-96 bg-brown-200" onClick={(e) => SaveRoutine("pm", amProducts, pmProducts)}>Save Routine</Button>
                    </div>
                </div>


            </DragDropContext>
            <AddProduct amProds={amProducts} pmProds={pmProducts} updateAM={updateAmProducts} updatePM={updatePmProducts} productID={productId} setProductID={setProductId} />

        </div>
    )

}

export default BuildRoutine;