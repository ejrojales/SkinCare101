import { Button, Card, CardBody, CardFooter, List, ListItem } from "@material-tailwind/react"
import DeleteRoutine from "../helpers/DeleteRoutine"

export default function RoutineCard({ routines, page, setUserRoutines }) {

    // If on user profile page, card footer displays delete routine button
    // else if on browse page, card footer displays user avatar and date created
    return (
        <>
            {routines.map((routine) => (
                <Card className="m-4" key={routine._id}>
                    <CardBody>
                        <h3 className="font-bold mb-4">{routine.author} {routine.title}</h3>
                        <ul >
                            <li className="mb-4">
                                <strong>Cleansing Products:</strong>
                                <List>
                                    {routine.products.cleanse.map((product) => (
                                        <ListItem className="text-blue-700 flex justify-center text-center" key={product.id}>{product.name}</ListItem>
                                    ))}
                                </List>
                            </li>
                            <li className="mb-4">
                                <strong>Moisturizing Products:</strong>
                                <List>
                                    {routine.products.moisturize.map((product) => (
                                        <ListItem className="text-blue-700 flex justify-center text-center" key={product.id}>{product.name}</ListItem>
                                    ))}
                                </List>
                            </li>
                            <li>
                                <strong>Protecting Products:</strong>
                                <List>
                                    {routine.products.protect.map((product) => (
                                        <ListItem className="text-blue-700 flex justify-center text-center" key={product.id}>{product.name}</ListItem>
                                    ))}
                                </List>
                            </li>
                        </ul>
                    </CardBody>

                    <CardFooter className="p-0">
                        {page === "profile" && (
                            <Button onClick={(e) => { DeleteRoutine(routine._id, routines, setUserRoutines) }} color="red">Delete Routine</Button>
                        )}
                    </CardFooter>

                </Card>
            ))}
        </>
    )
}