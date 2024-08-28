# Using Props for Reusable Components - V1
Props make your components more flexible and reusable by allowing you to change what gets displayed or how it behaves depending on the data passed. In this section, we'll extend the concept of reusable components by creating reusable input fields that can be used across different forms, such as registration and login forms. These input fields will include labels, input elements, and icons.

---

### **Example: Creating a Reusable Input Field Component**

We'll start by defining a reusable `InputField` component that can be used to create labeled input fields with optional icons.

```Javascript
import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, value, onChange, icon }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}>
        {icon && <div style={{ marginRight: '8px' }}>{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ flex: 1, border: 'none', outline: 'none' }}
        />
      </div>
    </div>
  );
};

export default InputField;
```

**Explanation:**
- **Props**:
    - `label`: The text label displayed above the input field.
    - `type`: The type of the input (e.g., `text`, `password`, `email`).
    - `placeholder`: Placeholder text inside the input field.
    - `value`: The current value of the input field.
    - `onChange`: A function to handle changes in the input field.
    - `icon`: An optional icon to be displayed inside the input field.

- **Component Structure**:
    - The component returns a `div` that contains a `label` and a `div` wrapping the input field and the optional icon.
    - The input field is styled to occupy the remaining space next to the icon.

---

### **Using the Reusable Input Field in Forms**

Let's use the `InputField` component in a registration form and a login form.

#### **Registration Form Example:**

```javascript
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

```

**Explanation:**
- The `RegistrationForm` component uses three instances of the `InputField` component, each with different labels, types, placeholders, and icons (`FaUser`, `FaEnvelope`, `FaLock` from `react-icons`).
- `useState` is used to manage the state of each input field.
- The form's `onSubmit` event is handled by the `handleSubmit` function, which prevents the default form submission behavior and logs the input values.

#### **Login Form Example:**

```javascript
import React, { useState } from 'react';
import InputField from './InputField';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
    // Handle form submission
  };

  return (
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
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<FaLock />}
      />
      <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>Login</button>
    </form>
  );
};

export default LoginForm;
```

**Explanation:**
- The `LoginForm` component reuses the `InputField` component for username and password inputs.
- The form is similar to the registration form but simpler, with only two input fields and a submit button.

---
