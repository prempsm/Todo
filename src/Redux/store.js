import { configureStore } from '@reduxjs/toolkit';
import contentSlice from './slices/contentSlice';

export const store = configureStore({
    reducer: {
      content: contentSlice,
    },
})