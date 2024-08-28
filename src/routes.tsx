import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddNewAd from "./pages/AddNewAd/AddNewAd";
import AdDetail from "./pages/AdDetail/AdDetail";
import AdEdit from "./pages/AdEdit/AdEdit";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/ad-new", element: <AddNewAd /> },
  { path: "/ad-detail/:id", element: <AdDetail /> },
  { path: "/ad-edit/:id", element: <AdEdit /> },
];

export default routes;
