import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const PRODUCTS = [
  { id: 1, step: "Cleanse", name: "Senka Perfect Whip Cleanser" },
  { id: 2, step: "Cleanse", name: "Cerave Acne Foaming Cleanser" },
  { id: 3, step: "Moisturize", name: "Aestura AtoBarrier Moisturizer" },
  { id: 4, step: "Protect", name: "Round Lab Birch Juice Sunscreen" },
];


function RoutineTable({ products }) {

  return (
    <div>
      <RoutineStep products={products} step="Cleanse" />
      <RoutineStep products={products} step="Moisturize" />
      <RoutineStep products={products} step="Protect" />
    </div>
  );
}

function RoutineStep({ products, step }) {

  let stepProducts = [];
  // for each product, if product.step == step: append product to stepProducts
  products.forEach((product) => {
    if (product.step == step) {
      stepProducts.push(product);
    };
  });


  return (
    <>
      <h2>{step}</h2>
      <RoutineProduct products={stepProducts} />
    </>

  );
}

function RoutineProduct({ products }) {

  return (
    <ul>
      {products.map(product => {
        return <li key={product.id}>{product.name}</li>
      })}
    </ul>
  );
}

function App() {

  return (
    <div className="App">
      <div>
        <RoutineTable products={PRODUCTS} />
      </div>
    </div>
  );
}

export default App
