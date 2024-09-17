import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from ".";

export const createCourse = async (formData) => {
  try {
    const { data } = await $authHost.post("api/createCourse/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
    
  } catch (error) {
    console.log(error)
  }
};

export const createModuleApi = async (courseId, name) => {
  const { data } = await $authHost.post(
    `api/createCourse/courses/${courseId}/modules`,
    { name },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const createLessonApi = async (moduleId, name, content) => {
  const { data } = $authHost.post(
    `api/createCourse/modules/${moduleId}/lessons`,
    {
      name,
      content,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};


export const fetchCourses = async () => {
  try {
      const response = await $authHost.get('/api/createCourse/courses'); // Убедитесь, что путь совпадает с вашим роутером
      return response.data;
  } catch (error) {
      console.error("Ошибка при получении курсов", error);
      throw error;
  }
};


export const fetchCourseById = async (id) => {
  try {
      const response = await $authHost.get(`/api/createCourse/courses/${id}`);
      return response.data;
  } catch (error) {
      console.error("Ошибка при получении курса", error);
  } 
}