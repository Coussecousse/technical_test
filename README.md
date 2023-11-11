<h1 align="center" >Technical test</h1>

## Installation
### 1. Install node.js
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
  - `server/config/config.json`
  - `server/src/util/database.providers.tsx`
- ❗ NestJS is listening on port 3001 (`server/src/main.ts`) and I setup a "proxy" on `client/package.json`

### 4. Back in terminal : 
```bash 
npm start
```
then
```bash
npm run seed
```

### 5.❗Refresh the page to update the parking

### 6. You're ready to go !

## Storytelling
Real challenge for me to use not one, not two but **three** languages that I don't know !
Indeed, I never used Redux, Typescript or NestJS but **HEY**, every language have the same logic right ? 
So I passed my Saturday night and Sunday morning to read documentations and watch youtube videos.

I manage to use Redux or NestJS but ~~fucking hell~~, Typescript ! 
<p align="center">
  <img src="https://github.com/Coussecousse/technical_test/blob/master/client/src/images/gif.gif" align="center" alt="Angry man shooting a computer">
</p>
  It was like a child who cry for nothing every time I code something. <br/>
  But after some night with my screen red for some hours, I managed to tame the beast. (Thank you ChatGPT btw)

**Anyway.**
### I'm not sure about...
#### <li> The Store
I try to use Redux and I conceived the store with states that I need in all my routes like **isMenuOpen** and **parking**. I have states in some routes like **data** or **error** but as I need them only in thoses I thought not including them in the store. Not sure if it's a good practice.

#### <li> I removed the StrictMode
I know I shouldn't have done this, but when I clicked on "get a ticket," the double render created 2 tickets instead of one.

#### <li> A function to update the state parking
I try to dispatch with a "correct way" the parking state like isMenuOpen : 
```js
dispatch({ type: actionTypes.CLOSE_MENU });
```
But I didn't manage to do the same mostly because I was fetching data from the database so it gives this :
```
dispatch(updatePlaces());
```
```js
// placesActions.ts
export const updatePlaces = () => {
    return async (dispatch: Dispatch) => {
        try {
          const response = await fetch('/get-places');
          const data = await response.json();
          dispatch({ type: UPDATE_PLACES, payload: data });
        } catch (error) {
          console.log(error);
        }
      };
};
```

### I need to improve...
<p>...A lot of things but mostly : </p>
<li> Error handling
<li> Unit tests