"use strict";

import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import RoutineTable from './components/RoutineTable.jsx'
import AddProduct from './components/AddProduct.jsx';
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
  const [responseData, setResponseData] = useState(null)
  const [productId, setProductId] = useState(5)

  // A proxy server is setup in the vit.config file so that all calls with the prefix /api is sent to the backend server.
  function fetchData() {
    fetch('/secondRoute')
      .then(response => response.text())
      .then(data => setResponseData(data))
      .then(lambda => alert(responseData))
      .catch(error => console.error(error))
  }

  function handleOnDragEnd(result) {

    console.log(result)
    const hashmap = {
      "SampleCleanse": ["AmCleanse", "PmCleanse"],
      "SampleMoisturize": ["AmMoisturize", "PmMoisturize"],
      "SampleProtect": ["AmProtect", "PmProtect"]
    }

    // Return a routine product back to the sample products
    // 1st condition: routine product and null destination
    // 2nd condition: routine product and sample destination
    if ((!(result.source.droppableId in hashmap) && !result.destination) || ((!(result.source.droppableId in hashmap) && result.destination) && result.destination.droppableId in hashmap)) {

      let sample = Array.from(sampleProducts); // Create a copy array of sample products

      let routine = "pm";
      for (let y = 0; y < amProducts.length; y++) {
        if (amProducts[y].hasOwnProperty(result.source.droppableId)) {
          routine = "am"
        }
      }

      if (routine === "am") {
        let tempAmProducts = Array.from(amProducts); // Create a copy array of custom products
        for (let i = 0; i < tempAmProducts.length; i++) {
          if (tempAmProducts[i].hasOwnProperty(result.source.droppableId)) {
            let index = tempAmProducts[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
            const [reorderedItem] = tempAmProducts[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

            // Insert the item into the sample routine
            for (let x = 0; x < sample.length; x++) {
              if (sample[x].hasOwnProperty("Sample" + reorderedItem["step"])) {
                sample[x]["Sample" + reorderedItem["step"]].push(reorderedItem);
                break;
              }
            }
            break;
          }
        }
        updateProducts(sample); // update the state of sample products
        updateAmProducts(tempAmProducts); // update the state of sample products
      }

      if (routine === "pm") {
        let tempPmProducts = Array.from(pmProducts); // Create a copy array of custom products
        for (let i = 0; i < tempPmProducts.length; i++) {
          if (tempPmProducts[i].hasOwnProperty(result.source.droppableId)) {
            let index = tempPmProducts[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
            const [reorderedItem] = tempPmProducts[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

            // Insert the item into the sample routine
            for (let x = 0; x < sample.length; x++) {
              if (sample[x].hasOwnProperty("Sample" + reorderedItem["step"])) {
                sample[x]["Sample" + reorderedItem["step"]].push(reorderedItem);
                break;
              }
            }
            break;
          }
        }
        updateProducts(sample);
        updatePmProducts(tempPmProducts);
      }
    }

    if (!result.destination) return;

    // Movement from sample to am/pm routine
    if (hashmap.hasOwnProperty(result.source.droppableId) && hashmap[result.source.droppableId].includes(result.destination.droppableId)) {

      let sample = Array.from(sampleProducts); // Create a copy array of sample products

      let routine = "pm";
      for (let i = 0; i < amProducts.length; i++) {
        if (amProducts[i].hasOwnProperty(result.destination.droppableId)) {
          routine = "am"
        }
      }

      // Sample -> AM
      if (routine == "am") {
        let tempAmProducts = Array.from(amProducts); // Create a copy array of custom products
        for (let i = 0; i < sample.length; i++) {
          if (sample[i].hasOwnProperty(result.source.droppableId)) {
            let index = sample[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
            const [reorderedItem] = sample[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

            // Insert the item into the am routine
            for (let x = 0; x < tempAmProducts.length; x++) {
              if (tempAmProducts[x].hasOwnProperty(result.destination.droppableId)) {
                tempAmProducts[x][result.destination.droppableId].push(reorderedItem);
              }
            }
          }
        }
        updateAmProducts(tempAmProducts); // update the state of sample products
      };

      // Sample -> PM
      if (routine === "pm") {
        let tempPmProducts = Array.from(pmProducts); // Create a copy array of custom products
        for (let i = 0; i < sample.length; i++) {
          if (sample[i].hasOwnProperty(result.source.droppableId)) {
            let index = sample[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
            const [reorderedItem] = sample[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

            // Insert the item into the pm routine
            for (let x = 0; x < tempPmProducts.length; x++) {
              if (tempPmProducts[x].hasOwnProperty(result.destination.droppableId)) {
                tempPmProducts[x][result.destination.droppableId].push(reorderedItem);
              }
            }
          }
        }
        updatePmProducts(tempPmProducts);
      };
      updateProducts(sample);
    }

    // Movement between same routine
    if (result.source.droppableId === result.destination.droppableId) {

      let sample = Array.from(sampleProducts);

      // Movement between sample routine
      if (result.source.droppableId in hashmap) {
        for (let i = 0; i < sample.length; i++) {
          if (sample[i].hasOwnProperty(result.destination.droppableId)) {
            let index = sample[i][result.destination.droppableId].findIndex(product => product.id.toString() === result.draggableId)
            const [reorderedItem] = sample[i][result.destination.droppableId].splice(index, 1); // Remove the item from the sample products
            sample[i][result.destination.droppableId].splice(result.destination.index, 0, reorderedItem); // Add the item to the reordered index
          }
        }
        updateProducts(sample);
      }

      let routine = "pm";
      for (let y = 0; y < amProducts.length; y++) {
        if (amProducts[y].hasOwnProperty(result.source.droppableId)) {
          routine = "am"
        }
      }

      if (routine === "am") {
        let tempAmProducts = Array.from(amProducts);

        for (let i = 0; i < tempAmProducts.length; i++) {
          if (tempAmProducts[i].hasOwnProperty(result.destination.droppableId)) {
            let index = tempAmProducts[i][result.destination.droppableId].findIndex(product => product.id.toString() === result.draggableId)
            const [reorderedItem] = tempAmProducts[i][result.destination.droppableId].splice(index, 1); // Remove the item from the custom products
            tempAmProducts[i][result.destination.droppableId].splice(result.destination.index, 0, reorderedItem); // Add the item to the reordered index
          }
        }
        updateAmProducts(tempAmProducts);
      }

      if (routine === "pm") {
        let tempPmProducts = Array.from(pmProducts);

        for (let i = 0; i < tempPmProducts.length; i++) {
          if (tempPmProducts[i].hasOwnProperty(result.destination.droppableId)) {
            let index = tempPmProducts[i][result.destination.droppableId].findIndex(product => product.id.toString() === result.draggableId)
            const [reorderedItem] = tempPmProducts[i][result.destination.droppableId].splice(index, 1); // Remove the item from the custom products
            tempPmProducts[i][result.destination.droppableId].splice(result.destination.index, 0, reorderedItem); // Add the item to the reordered index
          }
        }
        updatePmProducts(tempPmProducts);
      }
    } else if

      // Movement AM <-> PM 
      (!(result.source.droppableId in hashmap)) {
      let matchingStep = false;

      for (const prop in hashmap) {
        if ((hashmap[prop].includes(result.source.droppableId)) && hashmap[prop].includes(result.destination.droppableId)) {
          matchingStep = true;
        }
      }

      if (matchingStep === true) {

        // Determine if source product is am or pm
        let sourceProduct = "pm";
        for (let y = 0; y < amProducts.length; y++) {
          if (amProducts[y].hasOwnProperty(result.source.droppableId)) {
            sourceProduct = "am"
          }
        }

        // AM -> PM
        if (sourceProduct === "am") {
          let tempAmProducts = Array.from(amProducts);
          let tempPmProducts = Array.from(pmProducts);

          for (let i = 0; i < tempAmProducts.length; i++) {
            if (tempAmProducts[i].hasOwnProperty(result.source.droppableId)) {
              let index = tempAmProducts[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
              const [reorderedItem] = tempAmProducts[i][result.source.droppableId].splice(index, 1) // Remove the item from the am products

              // Insert the item into the pm routine
              for (let x = 0; x < tempPmProducts.length; x++) {
                if (tempPmProducts[x].hasOwnProperty(result.destination.droppableId)) {
                  tempPmProducts[x][result.destination.droppableId].push(reorderedItem);
                }
              }
            }
          }
          updateAmProducts(tempAmProducts);
          updatePmProducts(tempPmProducts);
        }

        // PM -> AM
        if (sourceProduct === "pm") {
          let tempAmProducts = Array.from(amProducts);
          let tempPmProducts = Array.from(pmProducts);

          for (let i = 0; i < tempPmProducts.length; i++) {
            if (tempPmProducts[i].hasOwnProperty(result.source.droppableId)) {
              let index = tempPmProducts[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
              const [reorderedItem] = tempPmProducts[i][result.source.droppableId].splice(index, 1) // Remove the item from the pm products

              // Insert the item into the am routine
              for (let x = 0; x < tempAmProducts.length; x++) {
                if (tempAmProducts[x].hasOwnProperty(result.destination.droppableId)) {
                  tempAmProducts[x][result.destination.droppableId].push(reorderedItem);
                }
              }
            }
          }
          updateAmProducts(tempAmProducts);
          updatePmProducts(tempPmProducts);
        }
      }
    }

  }

  const saveRoutine = async () => {
    const newRoutine = {
      title: "Acne Routine",
      author: "Emmanuel",
      comments: [{ "body": "No comment" }],
      hidden: false,
      products: {
        "cleanse": AMPRODUCTS[0].name,
        "moisturize": AMPRODUCTS[1].name,
        "protect": AMPRODUCTS[2].name
      }
    };
    const response = await fetch('/routines', {
      method: 'POST',
      body: JSON.stringify(newRoutine),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      alert("Successfully added the routine!");
    } else {
      alert(`Failed to add routine, status code = ${response.status}`);
    }
  };

  return (
    <div>
      <Container>

        <DragDropContext onDragEnd={handleOnDragEnd}>

          <RoutineStyle>
            <h2>Sample Routine</h2>
            <RoutineTable products={sampleProducts} routine="Sample" />
          </RoutineStyle>

          <RoutineStyle>
            <h2>AM Routine</h2>
            <RoutineTable products={amProducts} routine="Am" updateProducts={updateAmProducts} productId={productId} setProductId={setProductId} />
            <button onClick={saveRoutine}>Save Routine</button>
          </RoutineStyle>

          <RoutineStyle>
            <h2>PM Routine</h2>
            <RoutineTable products={pmProducts} routine="Pm" updateProducts={updatePmProducts} productId={productId} setProductId={setProductId} />
            <button onClick={saveRoutine}>Save Routine</button>
          </RoutineStyle>

        </DragDropContext>
        <AddProduct amProds={amProducts} pmProds={pmProducts} updateAM={updateAmProducts} updatePM={updatePmProducts} productID={productId} setProductID={setProductId} />

      </Container >
    </div>

  );
}

export default App