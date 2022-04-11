import data from './mockData.json';

const api = {
  useSearch() {
    return {
      get() {},
      data: data.results
    };
  },
  useStaticContent() { return {}; }
};

export default api;