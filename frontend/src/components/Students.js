import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5002/student/all')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des étudiants', error));
  }, []);

  return (
    <div>
      <h2>Liste des Étudiants</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.nom} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;