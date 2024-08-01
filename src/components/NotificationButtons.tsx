import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";

import "./NotificationButtons.css";

import { firestore } from "../firebaseConfig";

type NotificationType = "info" | "warning" | "error";

const NotificationButtons = () => {
  const [sendingType, setSendingType] = useState<NotificationType | null>(null);

  const sendNotification = async (type: NotificationType) => {
    setSendingType(type);

    const message = `This is a ${type} notification`;

    try {
      await addDoc(collection(firestore, "notifications"), {
        message,
        type,
        read: false,
        createdAt: serverTimestamp(),
      });
      toast.success("New notification");
    } catch (error) {
      toast.error("Failed to add notification");
    } finally {
      setSendingType(null);
    }
  };

  return (
    <div className="notification-buttons">
      <h2>Send Notification</h2>
      <button onClick={() => sendNotification("info")} disabled={!!sendingType}>
        {sendingType === "info" ? "Sending..." : "Info"}
      </button>
      <button
        onClick={() => sendNotification("warning")}
        disabled={!!sendingType}
      >
        {sendingType === "warning" ? "Sending..." : "Warning"}
      </button>
      <button
        onClick={() => sendNotification("error")}
        disabled={!!sendingType}
      >
        {sendingType === "error" ? "Sending..." : "Error"}
      </button>
    </div>
  );
};

export default NotificationButtons;
