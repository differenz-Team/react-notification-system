import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import { firestore } from "../firebaseConfig";

const Header = () => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const q = query(
      collection(firestore, "notifications"),
      where("read", "==", false)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="header">
      <h1>Notification App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Send Notification</Link>
          </li>
          <li>
            <Link to="/notifications">
              <div className="bell-icon-wrapper">
                <FontAwesomeIcon icon={faBell} className="bell-icon" />
                {unreadCount > 0 && (
                  <div className="notification-count">
                    <span>{unreadCount}</span>
                  </div>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
