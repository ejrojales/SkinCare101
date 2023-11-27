import { Draggable } from "react-beautiful-dnd";
import { List, ListItem } from "@material-tailwind/react";
import { useState } from "react";

function RoutineProduct({ products }) {

    return (

        <List>
            {products.map((product, index) => {
                return (
                    <Draggable key={product.id} draggableId={product.id.toString()} index={index}>
                        {(provided) => (
                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <ListItem className="text-blue-700 flex justify-center" >{product.name}</ListItem>
                            </div>
                        )}
                    </Draggable>
                )
            })}
        </List>

    );
}

export default RoutineProduct