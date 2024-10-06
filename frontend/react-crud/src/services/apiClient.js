import http from './http-common';

const apiClient = class {
    getAll() {
      return http.get("/publications");
    }
  
    getById(id) {
      return http.get(`/publications/${id}`);
    }
  
    create(data) {
      return http.post("/create", data, {
        headers: {"Content-Type": "multipart/form-data"}
      });
    }
  
    delete(id) {
      return http.post(`/delete/${id}`);
    }

    getOzon(track) {
      return http.get(`/ozon/${track}`);
    }
  }
  
export default apiClient;