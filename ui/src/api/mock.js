import data from './mockData.json';

const api = {
  search({ prefix } = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      });
    });
  },
  staticContent() {}
};

export default api;