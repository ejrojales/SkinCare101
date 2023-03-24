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

const PRODUCTS = [
  { id: 0, step: "Cleanse", name: "Senka Perfect Whip Cleanser" },
  { id: 1, step: "Cleanse", name: "Cerave Acne Foaming Cleanser" },
  { id: 2, step: "Moisturize", name: "Aestura AtoBarrier Moisturizer" },
  { id: 3, step: "Protect", name: "Round Lab Birch Juice Sunscreen" },
];


const CUSTOMPRODUCTS = [];


function RoutineTable({ products, customProducts, routine }) {

  return (
    <div>
      <RoutineStep products={products} customProducts={customProducts} step="Cleanse" routine={routine} />
      <RoutineStep products={products} customProducts={customProducts} step="Moisturize" routine={routine} />
      <RoutineStep products={products} customProducts={customProducts} step="Protect" routine={routine} />
    </div>
  );
}

function RoutineStep({ products, customProducts, step, routine }) {

  let stepProducts = [];

  if (routine === "Sample") {
    // for each product, if product.step == step: append product to stepProducts
    products.forEach((product) => {
      if (product.step == step) {
        stepProducts.push(product);
      };
    });
  };

  if (routine === "Custom") {
    // for each product, if product.step == step: append product to stepProducts
    customProducts.forEach((product) => {
      if (product.step == step) {
        stepProducts.push(product);
      };
    });
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

  const [products, updateProducts] = useState(PRODUCTS);
  const [customProducts, updateCustomProducts] = useState(CUSTOMPRODUCTS);
  const hashmap = {
    "SampleCleanse": "CustomCleanse",
    "SampleMoisturize": "CustomMoisturize",
    "SampleProtect": "CustomProtect"
  }

  function handleOnDragEnd(result) {

    if (!result.destination) return;

    console.log(result)

    if (result.destination.droppableId === hashmap[result.source.droppableId]) {

      const sample = Array.from(products); // Create a copy array of sample products
      const custom = Array.from(customProducts); // Create a copy array of custom products

      let index = sample.findIndex(product => product.id.toString() === result.draggableId)
      const [reorderedItem] = sample.splice(index, 1); // Remove the item from the sample products

      custom.splice(0, 0, reorderedItem); // Add the item to the customProducts

      updateProducts(sample); // update the state of sample products
      updateCustomProducts(custom); // update the state of sample products
    };

  }

  return (

    <Container>

      <DragDropContext onDragEnd={handleOnDragEnd}>

        <RoutineStyle>
          <h2>Sample Routine</h2>
          <RoutineTable products={products} customProducts={customProducts} routine="Sample" />
        </RoutineStyle>

        <RoutineStyle>
          <h2>Build Your Own Routine</h2>
          <RoutineTable products={products} customProducts={customProducts} routine="Custom" />
        </RoutineStyle>

      </DragDropContext>

    </Container >
  );
}

export default App
