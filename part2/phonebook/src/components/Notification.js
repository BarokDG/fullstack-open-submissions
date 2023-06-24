const Notification = ({ notificationState }) => {
  if (!notificationState) {
    return null;
  }

  const { message, type } = notificationState;

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
