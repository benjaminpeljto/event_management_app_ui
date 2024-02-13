import { Confirmation, Event, Events, Home, Login, NotFound } from "./pages";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import OrderDetails from "./pages/OrderDetails";
import MyTickets from "./pages/MyTickets";
import { useAuthSelector } from "./store/hooks";
import DashboardPage from "./pages/DashboardPage";
import DashboardAdmin from "./pages/DashboardAdmin";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const auth = useAuthSelector((state) => state.auth);

  return (
    <div className='app'>
      <ToastContainer stacked />
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/event/:eventId' element={<Event />} />
          <Route
            path='/events/theater'
            element={<Events category='theater' />}
          />
          <Route path='/events/music' element={<Events category='music' />} />
          <Route path='/events/sport' element={<Events category='sport' />} />
          <Route path='/events/food' element={<Events category='food' />} />
          <Route
            path='/events/festival'
            element={<Events category='festival' />}
          />
          <Route
            path='/events/seminar'
            element={<Events category='seminar' />}
          />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/tickets/:eventId' element={<OrderDetails />} />
          <Route path='/mytickets' element={<MyTickets />} />
          <Route path='/checkout/success' element={<Confirmation />} />
          <Route
            path='/dashboard'
            element={<DashboardPage userType={auth.userType} />}
          />
          <Route
            path='/admin'
            element={<DashboardAdmin userType={auth.userType} />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
