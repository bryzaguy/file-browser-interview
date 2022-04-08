import data from './mockData.json';

export default function TestApi({ prefix } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.results.filter(name => !prefix || name.startsWith(prefix)));
    });
  });
}