"use strict";

import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import RoutineTable from './components/RoutineTable.jsx'
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


const CUSTOMPRODUCTS = [
  { "CustomCleanse": [] },
  { "CustomMoisturize": [] },
  { "CustomProtect": [] }
];


function App() {

  const [sampleProducts, updateProducts] = useState(SAMPLEPRODUCTS);
  const [customProducts, updateCustomProducts] = useState(CUSTOMPRODUCTS);
  const [productId, setProductId] = useState(5)

  function handleOnDragEnd(result) {
    const hashmap = {
      "SampleCleanse": "CustomCleanse",
      "SampleMoisturize": "CustomMoisturize",
      "SampleProtect": "CustomProtect"
    }

    // Dragging a custom product to a non-droppable zone or back to the sample routine zone, returns that product back to the sample products
    if ((!(result.source.droppableId in hashmap) && !result.destination) || ((!(result.source.droppableId in hashmap) && result.destination) && result.destination.droppableId in hashmap)) {

      let sample = Array.from(sampleProducts); // Create a copy array of sample products
      let custom = Array.from(customProducts); // Create a copy array of custom products

      for (let i = 0; i < custom.length; i++) {
        if (custom[i].hasOwnProperty(result.source.droppableId)) {
          let index = custom[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
          const [reorderedItem] = custom[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

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
      updateCustomProducts(custom); // update the state of sample products
    }

    if (!result.destination) return;



    console.log(result)

    // Movement from sample to custom routine
    if (result.destination.droppableId === hashmap[result.source.droppableId]) {

      let sample = Array.from(sampleProducts); // Create a copy array of sample products
      let custom = Array.from(customProducts); // Create a copy array of custom products

      for (let i = 0; i < sample.length; i++) {
        if (sample[i].hasOwnProperty(result.source.droppableId)) {
          let index = sample[i][result.source.droppableId].findIndex(product => product.id.toString() === result.draggableId)
          const [reorderedItem] = sample[i][result.source.droppableId].splice(index, 1) // Remove the item from the sample products

          // Insert the item into the custom routine
          for (let x = 0; x < custom.length; x++) {
            if (custom[x].hasOwnProperty(result.destination.droppableId)) {
              custom[x][result.destination.droppableId].push(reorderedItem);
            }
          }
        }
      }

      updateProducts(sample); // update the state of sample products
      updateCustomProducts(custom); // update the state of sample products
    };

    // Movement between same routine
    if (result.source.droppableId === result.destination.droppableId) {

      let sample = Array.from(sampleProducts); // Create a copy of sample products
      let custom = Array.from(customProducts); // Create a copy of custom products

      // if movement between sample routine, reorder sample products and update state of sample products
      if (result.source.droppableId in hashmap) {

        for (let i = 0; i < sample.length; i++) {
          if (sample[i].hasOwnProperty(result.destination.droppableId)) {
            let index = sample[i][result.destination.droppableId].findIndex(product => product.id.toString() === result.draggableId)
            const [reorderedItem] = sample[i][result.destination.droppableId].splice(index, 1); // Remove the item from the sample products
            sample[i][result.destination.droppableId].splice(result.destination.index, 0, reorderedItem); // Add the item to the reordered index
          }
        }
        updateCustomProducts(custom); // update the state of products to re-render the newly updated products
      }

      // if movement between custom routine, reorder custom products and update state of custom products
      if (!(result.source.droppableId in hashmap)) {

        for (let i = 0; i < custom.length; i++) {
          if (custom[i].hasOwnProperty(result.destination.droppableId)) {
            let index = custom[i][result.destination.droppableId].findIndex(product => product.id.toString() === result.draggableId)
            const [reorderedItem] = custom[i][result.destination.droppableId].splice(index, 1); // Remove the item from the custom products
            custom[i][result.destination.droppableId].splice(result.destination.index, 0, reorderedItem); // Add the item to the reordered index
          }
        }
        updateCustomProducts(custom); // update the state of products to re-render the newly updated products
      }
    }
  }

  return (

    <Container>

      <DragDropContext onDragEnd={handleOnDragEnd}>

        <RoutineStyle>
          <h2>Sample Routine</h2>
          <RoutineTable sampleProducts={sampleProducts} customProducts={customProducts} routine="Sample" />
        </RoutineStyle>

        <RoutineStyle>
          <h2>Build Your Own Routine</h2>
          <RoutineTable sampleProducts={sampleProducts} customProducts={customProducts} routine="Custom" updateCustomProducts={updateCustomProducts} productId={productId} setProductId={setProductId} />
        </RoutineStyle>

      </DragDropContext>

    </Container >
  );
}

export default App
