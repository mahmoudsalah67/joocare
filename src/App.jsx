import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// استيراد الكومبوننتس العامة والأساسية
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
import Faq from "./component/faq/Faq.jsx";

// استيراد كومبوننتس الـ Authentication والـ Setup
import EmailVerificationModal from "./component/campany/forcandidate/EmailVerification/EmailVerification.jsx";
import Details1 from "./component/campany/AccountSetup/details-1/Details1.jsx";
import Details2 from "./component/campany/AccountSetup/Details2.jsx";
import Details3 from "./component/campany/AccountSetup/Details3.jsx";
import ForgotPassword from "./component/login/forgetpassored/ForgotPassword.jsx";
import ResetPassword from "./component/login/ResetPassword/ResetPassword.jsx";
import VerifyOtp from "./component/login/VerifyOtp/VerifyOtp.jsx";
import Login2 from "./component/campany/login2/Login2.jsx";

// استيراد كومبوننتس لوحة تحكم الشركات (Company Dashboard)
import Dashboardlayout from "./component/layout/DashboardLayout.jsx";
import Companyprofile from "./component/campany/companyprofile/Companyprofile.jsx";
import Dashboard from "./component/campany/dashboard/Dashboard.jsx";
import JobManagement from "./component/campany/JobManagement/JobManagement.jsx";
import Accountsettings from "./component/campany/Account settings/Accountsettings.jsx";
import Basicinfo from "./component/campany/Account settings/basicinfo/Basicinfo.jsx";
import Businessverification from "./component/campany/Account settings/business-verification/Businessverification.jsx";
import Changepassword from "./component/campany/Account settings/Change password/Changepassword.jsx";
import Postjob from "./component/campany/postjob/Postjob.jsx";
import JobDescriptionRequirements from "./component/campany/postjob/JobDescription&Requirements/JobDescriptionRequirements.jsx";
import JobPreview from "./component/campany/postjob/Job Preview/JobPreview.jsx";
import Veiwdetails from "./component/campany/JobManagement/veiwdetails/Veiwdetails.jsx";
import ViewCandidates from "./component/campany/JobManagement/View Candidates/ViewCandidates.jsx";

// استيراد كومبوننتس حسابات المستخدمين (User Dashboard)
import Profile from "./component/user/myprofile/Profile.jsx";
import Applications from "./component/user/applictions/Applictions.jsx"; 
import ProfessionalCredentials from "./component/user/Professional Credentials/ProfessionalCredentials.jsx";
import Certificates from "./component/user/Professional Credentials/Certificates.jsx";
import Licenses from "./component/user/Professional Credentials/Licenses.jsx";
import Settings from "./component/user/settings/Settings.jsx";
import SavedJobs from "./component/user/SavedJobs/SavedJobs.jsx";

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
      { path: "login2", element: <Login2 /> },
      { path: "joinnow", element: <JoinNow /> },
      { path: "foremployer", element: <Foremployer /> },
      { path: "forcandidate", element: <ForCandidate /> },
      { path: "EmailVerification", element: <EmailVerificationModal /> },
      { path: "VerifyOtp", element: <VerifyOtp /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      
      // مسارات لوحة تحكم المستخدم (User Panel Routes)
      { path: "profile", element: <Profile /> },
      { path: "applications", element: <Applications /> },  
      { path: "ProfessionalCredentials", element: <ProfessionalCredentials /> },  
      { path: "ProfessionalCredentials/Certificates", element: <Certificates /> },  
      { path: "ProfessionalCredentials/Licenses", element: <Licenses /> },  
      { path: "settings", element: <Settings /> },  
      { path: "SavedJobs", element: <SavedJobs /> },  
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
      { path: "postjob", element: <Postjob /> },
      { path: "JobDescriptionRequirements/:id", element: <JobDescriptionRequirements /> },
      { path: "JobPreview/:id", element: <JobPreview /> },
      { path: "jobManagement", element: <JobManagement /> },
      { path: "veiwdetails/:id", element: <Veiwdetails /> },
      { path: "ViewCandidates/:id", element: <ViewCandidates /> },
      {
        path: "Accountsettings",
        element: <Accountsettings />,
        children: [
          {
            index: true,
            element: <Navigate to="basicinfo" replace />,
          },
          {
            path: "basicinfo",
            element: <Basicinfo />,
          },
          {
            path: "verification",
            element: <Businessverification />,
          },
          {
            path: "Changepassword",
            element: <Changepassword />,
          },
        ],
      }
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