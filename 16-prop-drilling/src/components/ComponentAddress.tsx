import StreetCOmponent from './StreetCOmponent';
interface TAddress {
    street: {
        name: string;
        number: number;
    };
    city: string;
    state: string;
}

export default function ComponentAddress(address: TAddress) {
    return (
        <div>
            <h2>Address</h2>
            <p>City: {address.city}</p>
            <p>State: {address.state}</p>
            <StreetCOmponent {...address.street} />
        </div>
    )
}

