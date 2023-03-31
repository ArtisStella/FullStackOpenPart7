import React from "react";

import { useNotificationValue } from "./NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  if (notification.content) {
    if ( notification.type === "Error" ) {
      return <div className="mt-2 alert alert-danger">{notification.content}</div>;
    } else {
      return <div className="mt-2 alert alert-success">{notification.content}</div>;
    }
  }
};

export default Notification;
