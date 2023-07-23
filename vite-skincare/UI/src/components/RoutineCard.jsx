import { Card } from "@material-tailwind/react"

export default function RoutineCard({ routineCard }) {

    return (
        <div>
            {routineCard.map((routine) => (
                <Card className="mb-8" key={routine._id}>
                    <h3 className="underline mb-4">{routine.author}'s {routine.title}</h3>
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
                </Card>
            ))}
        </div>
    )
}