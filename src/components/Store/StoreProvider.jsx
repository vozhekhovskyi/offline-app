import React from 'react';

import { Store } from './store';
import { PAGES } from '../../constants';

export class StoreProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      isOffline: false,
      notificationOnline: false,
      notificationOffline: false,
      page: PAGES.MAIN,
      // handlers
      update: this.updateStore,
    };
  }

  updateStore = state => this.setState(state);

  render() {
    return (
      <Store.Provider value={this.state}>
        {this.props.children}
      </Store.Provider>
    );
  }
}
