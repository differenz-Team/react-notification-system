import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./NotificationList.css";

import { firestore } from "../firebaseConfig";

interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
}

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "notifications"),
      (snapshot) => {
        const notificationsData: Notification[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Notification[];
        setNotifications(notificationsData);
        setLoading(false);
      },
      (error) => {
        toast.error("Failed to load notifications.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const markAsRead = async (id: string) => {
    setMarkingAsRead(id);
    try {
      const notificationRef = doc(firestore, "notifications", id);
      await updateDoc(notificationRef, { read: true });
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark notification as read");
    } finally {
      setMarkingAsRead(null);
    }
  };

  return (
    <div className="notification-list">
      <h2>Notification List</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Message</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.message}</td>
                <td>{notification.type}</td>
                <td>{notification.read ? "Read" : "Unread"}</td>
                <td>
                  {notification.read ? (
                    "Already Read"
                  ) : (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      disabled={markingAsRead === notification.id}
                    >
                      {markingAsRead === notification.id
                        ? "Loading..."
                        : "View"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NotificationList;
