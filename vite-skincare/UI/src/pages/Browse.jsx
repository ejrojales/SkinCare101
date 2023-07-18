export function Browse() {
    return (
        <div>
            <h2>Browse AM Routines</h2>
        </div>

    )
};

export const dataLoader = async () => {
    const res = await fetch('/AMroutines');
}