import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/course/all')
      .then((response) => setCourses(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des cours', error));
  }, []);

  return (
    <div>
      <h2>Liste des Cours</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.titre} - {course.description} - {course.prix} $
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;