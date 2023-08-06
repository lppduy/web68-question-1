import React from 'react';
import { useLanguage } from './LanguageContext'; // Import Context bạn đã tạo

const Footer = () => {
  const { setLanguage } = useLanguage(); // Lấy setLanguage từ Context

  const changeLanguage = newLanguage => {
    setLanguage(newLanguage);
  };

  return (
    <div>
      <h3>Made by MindX 🔥</h3>
      <div>
        <span>Available on:</span>
        <span
          className="languague-picker"
          onClick={() => changeLanguage('vi')} // Đổi ngôn ngữ khi nhấp vào quốc kỳ
        >
          🇻🇳
        </span>
        <span
          className="languague-picker selected"
          onClick={() => changeLanguage('en')} // Đổi ngôn ngữ khi nhấp vào quốc kỳ
        >
          🇺🇸
        </span>
      </div>
    </div>
  );
};

export default Footer;
