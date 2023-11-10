<h1 align="center" >Technical test</h1>

## Installation
### 1.Installer node.js
### 2. In your terminal : 

- Clone the project (make sure you're already in a folder)
```bash
git clone https://github.com/Coussecousse/technical_test.git .
```

- Install dependencies
```bash
npm install
```
then
```bash
npm run install:custom
```
### 3. Database Configuration :
- Create your database
- Set the connection details in the following files :
  - server/config/config.json
  - server/src/util/database.providers.tsx

### 4. Back in terminal : 
```bash
npm run seed
```
```bash 
npm start
```

### 5. You're ready to go !
