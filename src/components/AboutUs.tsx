// AboutUs.tsx
import React from 'react';
import './styles.css'; // Підключіть той самий файл стилів

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <p>
        Welcome to our platform! We are dedicated to providing top-notch account
        management solutions for businesses and individuals. Our mission is to
        simplify financial tracking and ensure transparency in all transactions.
      </p>
      <p>
        With a passionate team and years of experience, we strive to deliver
        intuitive, user-friendly, and secure tools to help you manage your accounts
        effectively. Thank you for trusting us!
      </p>
      <p>
        For more information, contact us at{' '}
        <a href="mailto:support@accountmanager.com">support@accountmanager.com</a>.
      </p>
    </div>
  );
};

export default AboutUs;
