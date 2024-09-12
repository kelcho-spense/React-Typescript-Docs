# 1.5.2 PnPm Cheatsheet

Here's a cheat sheet for using PNPM to perform common tasks. PNPM is a fast and efficient package manager for Node.js projects, and this guide will help you get started with some of the most frequently used commands.

### **1. Initialization**
- **Initialize a new project (create `package.json`):**
  ```bash
  pnpm init
  ```

### **2. Installing Packages**
- **Install all dependencies listed in `package.json`:**
  ```bash
  pnpm install
  ```

- **Install a specific package (e.g., `lodash`):**
  ```bash
  pnpm add lodash
  ```

- **Install a package as a development dependency:**
  ```bash
  pnpm add eslint --save-dev
  ```
  or 
  ```bash
  pnpm add -D eslint 
  ```

- **Install a specific version of a package:**
  ```bash
  pnpm add lodash@4.17.20
  ```

- **Install dependencies without modifying `package.json` (useful for CI/CD):**
  ```bash
  pnpm install --frozen-lockfile
  ```

### **3. Removing Packages**
- **Uninstall a package:**
  ```bash
  pnpm remove lodash
  ```

### **4. Running Scripts**
- **Run a script defined in `package.json`:**
  ```bash
  pnpm run <script_name>
  ```
  Example:
  ```bash
  pnpm run build
  ```

- **Run a package binary without installing it globally:**
  ```bash
  pnpm dlx <package_name>
  ```
  Example:
  ```bash
  pnpm dlx create-react-app my-app
  ```

### **5. Working with Global Packages**
- **Install a package globally:**
  ```bash
  pnpm add -g eslint
  ```

- **List globally installed packages:**
  ```bash
  pnpm list -g --depth 0
  ```

### **6. Managing Dependencies**
- **Update all dependencies to the latest versions:**
  ```bash
  pnpm update --latest
  ```

- **Install dependencies without running `preinstall` and `postinstall` scripts:**
  ```bash
  pnpm install --ignore-scripts
  ```

### **7. Managing the PNPM Cache**
- **Clear the PNPM cache:**
  ```bash
  pnpm cache clean
  ```

### **8. Workspaces**
- **Create a new workspace:**
  ```bash
  pnpm init
  ```

- **Add a package to a workspace:**
  ```bash
  pnpm add <package_name> -w
  ```

- **Run a command in all workspace packages:**
  ```bash
  pnpm -r <command>
  ```
  Example:
  ```bash
  pnpm -r build
  ```

### **9. Linking Packages**
- **Link a package globally:**
  ```bash
  pnpm link
  ```

- **Link a package locally within a project:**
  ```bash
  pnpm link <package_name>
  ```

### **10. Miscellaneous**
- **Check for outdated packages:**
  ```bash
  pnpm outdated
  ```

- **List all installed packages:**
  ```bash
  pnpm list
  ```
