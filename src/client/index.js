import { getData } from './js/handleData';
import { updateUi } from './js/updateUi';
import { postData } from './js/postData';
import { getForecast, displayModal, getImages, deleteTrip } from './js/helpers';
import './styles/main.scss';
import './styles/form.scss';
import background from '../../images/background.jpg';

//export functions to Client library
export {
    getData,
    updateUi,
    postData,
    getForecast,
    displayModal,
    getImages,
    deleteTrip
}