const formatDateTo_ddmmyyyy = (dateString) => {
    return dateString.slice(0, 10).split("-").reverse().join('-');
}

const utilities = {
    formatDateTo_ddmmyyyy
}

export default utilities;