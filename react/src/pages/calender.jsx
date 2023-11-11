import React, { useState, useEffect } from 'react';
import './calendar.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateCalendar = () => {
    const monthYearElement = document.getElementById('month-year');
    const calendarDaysElement = document.getElementById('calendar-days');

    monthYearElement.innerText = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(currentDate);

    calendarDaysElement.innerHTML = '';

    for (let day of weekdays) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.innerText = day;
      calendarDaysElement.appendChild(dayElement);
    }

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.innerText = i;

      if (i === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth()) {
        dayElement.classList.add('today');
      }

      calendarDaysElement.appendChild(dayElement);
    }
  };
  useEffect(() => {
    generateCalendar(); // Call generateCalendar when the component mounts
  }, []);

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      generateCalendar();
      return newDate;
    });
  };

  const previousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      generateCalendar();
      return newDate;
    });
  };

  return (
    <div>
      <div className="calender-body">
        <div className="calendar">
          <div className="header">
            <span id="prev" onClick={previousMonth}>&#9665;</span>&nbsp;
            <span id="month-year"></span>&nbsp;
            <span id="next" onClick={nextMonth}>&#9655;</span>
          </div>
          <div className="days" id="calendar-days"></div>
        </div>
      </div>
      <p>coming soon ..! <br />
        New Features :-
        task will show on calender and we can check  task  deadline  date
      </p>
    </div>

  );
};

export default Calendar;
