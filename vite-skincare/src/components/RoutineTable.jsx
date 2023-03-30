import RoutineStep from "./RoutineStep";

function RoutineTable({ sampleProducts, customProducts, routine }) {

    return (
        <div>
            <RoutineStep sampleProducts={sampleProducts} customProducts={customProducts} step="Cleanse" routine={routine} />
            <RoutineStep sampleProducts={sampleProducts} customProducts={customProducts} step="Moisturize" routine={routine} />
            <RoutineStep sampleProducts={sampleProducts} customProducts={customProducts} step="Protect" routine={routine} />
        </div>
    );
}

export default RoutineTable;