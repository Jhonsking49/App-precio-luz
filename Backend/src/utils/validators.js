export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    // Mínimo 6 caracteres, al menos una letra y un número
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
};

export const validateDate = (date) => {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
};

export const validateHour = (hour) => {
    const hourNum = parseInt(hour);
    return !isNaN(hourNum) && hourNum >= 0 && hourNum <= 23;
};

export const validateHourRange = (startHour, endHour) => {
    const start = parseInt(startHour);
    const end = parseInt(endHour);
    
    if (isNaN(start) || isNaN(end)) return false;
    if (start < 0 || start > 23) return false;
    if (end < 0 || end > 23) return false;
    if (start > end) return false;
    
    return true;
}; 