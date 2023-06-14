import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export default  function Login({ userName, authState, onAuthChange }) {
  return (
    <main>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to the Middle Eastern Recipe Hub</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}


// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUserName = localStorage.getItem('userName');
//     if (storedUserName) {
//       setUserName(storedUserName);
//       getUser(storedUserName);
//     }
//   }, []);

//   const loginOrCreate = async (endpoint) => {
//     const response = await fetch(endpoint, {
//       method: 'post',
//       body: JSON.stringify({ email: userName, password: password }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });

//     if (response.ok) {
//       localStorage.setItem('userName', userName);
//       window.location.href = 'profile.html';
//     } else {
//       const body = await response.json();
//       alert(`⚠ Error: ${body.msg}`);
//     }
//   };

//   const getUser = async (email) => {
//     const response = await fetch(`/api/user/${email}`);
//     if (response.status === 200) {
//       setUser(await response.json());
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('userName');
//     fetch(`/api/auth/logout`, {
//       method: 'delete',
//     }).then(() => (window.location.href = '/'));
//   };

//   return (
//     <div>
//       <header>
//         <div><a href="#">Recipe Navigator</a></div>
//         <div><a href="#">Middle Eastern Markets</a></div>
//         <div><a href="#">Profile</a></div>
//         <div className="logout"><a href="#" onClick={logout}>Log Out</a></div>
//       </header>
//       <main>
//         <h1>Welcome to the Middle Eastern Recipe Hub</h1>
//         {user ? (
//           <div id="playControls">
//             <div id="userName">{userName}</div>
//             <button type="button" className="btn btn-primary" onClick={() => window.location.href = 'profile.html'}>Play</button>
//             <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
//           </div>
//         ) : (
//           <div id="loginControls">
//             <div className="input-group mb-3">
//               <span className="input-group-text">@</span>
//               <input className="form-control" type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com" />
//             </div>
//             <div className="input-group mb-3">
//               <span className="input-group-text">🔒</span>
//               <input className="form-control" type="password" id="userPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
//             </div>
//             <button type="button" className="btn btn-primary" onClick={() => loginOrCreate(`/api/auth/login`)}>Login</button>
//             <button type="button" className="btn btn-primary" onClick={() => loginOrCreate(`/api/auth/create`)}>Create</button>
//           </div>
//         )}
//       </main>
//       <footer><a href="https://github.com/zeinmusarsaa/zeinsStartup">GitHub</a></footer>
//     </div>
//   );
// };

// export default App;







// (async () => {

//   const userName = localStorage.getItem('userName');
//   if (userName) {
//     document.querySelector('#userName').textContent = userName;
//     setDisplay('loginControls', 'none');
//     setDisplay('playControls', 'block');
//   } else {
//     setDisplay('loginControls', 'block');
//     setDisplay('playControls', 'none');
//   }
// })();

// async function loginUser() {
//   loginOrCreate(`/api/auth/login`);
// }

// async function createUser() {
//   loginOrCreate(`/api/auth/create`);
// }

// async function loginOrCreate(endpoint) {
//   const userName = document.querySelector('#userName')?.value;
//   const password = document.querySelector('#userPassword')?.value;
//   const response = await fetch(endpoint, {
//     method: 'post',
//     body: JSON.stringify({ email: userName, password: password }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   });

//   if (response.ok) {
//     localStorage.setItem('userName', userName);
//     window.location.href = 'profile.html';
//   } else {
//     const body = await response.json();
//     const modalEl = document.querySelector('#msgModal');
//     modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
//     const msgModal = new bootstrap.Modal(modalEl, {});
//     msgModal.show();
//   }
// }

// function play() {
//   window.location.href = 'profile.html';
// }

// function logout() {
//   localStorage.removeItem('userName');
//   fetch(`/api/auth/logout`, {
//     method: 'delete',
//   }).then(() => (window.location.href = '/'));
// }

// async function getUser(email) {
//   // See if we have a user with the given email.
//   const response = await fetch(`/api/user/${email}`);
//   if (response.status === 200) {
//     return response.json();
//   }

//   return null;
// }

// function setDisplay(controlId, display) {
//   const playControlEl = document.querySelector(`#${controlId}`);
//   if (playControlEl) {
//     playControlEl.style.display = display;
//   }
// }





