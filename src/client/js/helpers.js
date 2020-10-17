//Get Forecast function - Either one day or 16 day forecast
const getForecast = (countdown, forecast) => {
    if (countdown <= 7) {
        return `<div class="icon"><img src="https://www.weatherbit.io/static/img/icons/${forecast[0].weather.icon}.png" alt="weather icon"></div>
        <div class="conditions"><strong>Current weather conditions:</strong> ${forecast[0].weather.description}.
        <div class="temp"><strong>High: </strong>${forecast[0].max}&degC <strong>Low: </strong>${forecast[0].min}&degC</div>`
    };
    if (countdown > 7) {
        const longForecast = document.createElement('ul');
        longForecast.className = 'long-forecast';
        longForecast.innerHTML = '<p><strong>16 Day Forecast:</strong></p>';
        for (let day of forecast) {
            const dailyForecast = document.createElement('li');
            dailyForecast.innerHTML =
                `<div class="date">${day.date}</div>
                    <div class="icon"><img src="https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png" alt="weather icon"></div>
                    <div class="conditions">${day.weather.description}.</div>
                    <div class="temp"><strong>High: </strong>${day.max}&degC <strong>Low: </strong>${day.min}&degC</div>`
            longForecast.appendChild(dailyForecast);
        };
        return longForecast.outerHTML;
    };
};

//Image Modal to view images in full size
const displayModal = (event) => {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('img01');
    modal.style.display = "block";
    modalImg.src = event.target.src;

    const close = document.getElementsByClassName("close")[0];
    close.onclick = function() {
        modal.style.display = "none";
    }
};

//Image function to create a dynamic div for each image 
const getImages = (pics) => {
    const images = document.createElement('ul');
    images.className = 'images';
    //Create image element for each picture in list
    for (let pic of pics) {
        const slide = document.createElement('li');
        slide.innerHTML = `<img src="${pic}"  alt="destination picture" class="slides">`
        images.appendChild(slide);
    };
    return images.outerHTML;
};


//Delete Trip function
const deleteTrip = async(event) => {
    const remove = await Client.postData('/deleteTrip', {
        id: event.target.id
    });
    const trip = document.getElementById(`${event.target.id}`);
    trip.remove();
};

export {
    getForecast,
    displayModal,
    getImages,
    deleteTrip
}