# Thinking in React

"Thinking in React" is a concept that describes the process of designing and building user interfaces with React.js. It emphasizes breaking down the UI into components, managing data flow, and structuring the application in a way that aligns with React's component-based architecture. Here’s a concise breakdown:


### **1. Break Down the UI into Components**
1. **Start with a Mockup:** Look at your UI and identify the different parts that can be broken down into components.
  - Imagine that you already have a JSON API and a mockup from a designer.
    - The JSON API returns some data that looks like this:
      ```JSON
      [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
        { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
        { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
      ]
      ```
  The mockup looks like this:

![product page](product page.png)

2. There are five components on this screen:
 ![products page decoupled](products_page_decoupled.png)
   - FilterableProductTable (grey) contains the entire app.
   - SearchBar (blue) receives the user input.
   - ProductTable (lavender) displays and filters the list according to the user input.
   - ProductCategoryRow (green) displays a heading for each category.
   - ProductRow (yellow) displays a row for each product.
### **2. Build a Static Version in React**
   - **Create Stateless Components:** Initially, build components that don’t manage their own state, simply taking in props and rendering UI.
     - In the App.js add
     ```Javascript
       function ProductCategoryRow({ category }) {
           return (
             <tr>
               <th colSpan="2">
                 {category}
               </th>
             </tr>
           );
       }

        function ProductRow({ product }) {
            const name = product.stocked ? product.name :
            <span style={{ color: 'red' }}>
            {product.name}
            </span>;        
            return (
                <tr>
                    <td>{name}</td>
                    <td>{product.price}</td>
                </tr>
            );
        }

        function ProductTable({ products }) {
            const rows = [];
            let lastCategory = null;
            
            products.forEach((product) => {
                if (product.category !== lastCategory) {
                    rows.push(
                        <ProductCategoryRow
                            category={product.category}
                            key={product.category}
                         />
                    );
                }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} 
                />
                );
                lastCategory = product.category;
            });

            return (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            );
        }

        function SearchBar() {
            return (
                <form>
                    <input type="text" placeholder="Search..." />
                    <label>
                        <input type="checkbox" />
                        {' '}
                        Only show products in stock
                    </label>
                </form>
            );
        }

        function FilterableProductTable({ products }) {
            return (
                <div>
                    <SearchBar />
                    <ProductTable products={products} />
                </div>
            );
        }

        const PRODUCTS = [
            {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
            {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
            {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
            {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
            {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
            {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
        ];

        export default function App() {
            return <FilterableProductTable products={PRODUCTS} />;
        }
     ```

### **3. Identify the Minimal Representation of UI State**
- **Determine What State Your UI Needs:** Consider what needs to change in your UI and represent it in the component's state.
- **Single Source of Truth:** Identify where the state should live—often in the highest common ancestor component that needs to share the state.

### **4. Identify Where Your State Should Live**
- **Lift State Up:** When multiple components need to share state, lift it up to their closest common ancestor.
- **Controlled Components:** Ensure components only control their own state or receive state from a parent component.

### **5. Add Inverse Data Flow**
- **Pass Callbacks to Update State:** Child components that need to modify the parent's state should do so via callbacks passed down as props.

### **6. Implement the Final UI**
- **Refine Components:** Continue to break down components, manage state efficiently, and ensure the data flows in a top-down manner.

"Thinking in React" is about modularity, clarity, and a clear data flow, which together make building complex UIs more manageable.