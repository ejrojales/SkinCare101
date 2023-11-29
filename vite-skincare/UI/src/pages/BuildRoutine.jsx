import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import RoutineTable from '../components/RoutineTable.jsx'
import AddProduct from '../components/AddProduct.jsx';
import HandleOnDragEnd from '../helpers/HandleOnDragEnd.jsx';
import SaveRoutine from '../helpers/SaveRoutine.jsx';
import { Card, Button, Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { useAuth0 } from "@auth0/auth0-react";
import EditableRoutineName from '../components/EditableRoutineName.jsx';

const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
};

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

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    // product lists
    const [sampleProducts, updateProducts] = useState(SAMPLEPRODUCTS);
    const [amProducts, updateAmProducts] = useState(AMPRODUCTS);
    const [pmProducts, updatePmProducts] = useState(PMPRODUCTS);
    const [productId, setProductId] = useState(5);

    // routine names
    const [amRoutineName, setAMRoutineName] = useState("AM Routine");
    const [pmRoutineName, setPMRoutineName] = useState("PM Routine");

    // accordion
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);


    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>

            <div className="flex flex-col bg-[#f8fafc] justify-center h-1/3 w-2/3 mt-36">
                <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
                    <AccordionHeader className='justify-center' onClick={() => handleOpen(1)}>Name your routine</AccordionHeader>
                    <AccordionBody>
                        Click on the routine name to edit.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2} animate={CUSTOM_ANIMATION}>
                    <AccordionHeader className='justify-center' onClick={() => handleOpen(2)}>
                        Add products
                    </AccordionHeader>
                    <AccordionBody>
                        Use the form below to add a product's name, the step, and the time of day for the routine.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3} animate={CUSTOM_ANIMATION}>
                    <AccordionHeader className='justify-center' onClick={() => handleOpen(3)}>
                        Drag and drop products between routines
                    </AccordionHeader>
                    <AccordionBody>
                        Drag and drop products from morning to night and vice versa. Drag and drop products anywhere else to delete them.
                    </AccordionBody>
                </Accordion>

            </div>



            <div className="flex flex-row justify-center items-center mt-20">
                <DragDropContext onDragEnd={(e) => HandleOnDragEnd(e, sampleProducts, amProducts, pmProducts, updateProducts, updateAmProducts, updatePmProducts)}>

                    <div className="flex flex-col">
                        <Card className="w-96 m-8">
                            <h2 className="text-xl/8 font-semibold">{EditableRoutineName(amRoutineName, setAMRoutineName)}</h2>
                            <RoutineTable products={amProducts} routine="Am" updateProducts={updateAmProducts} productId={productId} setProductId={setProductId} />
                        </Card>
                        {isAuthenticated && (
                            <div>
                                <Button className="w-96 bg-blue-gray-500" onClick={(e) => SaveRoutine("am", amProducts, pmProducts, user, amRoutineName)}>Save Routine</Button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <Card className="w-96 m-8">
                            <h2 className="text-xl/8 font-semibold">{EditableRoutineName(pmRoutineName, setPMRoutineName)}</h2>
                            <RoutineTable products={pmProducts} routine="Pm" updateProducts={updatePmProducts} productId={productId} setProductId={setProductId} />
                        </Card>
                        {isAuthenticated && (
                            <div>
                                <Button className="w-96 bg-blue-gray-500" onClick={(e) => SaveRoutine("pm", amProducts, pmProducts, user, pmRoutineName)}>Save Routine</Button>
                            </div>
                        )}

                    </div>


                </DragDropContext>
                <AddProduct amProds={amProducts} pmProds={pmProducts} updateAM={updateAmProducts} updatePM={updatePmProducts} productID={productId} setProductID={setProductId} />

            </div>
        </div>
    )

}

export default BuildRoutine;