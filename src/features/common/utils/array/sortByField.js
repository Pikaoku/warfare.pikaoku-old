export const sortByField = (field) => (a, b) => {
    var x = a[field].toLowerCase();
    var y = b[field].toLowerCase();
    return (x < y ? -1 : (x > y) ? 1 : 0);
};

export default sortByField