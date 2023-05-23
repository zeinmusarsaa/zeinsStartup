let database = {
    users: [],
    recipes: [
        { name: 'Favorite Recipe 1', description: 'Description of the recipe' },
        { name: 'Favorite Recipe 2', description: 'Description of the recipe' },
        { name: 'Favorite Recipe 3', description: 'Description of the recipe' },
    ],
}

let socket = new WebSocket("ws://mock-websocket-server.com");

window.onload = function() {
    const username = localStorage.getItem('userName');

    if (username) {
        document.getElementById('userName').innerText = `Welcome, ${username}!`;

    } else {
        window.location.href = "./index.html";
    }

    loadFavoriteRecipes();

    socket.onmessage = function(event) {
        let data = JSON.parse(event.data);
        if (data.type === 'newsfeed') {
          updateNewsfeed(data.message);
        } else if (data.type === 'recipes') {
          // Process and update the favorite recipes section
          updateFavoriteRecipes(data.recipes);
        }
      };

    socket.onopen = function(event) {
        socket.send("Hello Server!");
    }

    document.getElementById('recipeForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        let recipeName = document.getElementById('recipe-name').value;
        let ingredients = document.getElementById('ingredients').value;
        let instructions = document.getElementById('instructions').value;
        
        let message = `New Recipe Posted by ${username}: ${recipeName} - Ingredients: ${ingredients} - Instructions: ${instructions}`;
        
        // socket.send(message);  // You can comment this out if there's no server
        
        updateNewsfeed(message);  // Update the newsfeed directly
        document.getElementById('recipeForm').reset();  // Clear the form
    });
    
}

function addUser(name) {
    database.users.push(name);
}

function loadFavoriteRecipes() {
    let favoriteRecipesSection = document.querySelector('section.favorite-recipes');
  
    database.recipes.forEach((recipe) => {
        let recipeDiv = document.createElement('div');
        let recipeH3 = document.createElement('h3');
        let recipeP = document.createElement('p');
        
        recipeH3.textContent = recipe.name;
        recipeP.textContent = recipe.description;
        
        recipeDiv.appendChild(recipeH3);
        recipeDiv.appendChild(recipeP);
        
        favoriteRecipesSection.appendChild(recipeDiv);
    });
}

function updateNewsfeed(message) {
    let newsfeedContainer = document.getElementById('newsfeedContainer');
    let newsDiv = document.createElement('div');
    newsDiv.textContent = message;
    newsfeedContainer.prepend(newsDiv);
}



function logout(){
    localStorage.removeItem('userName');
    window.location.href = "./index.html";
}

document.getElementById('logoutLink').addEventListener('click', logout);


