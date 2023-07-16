"use strict";

import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import RoutineTable from './components/RoutineTable.jsx'
import AddProduct from './components/AddProduct.jsx';
import HandleOnDragEnd from './helpers/HandleOnDragEnd.jsx';
import SaveRoutine from './helpers/SaveRoutine.jsx';
import styled from 'styled-components'
import './App.css'

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


function App() {

  const [sampleProducts, updateProducts] = useState(SAMPLEPRODUCTS);
  const [amProducts, updateAmProducts] = useState(AMPRODUCTS);
  const [pmProducts, updatePmProducts] = useState(PMPRODUCTS);
  const [productId, setProductId] = useState(5)

  // A proxy server is setup in the vit.config file so that all calls with a prefix  is sent to the backend server.



  return (
    <div>
      <h1>Skin Care</h1>
      <Container>

        <DragDropContext onDragEnd={(e) => HandleOnDragEnd(e, sampleProducts, amProducts, pmProducts, updateProducts, updateAmProducts, updatePmProducts)}>

          <RoutineStyle>
            <h2>Sample Routine</h2>
            <RoutineTable products={sampleProducts} routine="Sample" />
          </RoutineStyle>

          <RoutineStyle>
            <h2>AM Routine</h2>
            <RoutineTable products={amProducts} routine="Am" updateProducts={updateAmProducts} productId={productId} setProductId={setProductId} />
            <button onClick={(e) => SaveRoutine("am", AMPRODUCTS, PMPRODUCTS)}>Save Routine</button>
          </RoutineStyle>

          <RoutineStyle>
            <h2>PM Routine</h2>
            <RoutineTable products={pmProducts} routine="Pm" updateProducts={updatePmProducts} productId={productId} setProductId={setProductId} />
            <button onClick={(e) => SaveRoutine("pm", AMPRODUCTS, PMPRODUCTS)}>Save Routine</button>
          </RoutineStyle>

        </DragDropContext>
        <AddProduct amProds={amProducts} pmProds={pmProducts} updateAM={updateAmProducts} updatePM={updatePmProducts} productID={productId} setProductID={setProductId} />

      </Container >
    </div>

  );
}

export default App