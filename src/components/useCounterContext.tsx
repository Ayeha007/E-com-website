import { useContext } from 'react';
import { CounterContext } from './cartcontext/counterContext';

export const useCounterContext = () => {
  return useContext(CounterContext);
};
