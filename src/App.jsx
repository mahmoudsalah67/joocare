import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/layout/Layout";
import Home from "./component/home/Home";
import About from "./component/about/About";
import Jobs from "./component/jobs/Jobs";
import Contact from "./component/contact/Contact";
import Login from "./component/login/Login.jsx";
import JoinNow from "./component/joinNow/JoinNow.jsx";
import Foremployer from "./component/foremployer/Foremployer.jsx";
import ForCandidate from "./component/forcandidate/ForCandidate.jsx";
import Jobdetails from "./component/jobdetails/Jobdetails.jsx";
import Sharedcompanyprofile from "./component/shared-company-profile/Sharedcompanyprofile.jsx";
import { Toaster } from "react-hot-toast";
import Faq from "./component/faq/Faq.jsx";




const router = createBrowserRouter([

  {
    path: "",
    element: <Layout />,
    
    children: [
      
       { path: "", element: <Home /> },
       { path: "about", element: <About /> },
      { path: "jobs", element: <Jobs /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <Faq/> },
      { path: "login", element: <Login /> },
      {path:'joinnow',element:<JoinNow/>},
      {path:'foremployer',element:<Foremployer/>},
      {path:'forcandidate',element:<ForCandidate/>},
      {path:'/job/:id',element:<Jobdetails/>},
      {path:'/shared-company-profile/:id',element:<Sharedcompanyprofile/>}
    ],
  },
]);

function App() {

return (
    <div>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </div>
  );
}
export default App;


                         