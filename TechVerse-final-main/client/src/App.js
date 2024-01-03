import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import TopBar from './components/topbar/TopBar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Contact from './pages/contact/Contact';
import Approval from './pages/approval/Approval'; // Adjust the path based on your project structure
import About from './pages/about/About';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);

  return (
    
        <Routes>
          <Route
            path="/"
            element={
              <main>
                 <TopBar />
                <Home />
              </main>
            }
          />
          <Route
            path="/login"
            element={
              <main>
                 <TopBar />
                {user ? <Navigate to="/" /> : <Login />}
              </main>
            }
          />
          <Route path="/about" element={<main> <TopBar /><About /></main>} />
          <Route path="/contact" element={<main> <TopBar /><Contact /></main>} />
          <Route
            path="/register"
            element={
              <main>
                 <TopBar />
                {user ? <Navigate to="/" /> : <Register />}
              </main>
            }
          />
          <Route
            path="/write"
            element={
              <main>
                 <TopBar />
                {user ? <Write /> : <Navigate to="/login" />}
              </main>
            }
          />
          <Route
            path="/settings"
            element={
              <main>
                 <TopBar />
                <Settings />
              </main>
            }
          />
          <Route
            path="/post/:postID"
            element={
              <main>
 <TopBar/>
                <Single />
               
              </main>
            }
          />
          <Route
            path="/approval"
            element={
              <main>
                 <TopBar />
                {user && user.username === 'Admin' ? <Approval /> : <Navigate to="/" />}
              </main>
            }
          />
        </Routes>
        
      
  );
}

export default App;