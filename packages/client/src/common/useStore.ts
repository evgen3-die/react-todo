import { createContext, useContext } from 'react';
import { Store } from '.';

const StoreContext = createContext(new Store());
export default () => useContext(StoreContext);
