module.exports = function calculateDays(start, end) {
    const initialDay = new Date(start)
    const finalDay = new Date(end)
    const days = Math.floor((finalDay - initialDay) / (1000 * 60 * 60 * 24));

    return days
}