import { useCallback, useState } from "react";

function App() {
  const [status, setStatus] = useState(Notification.permission);
  const [isDelayedNotificationDisabled, setIsDelayedNotificationDisabled] =
    useState(false);
  const [timer, setTimer] = useState(0);

  const handleCreateDefaultNotification = useCallback(() => {
    if (Notification.permission !== "granted") {
      return alert("Permission not granted");
    }

    const notification = new Notification("Hello, world!");

    notification.onclick = () => {
      alert("Notification clicked");
    };
  }, []);

  const createDelayedNotification = useCallback(() => {
    if (Notification.permission !== "granted") {
      return alert("Permission not granted");
    }

    setIsDelayedNotificationDisabled(true);
    setTimer(3);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setIsDelayedNotificationDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      const notification = new Notification("Hello, world!");

      notification.onclick = () => {
        window.focus();

        alert("Notification clicked");
      };
    }, 3000);
  }, []);

  return (
    <>
      <div>
        <p>Notification permission: {status}</p>
      </div>

      <button
        onClick={() => {
          Notification.requestPermission().then((permission) => {
            setStatus(permission);
          });
        }}
        disabled={status === "granted"}>
        Request permission
      </button>

      <button onClick={handleCreateDefaultNotification}>
        Create notification
      </button>

      <button
        onClick={createDelayedNotification}
        disabled={isDelayedNotificationDisabled}>
        {isDelayedNotificationDisabled
          ? `Create delayed notification (${timer}s)`
          : "Create delayed notification (3s)"}
      </button>
    </>
  );
}

export default App;
