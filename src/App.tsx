import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import NotificationButtons from "./components/NotificationButtons";
import NotificationList from "./components/NotificationList";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<NotificationButtons />} />
          <Route path="/notifications" element={<NotificationList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
