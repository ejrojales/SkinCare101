import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react"
import DeleteRoutine from "../helpers/DeleteRoutine"

export default function RoutineCard({ routines, page, setUserRoutines }) {

    // If on user profile page, card footer displays delete routine button
    // else if on browse page, card footer displays user avatar and date created
    return (
        <div>
            {routines.map((routine) => (
                <Card className="mb-8" key={routine._id}>
                    <CardBody>
                        <h3 className="font-bold mb-4">{routine.author} {routine.title} {routine._id}</h3>
                        <ul >
                            <li className="mb-8">
                                <strong>Cleansing Products:</strong>
                                <ul>
                                    {routine.products.cleanse.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>
                            </li>
                            <li className="mb-8">
                                <strong>Moisturizing Products:</strong>
                                <ul>
                                    {routine.products.moisturize.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <strong>Protecting Products:</strong>
                                <ul>
                                    {routine.products.protect.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </CardBody>
                    <CardFooter>
                        {page === "profile" && (
                            <Button onClick={(e) => { DeleteRoutine(routine._id, routines, setUserRoutines) }} color="red">Delete Routine</Button>
                        )}
                    </CardFooter>

                </Card>
            ))}
        </div>
    )
}