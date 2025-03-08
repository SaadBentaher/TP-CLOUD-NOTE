import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5003/teacher/all')
      .then((response) => setTeachers(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des professeurs', error));
  }, []);

  return (
    <div>
      <h2>Liste des Professeurs</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.name} - {teacher.bio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teachers;