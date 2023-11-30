import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
jest.mock('axios', () => ({
  create: () => axios,
  get: jest.fn(),
  post: jest.fn(),
  // add other methods if needed
}));

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});