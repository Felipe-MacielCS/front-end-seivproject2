import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/api/courses");
  },
  get(courseNumber) {
    return apiClient.get(`/api/courses/${courseNumber}`);
  },
  create(data) {
    return apiClient.post("/api/courses", data);
  },
  update(courseNumber, data) {
    return apiClient.put(`/api/courses/${courseNumber}`, data);
  },
  delete(courseNumber) {
    return apiClient.delete(`/api/courses/${courseNumber}`);
  },
  deleteAll() {
    return apiClient.delete(`/api/courses`);
  },
  findByDepartment(dept) {
    return apiClient.get(`/api/courses/department/${dept}`);
  },
  findByLevel(level) {
    return apiClient.get(`/api/courses/level/${level}`);
  },
  findByCreditHours(hours) {
    return apiClient.get(`/api/courses/hours/${hours}`);
  }
};