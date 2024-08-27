
interface Tstreet {
    name: string;
    number: number;
}
const StreetCOmponent = (street:Tstreet) => {
    return (
        <div>
            <h3>Street</h3>
            <p>Name: {street.name}</p>
            <p>Number: {street.number}</p>
        </div>
    )
}

export default StreetCOmponent