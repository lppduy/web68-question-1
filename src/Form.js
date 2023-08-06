import React, { useState } from 'react';
import { useLanguage } from './LanguageContext'; // Import Context bạn tạo ra

const Form = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { language } = useLanguage(); // Sử dụng Context để lấy ngôn ngữ hiện tại

  const handleSubmit = e => {
    e.preventDefault();
    if (taskText.trim() !== '') {
      addTask(taskText, dueDate);
      setTaskText('');
      setDueDate('');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={language.translation.formPlaceholder} // Sử dụng ngôn ngữ từ Context
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <button type="submit">{language.translation.formButton}</button>{' '}
      {/* Sử dụng ngôn ngữ từ Context */}
    </form>
  );
};

export default Form;
