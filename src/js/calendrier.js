const monthYearElement = document.querySelector('.month-year');
const calendarBody = document.querySelector('.calendar-body');
const prevMonthBtn = document.querySelector('.prev-month');
const nextMonthBtn = document.querySelector('.next-month');
const prevYearBtn = document.querySelector('.prev-year');
const nextYearBtn = document.querySelector('.next-year');

let currentDate = new Date();

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Set the current month and year in the header
    monthYearElement.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
    
    // Clear the previous calendar
    calendarBody.innerHTML = '';
    
    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Generate the days in the calendar
    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement('td'));
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }
        
        const cell = document.createElement('td');
        cell.textContent = day;
        
        // Highlight the current day
        const today = new Date();
        if (day === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            cell.classList.add('current-day');
        }
        
        row.appendChild(cell);
    }
    
    calendarBody.appendChild(row);
}

// Initial render
renderCalendar(currentDate);

// Navigation buttons
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

prevYearBtn.addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    renderCalendar(currentDate);
});

nextYearBtn.addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    renderCalendar(currentDate);
});
