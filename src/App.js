import React from 'react';

import './App.css';
import { withStore } from './components/Store';
import { Notifications } from './components/Notifications';
import { PAGES } from './constants';
import { MainPage } from './pages/main';
import { MapPage } from './pages/map';

const pages = {
  [PAGES.MAIN]: MainPage,
  [PAGES.MAP]: MapPage,
};

class _App extends React.Component {
  componentDidMount() {
    this.checkAppServedFromCache();
    window.addEventListener('online', this.handleOnline, false);
    window.addEventListener('offline', this.handleOffline, false);
  }

  checkAppServedFromCache = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if (!navigator.onLine && registration.active && registration.active.state === 'activated') {
          this.handleOffline();
        }
      });
    }
  }

  handleOnline = () => {
    const isOnline = navigator.onLine;

    this.props.state.update({
      isOffline: !isOnline,
      notificationOnline: isOnline,
      notificationOffline: !isOnline,
    });
  }

  handleOffline = () => {
    const isOffline = !navigator.onLine;

    this.props.state.update({
      isOffline,
      notificationOffline: isOffline,
      notificationOnline: !isOffline,
    });
  }

  render() {
    const { page } = this.props.state;
    const PageComponent = pages[page];
    return (
      <div className="App-root">
        <PageComponent />
        <Notifications />
      </div>
    );
  }
}

export const App = withStore(_App);
