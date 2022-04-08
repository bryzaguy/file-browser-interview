import { render } from '@testing-library/react';
import App from './App';
import api from './api/mock';

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*(Use createRoot instead|not wrapped in act)/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  }
});

afterAll(() => {
  console.error = originalError;
});

test('renders app', (done) => {
  const app = render(<App api={api} />);
  setTimeout(() => {
    expect(app).toMatchSnapshot();
    done();
  })
});
