const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
};
module.exports = formatDate;