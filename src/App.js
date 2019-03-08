import React from 'react';

import logo from './logo.svg';
import './App.css';

const Store = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      isOffline: false,
      isContentUpdate: false,
      notificationOnline: false,
      notificationOffline: false,
      updateStore: this.updateStore,
    };
  }

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

    this.setState({
      isOffline: !isOnline,
      notificationOnline: isOnline,
      notificationOffline: !isOnline,
    });
  }

  handleOffline = () => {
    const isOffline = !navigator.onLine;

    this.setState({
      isOffline,
      notificationOffline: isOffline,
      notificationOnline: !isOffline,
    });
  }

  updateStore = state => this.setState(state);

  render() {
    return (
      <Store.Provider value={this.state}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              ! Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
        <Notifications/>
      </Store.Provider>
    );
  }
}

const Notifications = () => {
  return (
    <Store.Consumer>
      {store => (
        <div className="notifications">
          {store.notificationOnline && (
            <div
              className="notification notification-online"
              onClick={() => store.updateStore({
                notificationOnline: !store.notificationOnline,
              })}
            >
              Internet connection was found.
              Offline mode is off.
            </div>
          )}
          {store.notificationOffline && (
            <div
              className="notification notification-offline"
              onClick={() => store.updateStore({
                notificationOffline: !store.notificationOffline,
              })}
            >
              No internet connection found.
              App is running in offline mode.
            </div>
          )}
        </div>
      )}
    </Store.Consumer>
  )
}


export default App;
