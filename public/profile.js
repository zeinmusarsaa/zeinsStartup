window.onload = function() {
    const username = localStorage.getItem('userName');
  
    if (username) {
      document.getElementById('userName').innerText = `Welcome, ${username}!`;
    } else {
      window.location.href = "./index.html";
    }
  
    loadFavoriteRecipes();
  
    // Fetch and display user data
    fetchUserData(username)
      .then((userData) => {
        displayUserData(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  
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
  
      // Update the newsfeed directly
      updateNewsfeed(data);
      document.getElementById('recipeForm').reset(); // Clear the form
    });
  };
  
  function fetchUserData(username) {
    return new Promise((resolve, reject) => {
      fetch(`/api/user/${username}`)
        .then((response) => response.json())
        .then((userData) => {
          resolve(userData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  function displayUserData(userData) {
    const emailEl = document.getElementById('email');
    emailEl.textContent = userData.email;
    // Display other user data properties as needed
  }
  
  function loadFavoriteRecipes() {
    let favoriteRecipesSection = document.querySelector('section.favorite-recipes');
  
    // Load and display favorite recipes data
    fetchFavoriteRecipes()
      .then((favoriteRecipes) => {
        favoriteRecipes.forEach((recipe) => {
          let recipeDiv = document.createElement('div');
          let recipeH3 = document.createElement('h3');
          let recipeP = document.createElement('p');
  
          recipeH3.textContent = recipe.recipeName;
          recipeP.textContent = `Ingredients: ${recipe.ingredients} - Instructions: ${recipe.instructions}`;
  
          recipeDiv.appendChild(recipeH3);
          recipeDiv.appendChild(recipeP);
  
          favoriteRecipesSection.appendChild(recipeDiv);
        });
      })
      .catch((error) => {
        console.error('Error fetching favorite recipes:', error);
      });
  }
  
  function fetchFavoriteRecipes() {
    return new Promise((resolve, reject) => {
      fetch(`/api/favorite-recipes/${username}`)
        .then((response) => response.json())
        .then((favoriteRecipes) => {
          resolve(favoriteRecipes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  function updateNewsfeed(data) {
    let newsfeedContainer = document.getElementById('newsfeedContainer');
    let newsDiv = document.createElement('div');
    let star = document.createElement('span');
  
    star.classList.add('empty-star');
    star.textContent = '☆';
  
    let message = `New Recipe Posted by ${data.userName}: ${data.recipeName} - Ingredients: ${data.ingredients} - Instructions: ${data.instructions}`;
  
    star.addEventListener('click', function() {
      if (this.classList.contains('filled-star')) {
        removeRecipeFromFavorites(data);
        this.textContent = '☆';
        this.classList.remove('filled-star');
        this.classList.add('empty-star');
      } else {
        addRecipeToFavorites(data);
        this.textContent = '★';
        this.classList.remove('empty-star');
        this.classList.add('filled-star');
      }
    });
  
    newsDiv.appendChild(star);
    newsDiv.appendChild(document.createTextNode(message));
    newsfeedContainer.prepend(newsDiv);
  }
  
  function removeRecipeFromFavorites(data) {
    let favoriteRecipesSection = document.querySelector('section.favorite-recipes');
    let recipeDivs = favoriteRecipesSection.querySelectorAll('div');
  
    recipeDivs.forEach((div) => {
      if (div.dataset.recipeName === data.recipeName) {
        favoriteRecipesSection.removeChild(div);
      }
    });
  }
  
  function logout() {
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
  
















