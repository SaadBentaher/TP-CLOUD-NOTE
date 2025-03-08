import axios from 'axios';

const AUTH_SERVICE_URL = 'http://localhost:5000';
const COURSE_SERVICE_URL = 'http://localhost:5001';
const STUDENT_SERVICE_URL = 'http://localhost:5002';
const TEACHER_SERVICE_URL = 'http://localhost:5003';

const apiClient = axios.create({
  baseURL: '', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  return apiClient.post(`${AUTH_SERVICE_URL}/auth/register`, userData);
};

export const loginUser = async (credentials) => {
  return apiClient.post(`${AUTH_SERVICE_URL}/auth/login`, credentials);
};

export const getProfile = async () => {
  return apiClient.get(`${AUTH_SERVICE_URL}/auth/profile`);
};


export const getAllCourses = async () => {
  return apiClient.get(`${COURSE_SERVICE_URL}/course/all`);
};

export const addCourse = async (courseData) => {
  return apiClient.post(`${COURSE_SERVICE_URL}/course/add`, courseData);
};

export const updateCourse = async (courseId, updatedData) => {
  return apiClient.put(`${COURSE_SERVICE_URL}/course/update/${courseId}`, updatedData);
};

export const deleteCourse = async (courseId) => {
  return apiClient.delete(`${COURSE_SERVICE_URL}/course/delete/${courseId}`);
};

export const searchCourses = async (keyword) => {
  return apiClient.get(`${COURSE_SERVICE_URL}/course/search`, { params: { keyword } });
};


export const getAllStudents = async () => {
  return apiClient.get(`${STUDENT_SERVICE_URL}/student/all`);
};

export const addStudent = async (studentData) => {
  return apiClient.post(`${STUDENT_SERVICE_URL}/student/add`, studentData);
};

export const enrollStudentToCourse = async (studentId, courseId) => {
  return apiClient.post(`${STUDENT_SERVICE_URL}/student/enroll/${studentId}/${courseId}`);
};

export const getEnrolledCourses = async (studentId) => {
  return apiClient.get(`${STUDENT_SERVICE_URL}/student/enrolledCourses/${studentId}`);
};

export const getAllTeachers = async () => {
  return apiClient.get(`${TEACHER_SERVICE_URL}/teacher/all`);
};

export const addTeacher = async (teacherData) => {
  return apiClient.post(`${TEACHER_SERVICE_URL}/teacher/add`, teacherData);
};

export const assignCourseToTeacher = async (teacherId, courseId) => {
  return apiClient.post(`${TEACHER_SERVICE_URL}/teacher/assign/${teacherId}/${courseId}`);
};

export const getEnrolledStudentsForCourse = async (courseId) => {
  return apiClient.get(`${TEACHER_SERVICE_URL}/teacher/enrolledStudents/${courseId}`);
};