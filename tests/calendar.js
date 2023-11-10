
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let currentDate = new Date();

    function generateCalendar() {
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
    }

    function nextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    }

    function previousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    }

    generateCalendar();
