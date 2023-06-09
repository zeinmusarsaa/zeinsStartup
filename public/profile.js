async function callJava() {
  const recipeName = document.getElementById('recipe-name').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;
  const username = localStorage.getItem('userName');

  const response = await fetch("/api/recipes", {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      'userName': username,
      'recipeName': recipeName,
      'ingredients': ingredients,
      'instructions': instructions
    })
  });

  if (response.ok) {
    console.log('Recipe created successfully.');
  } else {
    throw new Error('Failed to create recipe.');
  }
}



async function deletePost(postId) {
  const response = await fetch(`/api/recipes/${postId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    console.log('Recipe deleted successfully.');
  } else {
    throw new Error('Failed to delete recipe.');
  }
}

window.onload = function () {
  const username = localStorage.getItem('userName');

  if (!username) {
    window.location.href = "./index.html";
    return;
  }

  document.getElementById('userName').innerText = `Welcome, ${username}!`;
  loadFavoriteRecipes();
  fetchUserData(username)
    .then(displayUserData)
    .catch(error => console.error('Error fetching user data:', error));

  document.getElementById('recipeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    const data = {
      userName: username,
      recipeName: recipeName,
      ingredients: ingredients,
      instructions: instructions
    };

    updateNewsfeed(data);
    document.getElementById('recipeForm').reset();
  });
  

  fetch('/api/recipes')
    .then(response => response.json())
    .then(recipes => {
      recipes.forEach(recipe => {
        const data = {
          id: recipe._id,
          userName: recipe.userName,
          recipeName: recipe.recipeName,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          likeCount: recipe.likeCount || 0
        };
        updateNewsfeed(data);
      });
    })
    .catch(error => console.error('Error fetching recipes:', error));
};

function fetchUserData(username) {
  return fetch(`/api/user/${username}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch user data.');
      }
    });
}

function displayUserData(userData) {
  const emailEl = document.getElementById('email');
  emailEl.textContent = userData.email;
  // Display other user data properties as needed
}

function loadFavoriteRecipes() {
  const favoriteRecipesSection = document.querySelector('section.favorite-recipes');

  fetchFavoriteRecipes()
    .then(favoriteRecipes => {
      favoriteRecipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        const recipeH3 = document.createElement('h3');
        const recipeP = document.createElement('p');

        recipeH3.textContent = recipe.recipeName;
        recipeP.textContent = `Ingredients: ${recipe.ingredients} - Instructions: ${recipe.instructions}`;

        recipeDiv.appendChild(recipeH3);
        recipeDiv.appendChild(recipeP);

        favoriteRecipesSection.appendChild(recipeDiv);
      });
    })
    .catch(error => console.error('Error fetching favorite recipes:', error));
}

function fetchFavoriteRecipes() {
  return fetch(`/api/favorite-recipes/zeinmus`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch favorite recipes.');
      }
    });
}

function updateNewsfeed(data) {
  const newsfeedContainer = document.getElementById('newsfeedContainer');
  const newsDiv = document.createElement('div');
  newsDiv.classList.add("post");
  newsDiv.dataset.postId = data.id;

  // Post Header
  const postHeader = document.createElement('div');
  postHeader.classList.add("post-header");
  const author = document.createTextNode(`New Recipe Posted by ${data.userName}`);
  postHeader.appendChild(author);

  // Post Body
  const postBody = document.createElement('div');
  postBody.classList.add("post-body");
  const recipeName = document.createElement('h3');
  recipeName.textContent = data.recipeName;
  const ingredients = document.createElement('p');
  ingredients.textContent = `Ingredients: ${data.ingredients}`;
  const instructions = document.createElement('p');
  instructions.textContent = `Instructions: ${data.instructions}`;

  postBody.appendChild(recipeName);
  postBody.appendChild(ingredients);
  postBody.appendChild(instructions);

  // Post Interaction
  const interactionDiv = document.createElement('div');
  interactionDiv.classList.add("interaction-div");

  const likeButton = document.createElement('button');
  likeButton.textContent = "Like";
  likeButton.classList.add("likeButton");
  likeButton.addEventListener('click', () => handleLike(data.id, likeCount));

  const commentButton = document.createElement('button');
  commentButton.textContent = "Comment";
  commentButton.classList.add("commentButton");
  commentButton.addEventListener('click', () => handleComment(data.id, commentList));

  const commentInput = document.createElement('input');
  commentInput.placeholder = "Comment";
  commentInput.classList.add("commentInput");

  interactionDiv.appendChild(likeButton);
  interactionDiv.appendChild(commentButton);
  interactionDiv.appendChild(commentInput);
  postBody.appendChild(interactionDiv);

  // Post Footer
  const postFooter = document.createElement('div');
  postFooter.classList.add("post-footer");
  const likeCount = document.createElement('span');
  likeCount.classList.add("like-count");
  likeCount.textContent = getLikeCount(data.id);
  const commentCount = document.createElement('span');
  commentCount.classList.add("comment-count");
  commentCount.textContent = getCommentCount(data.id); // Retrieve the stored comment count

  postFooter.appendChild(likeCount);
  postFooter.appendChild(document.createTextNode(" Likes "));
  postFooter.appendChild(commentCount);
  postFooter.appendChild(document.createTextNode(" Comments"));

  const commentList = document.createElement('ul');
  commentList.classList.add('comment-list');

  // Retrieve and display stored comments
  const storedComments = getStoredComments(data.id);
  storedComments.forEach(comment => {
    const commentItem = document.createElement('li');
    commentItem.textContent = comment;
    commentList.appendChild(commentItem);
  });

  newsDiv.appendChild(postHeader);
  newsDiv.appendChild(postBody);
  newsDiv.appendChild(postFooter);
  newsDiv.appendChild(commentList);

  newsfeedContainer.prepend(newsDiv);
}


function getLikeCount(postId) {
  const likeCount = localStorage.getItem(`likeCount_${postId}`);
  return likeCount ? parseInt(likeCount) : 0;
}

function setLikeCount(postId, count) {
  localStorage.setItem(`likeCount_${postId}`, count);
}

function handleLike(postId, likeCountElement) {
  const currentLikeCount = getLikeCount(postId);
  const updatedLikeCount = currentLikeCount + 1;
  setLikeCount(postId, updatedLikeCount);
  likeCountElement.textContent = updatedLikeCount;

  // Send a websocket message indicating a like
  const message = {
    postId: postId,
    action: 'like',
    count: updatedLikeCount
  };
  sendWebSocketMessage(message);
}

function getCommentCount(postId) {
  const commentCount = localStorage.getItem(`commentCount_${postId}`);
  return commentCount ? parseInt(commentCount) : 0;
}

function setCommentCount(postId, count) {
  localStorage.setItem(`commentCount_${postId}`, count);
}

function getStoredComments(postId) {
  const storedComments = localStorage.getItem(`comments_${postId}`);
  return storedComments ? JSON.parse(storedComments) : [];
}

function setStoredComments(postId, comments) {
  localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
}



function handleComment(postId, commentList) {
  console.log("Post ID: " + postId);
  const commentInput = document.querySelector(`div[data-post-id="${postId}"] .commentInput`);
  const commentText = commentInput.value.trim();
  commentInput.value = '';

  if (commentText.length === 0) {
 
    return;
  }

  const commentItem = document.createElement('li');
  commentItem.textContent = commentText;
  commentList.appendChild(commentItem);


  // Update the stored comments
  const storedComments = getStoredComments(postId);
  storedComments.push(commentText);
  setStoredComments(postId, storedComments);

  // Update the comment count
  const commentCountElement = document.querySelector(`div[data-post-id="${postId}"] .comment-count`);
  const currentCommentCount = parseInt(commentCountElement.textContent);
  const newCommentCount = currentCommentCount + 1;
  commentCountElement.textContent = newCommentCount;
  setCommentCount(postId, newCommentCount);

  // Send a websocket message indicating a new comment
  const message = {
    postId: postId,
    action: 'comment',
    comment: commentText,
    commentCount: newCommentCount
  };
  sendWebSocketMessage(message);
}



function sendWebSocketMessage(message) {
  const socket = new WebSocket('ws://localhost:8080/ws');
  socket.addEventListener('open', () => {
    socket.send(JSON.stringify(message));
    socket.close();
  });
}

window.addEventListener('load', () => {
  const likeCountElements = document.getElementsByClassName('like-count');
  Array.from(likeCountElements).forEach(likeCountElement => {
    const postId = likeCountElement.parentNode.parentNode.dataset.postId;
    const likeCount = getLikeCount(postId);
    likeCountElement.textContent = likeCount;
  });
});

function logout() {
  localStorage.removeItem('userName');
  window.location.href = "./index.html";
}

function addRecipeToFavorites(data) {
  const favoriteRecipesSection = document.querySelector('section.favorite-recipes');
  const recipeDiv = document.createElement('div');
  const recipeH3 = document.createElement('h3');
  const recipeP = document.createElement('p');

  recipeH3.textContent = data.recipeName;
  recipeP.textContent = `Ingredients: ${data.ingredients} - Instructions: ${data.instructions}`;

  recipeDiv.appendChild(recipeH3);
  recipeDiv.appendChild(recipeP);
  favoriteRecipesSection.appendChild(recipeDiv);
}

document.getElementById('logoutLink').addEventListener('click', logout);

function configureWebSocket() {
  const socket = new WebSocket('ws://localhost:8080/ws');

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.action === 'like') {
      const postId = message.postId;

      const postElement = document.querySelector(`[data-post-id="${postId}"]`);
      if (postElement) {
        const likeCountElement = postElement.querySelector('.like-count');
        const likeCount = parseInt(likeCountElement.textContent);
        likeCountElement.textContent = likeCount + 1;
      }
    } else if (message.action === 'comment') {
      const postId = message.postId;

      const postElement = document.querySelector(`[data-post-id="${postId}"]`);
      if (postElement) {
        const commentCountElement = postElement.querySelector('.comment-count');
        const commentCount = parseInt(commentCountElement.textContent);
        commentCountElement.textContent = commentCount + 1;
      }
    }
  };
}

// Call the function
configureWebSocket();



  
















