import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailsUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user'); // Modifier l'URL en fonction de votre API
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Informations de compte</h1>
          <p>Nom d'utilisateur : {user.username}</p>
          <p>Email : {user.email}</p>
          <p>Rôle : {user.role}</p>
        </div>
      ) : (
        <div>Aucune donnée utilisateur trouvée</div>
      )}
    </div>
  );
};

export default DetailsUser;
