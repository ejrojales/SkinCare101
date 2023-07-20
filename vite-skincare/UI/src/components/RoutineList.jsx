const RoutineList = ({ routines }) => {

    return (
        <div>
            {routines.map((routine) => (
                <div key={routine._id}>
                    <h3>{routine.author}'s {routine.title}</h3>
                    <ul>
                        <li>
                            <strong>Cleansing Products:</strong>
                            <ul>
                                {routine.products.cleanse.map((product) => (
                                    <li key={product.id}>{product.name}</li>
                                ))}
                            </ul>
                        </li>
                        <li>
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
                </div>
            ))}
        </div>
    )
}

export default RoutineList;