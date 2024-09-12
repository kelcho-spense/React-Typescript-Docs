# 1.6.2 Vite vs CRA

![Vite Vs CRA](vite.png)
The preferred way between **Create React App (CRA)** and **Vite** depends on your specific needs and preferences:
In summary, if you prioritize ease of use and community support, go with CRA. If you want faster builds and a modern toolchain, Vite is likely the better option.

### **Create React App (CRA):**
- **Pros:**
    - **Established and widely used:** CRA has been the go-to tool for creating React apps for years, with extensive documentation and community support.
    - **Easy to use:** It's beginner-friendly, with minimal configuration needed to get started.
    - **Comprehensive setup:** CRA includes everything you need for a React project, including testing and build tools.

- **Cons:**
    - **Performance:** CRA can be slower, especially with larger projects, due to its older build tools.
    - **Limited customization:** While CRA abstracts away configuration for simplicity, this can be limiting for developers who need more control.

### **Vite:**
- **Pros:**
    - **Faster:** Vite is designed with performance in mind, offering faster build times and a more responsive development experience.
    - **Modern toolchain:** Vite uses modern build tools (like ESBuild) that take advantage of new web standards and are optimized for speed.
    - **Flexibility:** Vite provides more flexibility and control over the configuration, making it easier to customize for specific project needs.

- **Cons:**
    - **Less established:** While growing rapidly, Vite is newer compared to CRA, so there might be less community support or documentation for very niche use cases.
    - **More setup required:** Vite might require slightly more setup, especially if you're accustomed to CRA's out-of-the-box simplicity.

### **Recommendation:**
- **For beginners or small projects**: **Create React App** is still a solid choice due to its simplicity and extensive support.
- **For more advanced users or larger projects**: **Vite** is often preferred because of its performance benefits and modern tooling, especially if you're looking for a more optimized development experience.

To create a new React application using the tools mentioned in the image (Create React App and Vite), here are the brief commands:

### **Using Vite:**
1. **Create a new React app with Vite with javaScript:**
   ```bash
   pnpm create vite my-app --template react
   ```
   with **TypeScript**
    ```bash
   pnpm create vite my-app --template react-ts
   ```
2. **Navigate to the project directory:**
   ```bash
   cd my-app
   ```
3. **Install dependencies:**
   ```bash
   pnpm install
   ```
4. **Start the development server:**
   ```bash
   pnpm dev
   ```
### **Using Create React App:**
1. **Create a new React app:**
   ```bash
   npx create-react-app my-app
   ```
2. **Navigate to the project directory:**
   ```bash
   cd my-app
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```

