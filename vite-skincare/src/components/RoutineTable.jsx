import RoutineStep from "./RoutineStep";

function RoutineTable({ products, routine, updateProducts, productId, setProductId }) {

    return (
        <div>
            <RoutineStep products={products} step="Cleanse" routine={routine} updateProducts={updateProducts} productId={productId} setProductId={setProductId} />

            <RoutineStep products={products} step="Moisturize" routine={routine} updateProducts={updateProducts} productId={productId} setProductId={setProductId} />

            <RoutineStep products={products} step="Protect" routine={routine} updateProducts={updateProducts} productId={productId} setProductId={setProductId} />
        </div>
    );
}

export default RoutineTable;