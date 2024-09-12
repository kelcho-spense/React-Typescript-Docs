# 1.5.1 Installing Node.js and pnpm

### 1. **Installing PNPM**

PNPM is a fast, disk space-efficient package manager for Node.js. More information on [https://pnpm.io/installation](https://pnpm.io/installation)

1. **Install PNPM**:
    - Using Powershell:
      ```bash
      Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
      ```
    - On POSIX systems, you can use curl or wget:
      ```bash
      curl -fsSL https://get.pnpm.io/install.sh | sh -
      ```
      If you don't have curl installed, you would like to use wget:
      ```bash
      wget -qO- https://get.pnpm.io/install.sh | sh -
      ```

2. **Verify Installation**: After the installation completes, verify it by typing:
   ```bash
   pnpm -v
   ```
   This should display the installed PNPM version.
3. **Updating pnpm** : To update pnpm, run the `self-update` command:
   ```Bash
   pnpm self-update
   ```

To install Node.js with PNPM on your system, follow the steps below:

## 1. **Installing Node.js**

Node.js is a JavaScript runtime that allows you to run JavaScript code on your server or local machine. Here's how to install it:

### use
- Install and use the specified version of Node.js. Install the LTS version of Node.js:
```Bash
pnpm env use --global lts
```
- Or if you prefer a specific Install Node.js v16:
```Bash
pnpm env use --global 16
```