import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

// Icons from feathericons.com
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;


const Settings = () => {
  const [activeTab, setActiveTab] = useState('edit-profile');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  const renderContent = () => {
    // In a real app, you would have different components for each settings section.
    // For this example, we'll just show a placeholder.
    switch (activeTab) {
      case 'edit-profile':
        return <div><h2>Edit Profile</h2><p>Here you can edit your profile information.</p></div>;
      case 'change-password':
        return <div><h2>Change Password</h2><p>Here you can change your password.</p></div>;
      case 'my-orders':
        return <div><h2>My Orders</h2><p>Here you can view your order history.</p></div>;
      case 'shipping-returns':
        return <div><h2>Shipping & Returns</h2><p>Here you can find information about our shipping and return policies.</p></div>;
      case 'contact-us':
        return <div><h2>Contact Us</h2><p>Here you can find our contact information.</p></div>;
      default:
        return <div><h2>Edit Profile</h2><p>Here you can edit your profile information.</p></div>;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-sidebar">
        <div className="settings-sidebar-header">
          <h3>Settings</h3>
        </div>
        <ul className="settings-nav">
          <li className={activeTab === 'edit-profile' ? 'active' : ''} onClick={() => handleTabClick('edit-profile')}>
            <UserIcon />
            <span>Edit Profile</span>
          </li>
          <li className={activeTab === 'change-password' ? 'active' : ''} onClick={() => handleTabClick('change-password')}>
            <LockIcon />
            <span>Change Password</span>
          </li>
          <li className={activeTab === 'my-orders' ? 'active' : ''} onClick={() => handleTabClick('my-orders')}>
            <PackageIcon />
            <span>My Orders</span>
          </li>
          <li className={activeTab === 'shipping-returns' ? 'active' : ''} onClick={() => handleTabClick('shipping-returns')}>
            <TruckIcon />
            <span>Shipping & Returns</span>
          </li>
          <li className={activeTab === 'contact-us' ? 'active' : ''} onClick={() => handleTabClick('contact-us')}>
            <MailIcon />
            <span>Contact Us</span>
          </li>
        </ul>
      </div>
      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
