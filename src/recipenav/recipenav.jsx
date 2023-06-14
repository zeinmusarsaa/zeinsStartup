import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const RecipeNavigator = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [chatText, setChatText] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socketRef.current = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socketRef.current.onopen = (event) => {
      appendMsg('system', 'websocket', 'connected');
    };

    socketRef.current.onmessage = async (event) => {
      const text = await event.data.text();
      const chat = JSON.parse(text);
      appendMsg('friend', chat.name, chat.msg);
    };

    socketRef.current.onclose = (event) => {
      appendMsg('system', 'websocket', 'disconnected');
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const appendMsg = (cls, from, msg) => {
    setChatText(prevChatText => [
      ...prevChatText,
      { cls, from, msg }
    ]);
  };

  const sendMessage = () => {
    if (!!message) {
      appendMsg('me', 'me', message);
      socketRef.current.send(JSON.stringify({ name, msg: message }));
      setMessage('');
    }
  };

  return (
    <div>
      <main>
        <div className="name">
          <fieldset id="name-controls">
            <legend>Search</legend>
            <input id="my-name" type="text" onChange={(e) => setName(e.target.value)} />
          </fieldset>
        </div>

        <fieldset id="chat-controls" disabled={!name}>
          <legend>Chat</legend>
          <input id="new-msg" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </fieldset>
        <div id="chat-text">
          {chatText.map((chat, index) => (
            <div key={index}><span className={chat.cls}>{chat.from}</span>: {chat.msg}</div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RecipeNavigator;








// // Adjust the webSocket protocol to what is being used for HTTP
// const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
// const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// // Display that we have opened the webSocket
// socket.onopen = (event) => {
//   appendMsg('system', 'websocket', 'connected');
// };

// // Display messages we receive from our friends
// socket.onmessage = async (event) => {
//   const text = await event.data.text();
//   const chat = JSON.parse(text);
//   appendMsg('friend', chat.name, chat.msg);
// };

// // If the webSocket is closed then disable the interface
// socket.onclose = (event) => {
//   appendMsg('system', 'websocket', 'disconnected');
//   document.querySelector('#name-controls').disabled = true;
//   document.querySelector('#chat-controls').disabled = true;
// };

// // Send a message over the webSocket
// function sendMessage() {
//   const msgEl = document.querySelector('#new-msg');
//   const msg = msgEl.value;
//   if (!!msg) {
//     appendMsg('me', 'me', msg);
//     const name = document.querySelector('#my-name').value;
//     socket.send(`{"name":"${name}", "msg":"${msg}"}`);
//     msgEl.value = '';
//   }
// }

// // Create one long list of messages
// function appendMsg(cls, from, msg) {
//   const chatText = document.querySelector('#chat-text');
//   chatText.innerHTML =
//     `<div><span class="${cls}">${from}</span>: ${msg}</div>` +
//     chatText.innerHTML;
// }

// // Send message on enter keystroke
// const input = document.querySelector('#new-msg');
// input.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     sendMessage();
//   }
// });

// // Disable chat if no name provided
// const chatControls = document.querySelector('#chat-controls');
// const myName = document.querySelector('#my-name');
// myName.addEventListener('keyup', (e) => {
//   chatControls.disabled = myName.value === '';
// });

// function displayQuote(data) {
//     fetch('https://api.quotable.io/random')
//       .then((response) => response.json())
//       .then((data) => {
//         const containerEl = document.querySelector('#quote');
  
//         const quoteEl = document.createElement('p');
//         quoteEl.classList.add('quote');
//         const authorEl = document.createElement('p');
//         authorEl.classList.add('author');
  
//         quoteEl.textContent = data.content;
//         authorEl.textContent = data.author;
  
//         containerEl.appendChild(quoteEl);
//         containerEl.appendChild(authorEl);
//       });
//   }
//   displayQuote();  
