// src/redux/Providers.js
"use client"; // Important for Next.js 13+ to ensure it's used on the client side

import { Provider } from 'react-redux';
import store from './store';

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
