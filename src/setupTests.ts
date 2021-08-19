// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Setup to resolve TypeError: env.window.matchMedia is not a function
let mock = () => {}
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: any) => { return {
    matches: false,
    media: query,
    onchange: null,
    addListener: mock, // deprecated         
    removeListener: mock, // deprecated
    addEventListener: mock,
    removeEventListener: mock,
    dispatchEvent: mock,
  }}
});


