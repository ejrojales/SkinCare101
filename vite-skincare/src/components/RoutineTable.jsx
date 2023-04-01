import RoutineStep from "./RoutineStep";

function RoutineTable({ sampleProducts, customProducts, routine, updateCustomProducts, productId, setProductId }) {

    return (
        <div>
            <RoutineStep sampleProducts={sampleProducts} customProducts={customProducts} step="Cleanse" routine={routine} updateCustomProducts={updateCustomProducts} productId={productId} setProductId={setProductId} />

            <RoutineStep sampleProducts={sampleProducts} customProducts={customProducts} step="Moisturize" routine={routine} updateCustomProducts={updateCustomProducts} productId={productId} setProductId={setProductId} />

            <RoutineStep sampleProducts={sampleProducts} customProducts={customProducts} step="Protect" routine={routine} updateCustomProducts={updateCustomProducts} productId={productId} setProductId={setProductId} />
        </div>
    );
}

export default RoutineTable;