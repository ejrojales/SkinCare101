import { Draggable } from "react-beautiful-dnd";

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

export default RoutineProduct