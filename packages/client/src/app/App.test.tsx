import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app in document', () => {
  expect(render(<App />).container).toBeInTheDocument();
});