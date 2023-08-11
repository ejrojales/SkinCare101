import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import RoutineTable from '../components/RoutineTable.jsx'
import AddProduct from '../components/AddProduct.jsx';
import HandleOnDragEnd from '../helpers/HandleOnDragEnd.jsx';
import SaveRoutine from '../helpers/SaveRoutine.jsx';
import { Card, Button } from "@material-tailwind/react";
import { useAuth0 } from "@auth0/auth0-react";
import EditableRoutineName from '../components/EditableRoutineName.jsx';
import { PageLoader } from '../components/PageLoader.jsx';


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

    const [sampleProducts, updateProducts] = useState(SAMPLEPRODUCTS);
    const [amProducts, updateAmProducts] = useState(AMPRODUCTS);
    const [pmProducts, updatePmProducts] = useState(PMPRODUCTS);
    const [productId, setProductId] = useState(5);
    const [amRoutineName, setAMRoutineName] = useState("AM Routine");
    const [pmRoutineName, setPMRoutineName] = useState("PM Routine");

    // wait for the user information to be fetched
    useEffect(() => {

        if (!user) {
            return
        }
        async function getUserInfo() {
            const accessToken = await getAccessTokenSilently();
            //console.log(accessToken)
            //console.log(user.sub)

            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
            };
            const response = await fetch(`/${user.sub}/routines`, config);
            const data = await response.json()

        }
        getUserInfo();


    }, [user])


    return (
        <>
            <div>
                test
            </div>

            <div className="flex flex-row justify-center mt-72">
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
        </>
    )

}

export default BuildRoutine;