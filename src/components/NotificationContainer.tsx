import React from 'react';
import { useAppContext } from '../context/AppContext';
import Notification from './Notification';

export default function NotificationContainer() {
  const { state, removeNotification } = useAppContext();
  
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {state.notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          isVisible={true}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}