import React from 'react';

import { withStore } from '../Store';

const _Notifications = ({ state }) => {
  return (
    <div className="notifications">
      {state.notificationOnline && (
        <div
          className="notification notification-online"
          onClick={() => state.update({
            notificationOnline: !state.notificationOnline,
          })}
        >
          Internet connection was found.
          Offline mode is off.
        </div>
      )}
      {state.notificationOffline && (
        <div
          className="notification notification-offline"
          onClick={() => state.update({
            notificationOffline: !state.notificationOffline,
          })}
        >
          No internet connection found.
          App is running in offline mode.
        </div>
      )}
    </div>
  )
}

export const Notifications = withStore(_Notifications);
