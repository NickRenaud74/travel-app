let slideIndex = 0;

const slideShow = () => {
    //console.log(slides.length);
    const slides = document.querySelectorAll('.slides');
    for (let slide of slides) {
        slide.style.display = 'none';
    };
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    };
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(slideShow, 3000);
};

const updateUi = async() => {
    const request = await fetch('/projectData');
    try {
        const projectData = await request.json();

        //create div to hold output
        let trip = document.getElementById('trip');

        //div to hold picture details
        const display = document.createElement('div');
        display.className = 'display';

        //setting up picture variables for slideshow
        const pics = projectData.pictures;
        const fragment = document.createDocumentFragment();

        //Create image element for each picture in list
        for (let pic of pics) {
            const slide = document.createElement('img');
            slide.src = pic;
            slide.className = 'slides';
            fragment.appendChild(slide);
        };
        display.appendChild(fragment);
        trip.appendChild(display);

        // Automatic slideshow function
        slideShow();

        //Create a div to hold trip information
        const tripDetails = document.createElement('div');
        tripDetails.className = 'details';

        //Description of trip
        const description = document.createElement('div');
        description.className = 'description';
        description.innerHTML =
            `<p><strong>Your ${projectData.length} day trip to ${projectData.city}, ${projectData.country} leaving on ${projectData.tripDate}.</strong></p>`;
        tripDetails.appendChild(description);

        //Countdown to trip
        const countdown = document.createElement('div');
        countdown.className = 'countdown';
        countdown.innerHTML = `<p><strong>${projectData.countdown} days away!</strong></p>`;
        tripDetails.appendChild(countdown);

        //update destination information
        const info = document.createElement('div');
        info.className = 'info';
        info.innerHTML =
            `<h3><strong>Things to know before you go</strong></h3>
            <ul>
            <li><strong>Capital City:</strong> ${projectData.capital}</li>
            <li><strong>Population of ${projectData.country}:</strong> ${projectData.population}</li>
            <li><strong>Language spoken:</strong> ${projectData.language}</li>
            <li><strong>Currency:</strong> ${projectData.currency}</li>
            </ul>`;
        tripDetails.appendChild(info);

        //Display forecast icon, description and temperatures for today
        const forecast = document.createElement('div');
        forecast.className = 'forecast';
        if (projectData.countdown <= 7) {
            forecast.innerHTML =
                `<div class="icon"><img src="https://www.weatherbit.io/static/img/icons/${projectData.forecast[0].weather.icon}.png" alt="weather icon"></div>
                <div class="conditions"><strong>Current weather conditions:</strong> ${projectData.forecast[0].weather.description}.
                <div class="temp"><strong>High: </strong>${projectData.forecast[0].max}&degC <strong>Low: </strong>${projectData.forecast[0].min}&degC</div>`
        };

        //Display 16 day forecast if trip is longer than 7 days
        if (projectData.countdown > 7) {
            const longForecast = document.createElement('ul');
            longForecast.className = 'long-forecast';
            for (let day of projectData.forecast) {
                const dailyForecast = document.createElement('li');
                dailyForecast.innerHTML =
                    `<div class="date">${day.date}</div>
                    <div class="icon"><img src="https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png" alt="weather icon"></div>
                <div class="conditions">${day.weather.description}.</div>
                <div class="temp"><strong>High: </strong>${day.max}&degC <strong>Low: </strong>${day.min}&degC</div>`
                longForecast.appendChild(dailyForecast);
            };
            forecast.appendChild(longForecast);
        }
        tripDetails.appendChild(forecast);

        trip.appendChild(tripDetails);

    } catch (error) {
        console.log('error: ', error);
    }
};


export {
    updateUi
}