import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

export function Profile() {
  const [username, setUsername] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const navigate = useNavigate();
  const socketRef = useRef();

  function sendWebSocketMessage(message) {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  }

  // function configureWebSocket() {
  //   socketRef.current = new WebSocket('ws://localhost:4000/ws');

  //   socketRef.current.onopen = () => {
  //     console.log('WebSocket connected');
  //   };

  //   socketRef.current.onclose = () => {
  //     console.log('WebSocket disconnected');
  //   };

    
  // }

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socketRef.current = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socketRef.current.onopen = (event) => {
      console.log('WebSocket connected');
    };

    socketRef.current.onmessage = (event) => {
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

    socketRef.current.onclose = (event) => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    const userNameFromStorage = localStorage.getItem('userName');
    if (userNameFromStorage) {
      setUsername(userNameFromStorage);
      fetchUserData(userNameFromStorage)
        .then(displayUserData)
        .catch((error) => console.error('Error fetching user data:', error));
      loadAllRecipes();
    } else {
      navigate('/');
    }
  }, [navigate]);

 

  async function handlePostRecipe(e) {
    e.preventDefault();
    console.log(username, recipeName, ingredients, instructions);

    try {
      const response = await fetch('/api/recipes', {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          userName: username,
          recipeName: recipeName,
          ingredients: ingredients,
          instructions: instructions,
        }),
      });

      if (response.ok) {
        console.log('Recipe created successfully.');
        const newRecipe = {
          id: Date.now().toString(),
          userName: username,
          recipeName: recipeName,
          ingredients: ingredients,
          instructions: instructions,
        };
        //prev values to
        setRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
        setRecipeName('');
        setIngredients('');
        setInstructions('');
      } else {
        throw new Error('Failed to create recipe.');
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  }

  async function loadAllRecipes() {
    try {
      const response = await fetch('/api/recipes');
      const recipes = await response.json();
      recipes.forEach((recipe) => {
        const data = {
          id: recipe._id,
          userName: recipe.userName,
          recipeName: recipe.recipeName,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          likeCount: recipe.likeCount || 0,
        };
        updateNewsfeed(data);
      });
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  async function fetchUserData(username) {
    return fetch(`/api/user/${username}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user data.');
        }
      });
  }

  function displayUserData(userData) {
    const email = userData.email;
    // Display other user data properties as needed

    return (
      <div>
        <p>Email: {email}</p>
        {/* Render other user data properties */}
      </div>
    );
  }

  function logout() {
    localStorage.removeItem('userName');
    navigate('/');
  }

  async function updateNewsfeed(data) {
    const newsfeedContainer = document.getElementById('newsfeedContainer');
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('post');
    newsDiv.dataset.postId = data.id;

    // Post Header
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    const author = document.createTextNode(`New Recipe Posted by ${data.userName}`);
    postHeader.appendChild(author);

    // Post Body
    const postBody = document.createElement('div');
    postBody.classList.add('post-body');
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
    interactionDiv.classList.add('interaction-div');

    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.classList.add('likeButton');
    likeButton.addEventListener('click', () => handleLike(data.id, likeCount));

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.classList.add('commentButton');
    commentButton.addEventListener('click', () => handleComment(data.id, commentList));

    const commentInput = document.createElement('input');
    commentInput.placeholder = 'Comment';
    commentInput.classList.add('commentInput');

    interactionDiv.appendChild(likeButton);
    interactionDiv.appendChild(commentButton);
    interactionDiv.appendChild(commentInput);
    postBody.appendChild(interactionDiv);

    // Post Footer
    const postFooter = document.createElement('div');
    postFooter.classList.add('post-footer');
    const likeCount = document.createElement('span');
    likeCount.classList.add('like-count');
    likeCount.textContent = getLikeCount(data.id);
    const commentCount = document.createElement('span');
    commentCount.classList.add('comment-count');
    commentCount.textContent = getCommentCount(data.id); // Retrieve the stored comment count

    postFooter.appendChild(likeCount);
    postFooter.appendChild(document.createTextNode(' Likes '));
    postFooter.appendChild(commentCount);
    postFooter.appendChild(document.createTextNode(' Comments'));

    const commentList = document.createElement('ul');
    commentList.classList.add('comment-list');

    // Retrieve and display stored comments
    const storedComments = getStoredComments(data.id);
    storedComments.forEach((comment) => {
      const commentItem = document.createElement('li');
      commentItem.textContent = `${comment.user} commented: ${comment.text}`;
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

  async function handleLike(postId, likeCountElement) {
    const currentLikeCount = getLikeCount(postId);
    const updatedLikeCount = currentLikeCount + 1;
    setLikeCount(postId, updatedLikeCount);
    likeCountElement.textContent = updatedLikeCount;

    // Send a websocket message indicating a like
    const message = {
      postId: postId,
      action: 'like',
      count: updatedLikeCount,
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

  async function handleComment(postId, commentList) {
    console.log('Post ID: ' + postId);
    const commentInput = document.querySelector(`div[data-post-id="${postId}"] .commentInput`);
    const commentText = commentInput.value.trim();
    commentInput.value = '';

    if (commentText.length === 0) {
      return;
    }

    const commentItem = document.createElement('li');
    const username = localStorage.getItem('userName');
    commentItem.textContent = `${username} commented: ${commentText}`;
    commentList.appendChild(commentItem);

    // Update the stored comments
    const storedComments = getStoredComments(postId);
    storedComments.push({ user: username, text: commentText });
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
      commentCount: newCommentCount,
    };
    sendWebSocketMessage(message);
  }



  // // Call the function
  configureWebSocket();

  return (
    <main>
      <div className="left-section">
        <h1>Welcome, {username}!</h1>
        <div id="user-messages"></div>
        <section className="post-section">
          <h2>Post a Recipe:</h2>
          <form id="recipeForm" onSubmit={handlePostRecipe}>
            <label htmlFor="recipe-name">Recipe Name:</label>
            <input
              type="text"
              id="recipe-name"
              name="recipe-name"
              placeholder="Enter the recipe name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <br />
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              id="ingredients"
              name="ingredients"
              placeholder="Enter the ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
            <br />
            <label htmlFor="instructions">Instructions:</label>
            <textarea
              id="instructions"
              name="instructions"
              placeholder="Enter the instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
            <br></br>
            <button className="button" id="postButton" type="submit">
              Post
            </button>
            <div>Refresh page to see post!</div>
          </form>
        </section>
      </div>

      <div className="right-section">
        <section className="newsfeed">
          <h2>Newsfeed</h2>
          <div id="newsfeedContainer">
            {recipes.map((recipe) => (
              <div className="post" key={recipe.id} data-post-id={recipe.id}>
                <div className="post-header">New Recipe Posted by {recipe.userName}</div>
                <div className="post-body">
                  <h3>{recipe.recipeName}</h3>
                  <p>Ingredients: {recipe.ingredients}</p>
                  <p>Instructions: {recipe.instructions}</p>
                </div>
                <div className="post-footer">
                  <button className="button likeButton" onClick={() => handleLike(recipe.id)}>
                    Like
                  </button>
                  <form onSubmit={(e) => handleComment(recipe.id, e)}>
                    <input className="commentInput" type="text" name="comment" placeholder="Add a comment..." />
                    <button type="submit">Comment</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
          <br />
        </section>
      </div>
    </main>
  );
}

export default Profile;
















  
















