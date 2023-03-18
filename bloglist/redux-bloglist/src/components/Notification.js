import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  // <p className="mt-2 alert alert-danger">{errorMessage}</p>
  return notification ? <div className="mt-2 alert alert-success">{notification}</div> : null;
};

export default Notification;
