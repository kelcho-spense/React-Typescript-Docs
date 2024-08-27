import ComponentAddress from './ComponentAddress';


interface TUser {
    name: string;
    email: string;
    age: number;
    address: {
        street: {
            name: string;
            number: number;
        };
        city: string;
        state: string;
    }
}

export default function UserComponent(user: TUser) {
    return (
        <div>
            <h1>User</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <ComponentAddress  {...user.address} />
        </div>
    )
}

