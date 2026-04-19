import { Routes, Route } from 'react-router-dom';
import UserHeader from '../features/user/UserHeader.jsx';
import Transfer from '../features/user/Transfer.jsx';
import AddBalance from '../features/user/AddBalance.jsx';
import Footer from '../components/Footer.jsx';
import UserDashboard from '../features/user/UserDashboard.jsx';
import UserProfile from '../features/user/UserProfile.jsx';
import UserTransaction from '../features/user/UserTransaction.jsx';
import Custom404 from './Custom404.jsx';

function UserPage() {
  return (
    <>
      <UserHeader />

      <main>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/transactions" element={<UserTransaction />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/add" element={<AddBalance />} />
          <Route path="*" element={<Custom404 />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default UserPage;
