 import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../header/DashboardNavbar.jsx'; 

const DashboardLayout = () => {
 return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <DashboardNavbar />
       <main className="pt-[80px]"> 
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;