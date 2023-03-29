"use strict";

import { useState } from 'react'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from './helpers/StrictModeDroppable'
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


function RoutineTable({ sampleProducts, customProducts, routine }) {

  return (
    <div>
      <RoutineStep sampleProducts={sampleProducts} customProducts={customProducts} step="Cleanse" routine={routine} />
      <RoutineStep sampleProducts={sampleProducts} customProducts={customProducts} step="Moisturize" routine={routine} />
      <RoutineStep sampleProducts={sampleProducts} customProducts={customProducts} step="Protect" routine={routine} />
    </div>
  );
}

function RoutineStep({ sampleProducts, customProducts, step, routine }) {

  let stepProducts = [];

  if (routine === "Sample") {

    for (let i = 0; i < sampleProducts.length; i++) {
      if (sampleProducts[i].hasOwnProperty(routine + step)) {
        sampleProducts[i][routine + step].forEach(product => {
          stepProducts.push(product)
        })

      }
    }
  };

  if (routine === "Custom") {

    for (let i = 0; i < customProducts.length; i++) {
      if (customProducts[i].hasOwnProperty(routine + step)) {
        customProducts[i][routine + step].forEach(product => {
          stepProducts.push(product)
        })
      }
    }
  };

  // each droppableId needs to be unique
  let dropId = routine + step;
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
}

function RoutineProduct({ products }) {

  return (

    <ul>
      {products.map((product, index) => {
        return (
          <Draggable key={product.id} draggableId={product.id.toString()} index={index}>
            {(provided) => (
              <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{product.name}</li>
            )}
          </Draggable>
        )
      })}
    </ul>

  );
}

function App() {

  const [sampleProducts, updateProducts] = useState(SAMPLEPRODUCTS);
  const [customProducts, updateCustomProducts] = useState(CUSTOMPRODUCTS);
  const hashmap = {
    "SampleCleanse": "CustomCleanse",
    "SampleMoisturize": "CustomMoisturize",
    "SampleProtect": "CustomProtect"
  }

  function handleOnDragEnd(result) {

    // Dragging a custom product to a non-droppable zone, returns that product back to the sample products
    if (!(result.source.droppableId in hashmap) && !result.destination) {

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
          <RoutineTable sampleProducts={sampleProducts} customProducts={customProducts} routine="Custom" />
        </RoutineStyle>

      </DragDropContext>

    </Container >
  );
}

export default App
