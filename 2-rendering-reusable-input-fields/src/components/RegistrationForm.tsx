import React, { useState } from 'react';
import InputField from './InputField';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const RegistrationForm: React.FC = () => {
    interface TData {
        username: string;
        email: string;
        password: string;
    }
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [data, setData] = useState<TData>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !email || !password) {
            return alert('Please fill in all required fields');
        }
        // Handle form submission
        setData({ username, email, password });
        console.log({ username, email, password });
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <InputField
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    icon={<FaUser />}
                />
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<FaEnvelope />}
                />
                <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<FaLock />}
                />
                <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>Register</button>
            </form>
            <section>
                {
                    // display string fields
                    data && Object.keys(data).map((key, index) => (
                        <p key={index}>{key}: {data[key as keyof TData]}</p>
                    ))
                }

            </section>
        </>
    );
};

export default RegistrationForm;
