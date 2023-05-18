Recipez.
===

Recipez is a simple MERN stack application using [*Spoonacular API*](https://spoonacular.com/food-api/docs) to Search recipes based on the Ingredients.

### Find the site deployed [here](https://recipez-m27.onrender.com).

Vite with React plugin and CSS is used for frontend (client) rendering, Node.js with Express routing is used as backend (server) and MongoDB provides storage.

This site is deployed on Render.

To run locally,
---
+ Clone the repository.
+ Install npm packages in client and server folders by running `npm install` .
+ Create environmental variables for accessing 
  +  MongoDB(URI), JWT passkey on Server directory.
  +  Backend URL and Spoonacular API Key on Client directory.
+ `cd server && npm start` will run server on port 8000 unless specified.
+ `cd client && npm run dev` will run client on port 5173.

