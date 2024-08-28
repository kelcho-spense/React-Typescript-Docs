# Using Props for Reusable Components - V2

Props make your components more flexible and reusable by allowing you to change what gets displayed or how it behaves depending on the data passed. Let's extend this concept further by creating reusable components for different types of input fields, such as file inputs, radio buttons, range sliders, and checkboxes. These reusable components will be utilized in different forms, showcasing how they can be adapted for various use cases.

---

### **Example: Creating Reusable Input Components**

We’ll define a few reusable input components: `FileInput`, `RadioInput`, `RangeInput`, and `CheckboxInput`.

#### **Reusable Input Components**

```javascript
import React from 'react';

interface FileInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, onChange }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>
        {label}
      </label>
      <input type="file" onChange={onChange} />
    </div>
  );
};

interface RadioInputProps {
  label: string;
  name: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({ label, name, options, onChange }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label>{label}</label>
      <div>
        {options.map((option) => (
          <label key={option} style={{ marginRight: '16px' }}>
            <input type="radio" name={name} value={option} onChange={onChange} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

interface RangeInputProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({ label, min, max, value, onChange }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label>{label}</label>
      <input type="range" min={min} max={max} value={value} onChange={onChange} />
      <span>{value}</span>
    </div>
  );
};

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, checked, onChange }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};

export { FileInput, RadioInput, RangeInput, CheckboxInput };
```

**Explanation:**
- **FileInput**: A reusable component for `<input type="file">`, allowing users to select files.
- **RadioInput**: A reusable component for `<input type="radio">`, supporting multiple options.
- **RangeInput**: A reusable component for `<input type="range">`, including a slider with a label.
- **CheckboxInput**: A reusable component for `<input type="checkbox">`, with a label and toggle functionality.

---

### **Using Reusable Input Components in Forms**

Let's use these reusable input components in two different forms: a survey form and a settings form.

#### **Survey Form Example:**

```javascript
import React, { useState } from 'react';
import { FileInput, RadioInput, RangeInput, CheckboxInput } from './ReusableInputs';

const SurveyForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rating, setRating] = useState(5);
  const [favoriteColor, setFavoriteColor] = useState('');
  const [agree, setAgree] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFavoriteColor(e.target.value);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ file, rating, favoriteColor, agree });
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <FileInput label="Upload Your Profile Picture" onChange={handleFileChange} />
      <RadioInput
        label="Favorite Color"
        name="color"
        options={['Red', 'Green', 'Blue']}
        onChange={handleColorChange}
      />
      <RangeInput label="Rate our service" min={1} max={10} value={rating} onChange={handleRangeChange} />
      <CheckboxInput label="I agree to the terms and conditions" checked={agree} onChange={handleCheckboxChange} />
      <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>Submit</button>
    </form>
  );
};

export default SurveyForm;
```

**Explanation:**
- **FileInput**: Used for uploading a profile picture.
- **RadioInput**: Used to select a favorite color from a set of options.
- **RangeInput**: Used to rate the service on a scale from 1 to 10.
- **CheckboxInput**: Used to agree to the terms and conditions.

#### **Settings Form Example:**

```javascript
import React, { useState } from 'react';
import { FileInput, RadioInput, RangeInput, CheckboxInput } from './ReusableInputs';

const SettingsForm: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [theme, setTheme] = useState('Light');
  const [volume, setVolume] = useState(50);
  const [notifications, setNotifications] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.files ? e.target.files[0] : null);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ avatar, theme, volume, notifications });
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <FileInput label="Upload Avatar" onChange={handleFileChange} />
      <RadioInput
        label="Select Theme"
        name="theme"
        options={['Light', 'Dark']}
        onChange={handleThemeChange}
      />
      <RangeInput label="Adjust Volume" min={0} max={100} value={volume} onChange={handleRangeChange} />
      <CheckboxInput label="Enable Notifications" checked={notifications} onChange={handleCheckboxChange} />
      <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>Save Settings</button>
    </form>
  );
};

export default SettingsForm;
```

**Explanation:**
- **FileInput**: Used for uploading an avatar.
- **RadioInput**: Used to select a theme (Light or Dark).
- **RangeInput**: Used to adjust the volume level.
- **CheckboxInput**: Used to toggle notifications on or off.

---