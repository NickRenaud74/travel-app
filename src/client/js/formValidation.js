//Check if each field in the form as an input from user
const formValidation = (city, country, depart, returning) => {
    if (city == '' || country == '' || depart.toString() == 'Invalid Date' || returning.toString() == 'Invalid Date') {
        return true;
    };
};

//get Today date and convert format
const dateValidation = () => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    };
    if (mm < 10) {
        mm = '0' + mm;
    };

    return `${yyyy}-${mm}-${dd}`;
};


export {
    formValidation,
    dateValidation
}