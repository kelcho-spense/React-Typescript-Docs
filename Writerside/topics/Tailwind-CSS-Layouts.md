# Tailwind CSS Layouts

Certainly! Let’s create various beautiful, fully responsive layouts using **React** and **Vite**, integrated with **Tailwind CSS**. I will guide you through using **Grid**, **Flexbox**, **Typography**, and **Sizing** utilities from Tailwind, but within React components.

### 1. **Basic Two-Column Layout Using Flexbox**
In this layout, we will create a two-column layout using Tailwind’s flexbox utilities.


```Javascript
import React from "react";

const TwoColumnLayout = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12">
      {/* Text Column */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-gray-900">
          Stunning Two-Column Layout
        </h2>
        <p className="text-lg text-gray-600">
          This is a basic two-column layout using Tailwind's flex utilities.
          It's responsive, stacking vertically on smaller screens.
        </p>
        <a
          href="#"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Learn More
        </a>
      </div>

      {/* Image Column */}
      <div className="mt-8 md:mt-0 md:w-1/2">
        <img
          src="https://via.placeholder.com/600x400"
          alt="Placeholder"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default TwoColumnLayout;
```

---

### 2. **Three-Column Grid Layout**
This layout demonstrates a grid layout with three columns that adjust responsively using Tailwind’s `grid` utilities.


```Javascript
import React from "react";

const ThreeColumnGrid = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-12">
      {/* Card 1 */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Responsive Card 1</h3>
        <p className="text-gray-700">
          This is a card with content that will adjust based on screen size.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Responsive Card 2</h3>
        <p className="text-gray-700">
          This is a card with content that will adjust based on screen size.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Responsive Card 3</h3>
        <p className="text-gray-700">
          This is a card with content that will adjust based on screen size.
        </p>
      </div>
    </section>
  );
};

export default ThreeColumnGrid;
```

---

### 3. **Hero Section with Centered Text**
This layout is a typical hero section with centered text using Tailwind’s flexbox utilities.


```Javascript
import React from "react";

const HeroSection = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white space-y-6">
        <h1 className="text-5xl font-extrabold">Welcome to Tailwind CSS</h1>
        <p className="text-lg">
          Build responsive and beautiful layouts easily with utility-first CSS.
        </p>
        <a
          href="#"
          className="inline-block bg-white text-blue-500 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
```

---

### 4. **Responsive Navigation Bar**
This layout shows how to build a responsive navigation bar with a hamburger menu on smaller screens.


```Javascript
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">Brand</div>
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </li>
        </ul>
        <button className="md:hidden text-gray-700 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
```

---

### 5. **Responsive Blog Grid Layout**
Here’s a blog grid layout using Tailwind’s grid system. It displays posts in a responsive grid.

```Javascript
import React from "react";

const BlogGrid = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-12">
      {/* Blog Post 1 */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src="https://via.placeholder.com/400"
          alt="Blog"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Blog Post Title 1</h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>

      {/* Blog Post 2 */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src="https://via.placeholder.com/400"
          alt="Blog"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Blog Post Title 2</h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>

      {/* Repeat for additional posts */}
    </section>
  );
};

export default BlogGrid;
```

---

### 6. **Responsive Footer**
Here’s a basic responsive footer with a 2-column layout on larger screens, collapsing into a single column on mobile devices.

```Javascript
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold">About Us</h4>
          <p className="text-gray-300">
            We are committed to providing high-quality content and resources for
            web developers and designers.
          </p>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold">Contact</h4>
          <p className="text-gray-300">Email: contact@example.com</p>
          <p className="text-gray-300">Phone: +123-456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

---
