import { getData } from './js/handleData';
import { updateUi } from './js/updateUi';
import { postData } from './js/postData';
import { getForecast, displayModal, getImages, deleteTrip } from './js/helpers';
import { formValidation, dateValidation } from './js/formValidation';
import './styles/main.scss';
import './styles/form.scss';
import './styles/tripCard.scss';
import './styles/images.scss';
import './styles/media.scss';
import '../../images/paradise.jpg';


window.addEventListener('DOMContentLoaded', (e) => {
    //set datepicker min attributes to be todays date so user can only enter future trip dates
    const datepicker = document.querySelectorAll('.date');
    for (let d of datepicker) {
        d.setAttribute('min', dateValidation());
    };

    let storage = Object.values(localStorage);
    if (storage.length > 0) {
        //remove webpack-dev-server loglevel INFO
        const getIndex = storage.indexOf('INFO');
        storage.splice(getIndex, 1);
        //create a new list and parse each item in local storage
        let storageData = [];

        storage.forEach(item => {
            storageData.push(JSON.parse(item));
        });
        //update UI with localstorage info
        Client.updateUi(storageData);
    }
});

//export functions to Client library
export {
    getData,
    updateUi,
    postData,
    getForecast,
    displayModal,
    getImages,
    deleteTrip,
    formValidation,
    dateValidation
}