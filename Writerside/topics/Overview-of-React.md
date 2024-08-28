# Overview of React

## React Quickstart

Before you start, you should have a basic understanding of:

1. [x] What is HTML
2. [x] What is CSS
3. [x] What is DOM
4. [x] What is ES6
5. [x] What is Node.js
6. [x] What is npm

## What is React?
![react.png](react.png)

- React, sometimes referred to as a frontend JavaScript framework, is a JavaScript library created by Facebook.
- React is a tool for building UI components.
- React has solidified its position as the go-to JavaScript front-end framework in the current tech landscape. It’s fascinating to see how it’s seamlessly woven itself into the development practices of well-established corporations and budding startups alike.

## What is React used for?

1. **Web development :** 
   - This is where React got its start and where you’ll find it used most often. React is component-based. An example of a component could be a form or even just a form field or button on a website. In React, you build up complete applications using components like these by nesting them.
   - Components in React can manage their own state and communicate that state to child components. By “state,” we mean the data that populates the web application.
2. **Mobile app development :**
   - React Native is a JavaScript framework that uses React. With React Native, developers can apply web-based React principles to creating mobile apps for Android and iOS. Here, React is used to connect the mobile user interface of the application to the phone’s operating system.
3. **Desktop app development :** 
   - Developers can also use React with Electron, another JavaScript library, to create cross-platform desktop apps. Some apps you may know about that are built with Electron include Visual Studio Code, Slack, Skype, Discord, WhatsApp, and WordPress Desktop.

## React.JS History

React.js, a popular JavaScript library for building user interfaces, particularly for single-page applications, has a fascinating history that reflects its evolution and growing adoption in the web development community. Here's a brief history of React.js in bullet points:

- **2011**: React.js created by Facebook's Jordan Walke for internal use.
- **2013**: Open-sourced at JSConf US; introduced virtual DOM.
- **2014**: Facebook introduced Flux, influencing state management in React.
- **2015**: React Native launched, expanding React to mobile apps.
- **2015**: React v0.14 split core into `react` and `react-dom`.
- **2016**: React v15 brought performance improvements and `prop-types`.
- **2017**: React Fiber (v16) restructured core for better responsiveness.
- **2018**: Hooks introduced in v16.8, transforming component design.
- **2019**: Experimental Suspense and Concurrent Mode introduced.
- **2020**: React v17 focused on easier upgrades.
- **2022**: React 18 brought full Concurrent Mode and enhanced UI responsiveness.
- **2023**: React 19 is the latest major release of the React JavaScript library, bringing a range of new features and improvements aimed at enhancing both developer experience and application performance. Some of the key updates include:

     1. **React Compiler**: A significant new feature, the React Compiler automates many performance optimizations, like memoization, which were previously handled manually using hooks like `useMemo` and `useCallback`. This simplifies the code and makes React apps faster and more efficient.

     2. **Actions and Form Handling**: React 19 introduces a new way to handle form submissions and state changes using "Actions." This feature simplifies managing asynchronous operations, making it easier to handle loading states, errors, and successful form submissions.

     3. **New Hooks**: Several new hooks have been introduced, such as `useOptimistic`, which allows for optimistic UI updates (i.e., updating the UI immediately while awaiting server confirmation), and `use`, which simplifies asynchronous operations within components. Additionally, the `useFormStatus` and `useActionState` hooks make managing form state more intuitive.

     4. **Server Components**: React 19 enhances server-side rendering by allowing server components, similar to features in frameworks like Next.js. This can lead to faster page loads and improved SEO.

     5. **Improved Metadata Management**: Managing document metadata like titles and meta tags is now easier and more integrated into React components, eliminating the need for third-party libraries like `react-helmet`.

     6. **Background Asset Loading**: React 19 introduces background loading of assets (like images and scripts), which helps improve page load times and overall user experience by preloading resources in the background as users navigate through the app.