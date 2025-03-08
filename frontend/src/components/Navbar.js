import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">Profil</Link>
            </li>
            <li>
              <Link to="/courses">Cours</Link>
            </li>
            <li>
              <Link to="/students">Étudiants</Link>
            </li>
            <li>
              <Link to="/teachers">Professeurs</Link>
            </li>
            <li>
              <button onClick={logout}>Déconnexion</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/register">Inscription</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;