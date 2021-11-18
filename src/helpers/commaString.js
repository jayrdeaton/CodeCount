module.exports = (n) => n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : n
