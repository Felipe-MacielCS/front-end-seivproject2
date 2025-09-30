import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/courses");
  },
  get(courseNumber) {
    return Client.get(`/courses/${courseNumber}`);
  },
  create(data) {
    return apiClient.post("/courses", data);
  },
  update(courseNumber, data) {
    return apiClient.put(`/courses/${courseNumber}`, data);
  },
  delete(courseNumber) {
    return apiClient.delete(`/courses/${courseNumber}`);
  },
  deleteAll() {
    return apiClient.delete(`/courses`);
  },
  findByDepartment(dept) {
    return apiClient.get(`/courses/department/${dept}`);
  },
  findByLevel(level) {
    return apiClient.get(`/courses/level/${level}`);
  },
  findByCreditHours(hours) {
    return apiClient.get(`/courses/hours/${hours}`);
  }
};