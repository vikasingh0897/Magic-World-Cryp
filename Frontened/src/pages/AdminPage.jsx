import { Routes, Route } from 'react-router-dom';
import AdminHeader from '../features/admin/AdminHeader.jsx';
import Footer from '../components/Footer.jsx';
import Custom404 from './Custom404.jsx';
import AdminDashboard from '../features/admin/AdminDashboard.jsx';
import CreditUser from '../features/admin/CreditUser.jsx';
import Transactions from '../features/admin/Transactions.jsx';
import ManageUsers from '../features/admin/ManageUsers.jsx';
import AdminProfile from '../features/admin/AdminProfile.jsx';
import UserDetail from '../features/admin/UserDetail.jsx';

function AdminPage() {
  return (
    <>
      <AdminHeader />
      <main>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/credit-user" element={<CreditUser />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-users/:userId" element={<UserDetail />} />
          <Route path="/profile" element={<AdminProfile />} />

          <Route path="*" element={<Custom404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default AdminPage;
