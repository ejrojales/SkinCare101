"use strict";

import { useState } from 'react'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from './helpers/StrictModeDroppable'
import './App.css'


const PRODUCTS = [
  { id: 1, step: "Cleanse", name: "Senka Perfect Whip Cleanser" },
  { id: 2, step: "Cleanse", name: "Cerave Acne Foaming Cleanser" },
  { id: 3, step: "Moisturize", name: "Aestura AtoBarrier Moisturizer" },
  { id: 4, step: "Protect", name: "Round Lab Birch Juice Sunscreen" },
];


function RoutineTable({ products, routine }) {

  return (
    <div>
      <RoutineStep products={products} step="Cleanse" routine={routine} />
      <RoutineStep products={products} step="Moisturize" routine={routine} />
      <RoutineStep products={products} step="Protect" routine={routine} />
    </div>
  );
}

function RoutineStep({ products, step, routine }) {

  let stepProducts = [];

  if (routine === "Sample") {
    // for each product, if product.step == step: append product to stepProducts
    products.forEach((product) => {
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

  const [products, updateProducts] = useState(PRODUCTS)

  function handleOnDragEnd(result) {

    if (!result.destination) return;

    const items = Array.from(products); // Create a copy array of products
    const [reorderedItem] = items.splice(result.source.index, 1); // Remove the item from the copy array
    items.splice(result.destination.index, 0, reorderedItem); // Add the item to the reordered index

    updateProducts(items); // update the state of products to re-render the newly updated products
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div>
          <h2>Sample Routine</h2>
          <RoutineTable products={products} routine="Sample" />
        </div>

        <div>
          <h2>Build Your Own Routine</h2>
          <RoutineTable products={products} routine="Custom" />
        </div>
      </DragDropContext>

    </div >
  );
}

export default App
