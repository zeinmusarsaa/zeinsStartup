// //remove this one and then change any calls to the database to the one in the server
// let database = {
//     users: [],
//     recipes: [
       
//     ],
// }

// let tabContainer = document.getElementById('tabContainer');
// let recipeContainer = document.getElementById('recipeContainer');

// let filter = '';

// database.recipes.forEach(recipe => {
//     if(!document.getElementById(`tab-${recipe.recipeName}`)){
//         let tab = document.createElement('div');
//         tab.id = `tab-${recipe.recipeName}`;
//         tab.textContent = recipe.recipeName;
//         tab.classList.add('tab');
//         tab.onclick = function() {
//             filter = recipe.recipeName;
//             displayRecipes();
//         };
//         tabContainer.appendChild(tab);
//     }
// });

// // Display the recipes
// function displayRecipes() {
//     // Clear the recipe container
//     recipeContainer.innerHTML = '';
  
//     // Filter and display the recipes
//     database.recipes.forEach(recipe => {
//         if (filter == '' || recipe.recipeName == filter) {
//             let recipeDiv = document.createElement('div');
//             let recipeH3 = document.createElement('h3');
//             let recipeP = document.createElement('p');

//             recipeH3.textContent = recipe.recipeName;
//             recipeP.textContent = `Ingredients: ${recipe.ingredients} - Instructions: ${recipe.instructions}`;

//             recipeDiv.appendChild(recipeH3);
//             recipeDiv.appendChild(recipeP);

//             recipeContainer.appendChild(recipeDiv);
//         }
//     });
// }

// // Call the displayRecipes function to display all recipes initially
// displayRecipes();


// window.onload = function() {
//     const recipeNames = Object.keys(database.recipes);
//     const tabContainer = document.getElementById('tabContainer'); 
//     recipeNames.forEach((recipeName) => {
//         let tab = document.createElement('div');
//         tab.textContent = recipeName;

//         tab.addEventListener('click', function() {
//             displayRecipes(recipeName);
//         });

//         tabContainer.appendChild(tab);
//     });
// }

// function displayRecipes(recipeName) {
//     const recipes = database.recipes[recipeName];
//     const recipeContainer = document.getElementById('recipeContainer'); 

//     recipeContainer.innerHTML = ''; // Clear the container

//     recipes.forEach((recipe) => {
//         let recipeDiv = document.createElement('div');
//         let recipeH3 = document.createElement('h3');
//         let recipeP = document.createElement('p');

//         recipeH3.textContent = recipe.recipeName;
//         recipeP.textContent = `Ingredients: ${recipe.ingredients} - Instructions: ${recipe.instructions}`;

//         recipeDiv.appendChild(recipeH3);
//         recipeDiv.appendChild(recipeP);
//         recipeContainer.appendChild(recipeDiv);
//     });
// }

function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');
  
        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;
  
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
  }
  displayQuote();  
