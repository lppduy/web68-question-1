import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext'; // Import Context bạn tạo ra

const TodoListHeader = ({
  tasks,
  showNotFinishedOnly,
  toggleShowNotFinishedOnly,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const undoneCount = tasks.filter(task => !task.done).length;

  const { language } = useLanguage(); // Sử dụng Context để lấy ngôn ngữ hiện tại

  return (
    <div className="header">
      <div>
        {language.translation.tasksLeft.replace('{count}', undoneCount)}{' '}
        <label>
          <input
            type="checkbox"
            checked={showNotFinishedOnly}
            onChange={toggleShowNotFinishedOnly}
          />
          {language.translation.notFinishedOnly}
        </label>
      </div>
    </div>
  );
};

export default TodoListHeader;
