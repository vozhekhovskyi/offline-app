import React from 'react';

import { Store } from './store';

export const withStore = (WrapperComponent) => {
  function WithStore(props) {
    return (
      <Store.Consumer>
        {state => <WrapperComponent {...props} state={state}/>}
      </Store.Consumer>
    );
  }

  return WithStore;
}
