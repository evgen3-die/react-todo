import { createContext, useContext } from 'react';
import { observable } from 'mobx';

class Store {
  @observable message = 'message from store';
}

const StoreContext = createContext(new Store());
export default () => useContext(StoreContext);
