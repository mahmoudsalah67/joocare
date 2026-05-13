import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/layout/Layout";
import Home from "./component/home/Home";
import About from "./component/about/About";
import Jobs from "./component/jobs/Jobs";
import Contact from "./component/contact/Contact";
import Login from "./component/login/Login.jsx";
import JoinNow from "./component/joinNow/JoinNow.jsx";
import Foremployer from "./component/foremployer/Foremployer.jsx";
import ForCandidate from "./component/campany/forcandidate/ForCandidate.jsx";
import Jobdetails from "./component/jobdetails/Jobdetails.jsx";
import Sharedcompanyprofile from "./component/shared-company-profile/Sharedcompanyprofile.jsx";
import { Toaster } from "react-hot-toast";
import Faq from "./component/faq/Faq.jsx";
import EmailVerificationModal from "./component/campany/forcandidate/EmailVerification/EmailVerification.jsx";
import Details1 from "./component/campany/AccountSetup/details-1/Details1.jsx";
import Details2 from "./component/campany/AccountSetup/Details2.jsx";
import Details3 from "./component/campany/AccountSetup/Details3.jsx";
import Companyprofile from "./component/campany/companyprofile/Companyprofile.jsx";
import Dashboardlayout from "./component/layout/DashboardLayout.jsx";
import Dashboard from "./component/campany/dashboard/Dashboard.jsx";
import JobManagement from "./component/campany/JobManagement/JobManagement.jsx";
import Accountsettings from "./component/campany/Account settings/Accountsettings.jsx";

const router = createBrowserRouter([
 
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "jobs", element: <Jobs /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <Faq /> },
      { path: "job/:id", element: <Jobdetails /> },
      { path: "shared-company-profile/:id", element: <Sharedcompanyprofile /> },
      { path: "login", element: <Login /> },
      { path: "joinnow", element: <JoinNow /> },
      { path: "foremployer", element: <Foremployer /> },
      { path: "forcandidate", element: <ForCandidate /> },
      { path: "EmailVerification", element: <EmailVerificationModal /> },
    ],
  },

 
  {
    path: "/",
    element: <Dashboardlayout />,
    children: [
      { path: "details", element: <Details1 /> },
      { path: "details2", element: <Details2 /> },
      { path: "details3", element: <Details3 /> },
      { path: "Companyprofile", element: <Companyprofile /> },
      { path: "Dashboard", element: <Dashboard /> },
      { path: "jobManagement", element: <JobManagement /> },
      { path: "Accountsettings", element: <Accountsettings /> },
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


                         