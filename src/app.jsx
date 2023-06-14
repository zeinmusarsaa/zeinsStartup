import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Profile } from './profile/profile'
import { RecipeNavigator } from './recipenav/recipenav';
import { AuthState } from './login/authState';
import Login from './login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);


  return (
    <BrowserRouter>
    <div>
      <header>
        <nav>
          <div>
            Middle Eastern Recipes<sup>&reg;</sup>
          </div>
          <menu>
            <li>
              <NavLink className='nav-link' to=''>
                Logout
              </NavLink>
            </li>
            {authState === AuthState.Authenticated && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='profile'>
                  Profile
                </NavLink>
              </li>
            )}
            <li className='nav-item'>
              <NavLink className='nav-link' to='recipeNav'>
                Recipe Navigator
              </NavLink>
            </li>
          </menu>
        </nav>
      </header>

      <Routes>
        <Route
          path='/'
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
          exact
        />
        <Route path='/profile' element={<Profile userName={userName} />} />
        <Route path='/recipeNav' element={<RecipeNavigator />} />
        <Route path='*' element={<NotFound />} />
      </Routes>


    </div>
  </BrowserRouter>
  );
};


function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}

export default App;
