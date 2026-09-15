import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = () => api.get("/todos");
export const getTodoById = (id) => api.get(`/todos/${id}`);
export const createTodo = (data) => api.post("/todos", data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const completeTodo = (id) => api.patch(`/todos/${id}/complete`);
export const uncompleteTodo = (id) => api.patch(`/todos/${id}/uncomplete`);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

export const getApiErrorMessage = (error) => {
  const data = error?.response?.data;
  if (data?.validationErrors) {
    return Object.values(data.validationErrors).join(", ");
  }

  

  return data?.message || error?.message || "Something went wrong";
};
