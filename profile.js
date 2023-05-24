let database = {
    users: [],
    recipes: [
       
    ],
}



window.onload = function() {
    const username = localStorage.getItem('userName');

    if (username) {
        document.getElementById('userName').innerText = `Welcome, ${username}!`;

    } else {
        window.location.href = "./index.html";
    }

    loadFavoriteRecipes();

  
    document.getElementById('recipeForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        let recipeName = document.getElementById('recipe-name').value;
        let ingredients = document.getElementById('ingredients').value;
        let instructions = document.getElementById('instructions').value;
        
        let data = {
            userName: username,
            recipeName: recipeName,
            ingredients: ingredients,
            instructions: instructions,

        };
        
    
        updateNewsfeed(data);  // Update the newsfeed directly
        document.getElementById('recipeForm').reset();  // Clear the form
    });
    
}

function addUser(name) {
    database.users.push(name);
}

//Favorite recipes section
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
//updating the newsfeed, with the most recent post showing above.

function updateNewsfeed(data) {
    let newsfeedContainer = document.getElementById('newsfeedContainer');
    let newsDiv = document.createElement('div');
    let star = document.createElement('span');

    star.classList.add('empty-star');
    star.textContent = '☆';

    let message = `New Recipe Posted by ${data.userName}: ${data.recipeName} - Ingredients: ${data.ingredients} - Instructions: ${data.instructions}`;

    // Attaching click event to star
    star.addEventListener('click', function() {

        if(this.classList.contains('filled-star')){
            removeRecipeFromFavorites(data.id);
            this.textContent = '☆';
            this.classList.remove('filled-star');
            this.classList.add('empty-star');
        }
        else {
            // It's not a favorite, so add it to favorites
            addRecipeToFavorites(data);
            // Change to a filled star
            this.textContent = '★';
            this.classList.remove('empty-star');
            this.classList.add('filled-star');
        }

    });

    newsDiv.appendChild(star);
    newsDiv.appendChild(document.createTextNode(message));
    newsfeedContainer.prepend(newsDiv);
}

function removeRecipeFromFavorites(id) {
    let favoriteRecipesSection = document.querySelector('section.favorite-recipes');
    let recipeDivs = favoriteRecipesSection.querySelectorAll('div');
    
    recipeDivs.forEach((div) => {
        // Assuming each div has a data-id attribute
        if (div.dataset.id === id) {
            favoriteRecipesSection.removeChild(div);
        }
    });
}


// Remember to change your WebSocket message handling code as well:
// ws.onmessage = event => {
//     let data = JSON.parse(event.data);  // Assuming server sends JSON data
//     updateNewsfeed(data);
// };



function logout(){
    localStorage.removeItem('userName');
    window.location.href = "./index.html";
}


function addRecipeToFavorites(data) {
    let favoriteRecipesSection = document.querySelector('section.favorite-recipes');
    let recipeDiv = document.createElement('div');
    let recipeH3 = document.createElement('h3');
    let recipeP = document.createElement('p');

    recipeH3.textContent = data.recipeName;
    recipeP.textContent = `Ingredients: ${data.ingredients} - Instructions: ${data.instructions}`;

    recipeDiv.appendChild(recipeH3);
    recipeDiv.appendChild(recipeP);
    favoriteRecipesSection.appendChild(recipeDiv);
}





document.getElementById('logoutLink').addEventListener('click', logout);


