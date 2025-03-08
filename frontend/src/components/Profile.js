import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Veuillez vous connecter.</p>;

  return (
    <div>
      <h2>Profil</h2>
      <p>Nom : {user.name}</p>
      <p>Email : {user.email}</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
};

export default Profile;