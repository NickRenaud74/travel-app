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
        let trip = document.getElementById('trip');

        const description = document.createElement('div');
        description.innerHTML =
            `<p>Your ${projectData.countdown} day trip to ${projectData.city}, ${projectData.country} leaving on ${projectData.tripDate}.</p>`
        trip.appendChild(description);

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

        //Display forecast icon, description and temperatures for today
        const forecast = document.createElement('div');
        if (projectData.countdown <= 7) {
            forecast.innerHTML =
                `<div class=icon><img src="https://www.weatherbit.io/static/img/icons/${projectData.forecast[0].weather.icon}.png" alt="weather icon"></div>
                <div class=description>Current weather conditions: ${projectData.forecast[0].weather.description}.
                <div class=temp><strong>High: </strong>${projectData.forecast[0].max}&degC <strong>Low: </strong>${projectData.forecast[0].min}&degC</div>`
        };

        if (projectData.countdown > 7) {
            const longForecast = document.createElement('ul');
            for (let day of projectData.forecast) {
                const dailyForecast = document.createElement('li');
                dailyForecast.innerHTML =
                    `<div class=date>${day.date}</div>
                    <div class=icon><img src="https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png" alt="weather icon"></div>
                <div class=description>${day.weather.description}.</div>
                <div class=temp><strong>High: </strong>${day.max}&degC <strong>Low: </strong>${day.min}&degC</div>`
                longForecast.appendChild(dailyForecast);
            };
            forecast.appendChild(longForecast);
        }
        trip.appendChild(forecast);

        const info = document.createElement('div');
        info.innerHTML =
            `<h3>Things to know before you go</h3>
            <ul>
            <li>Capital City: ${projectData.capital}</li>
            <li>Population of ${projectData.country}: ${projectData.population}</li>
            <li>Language spoken: ${projectData.language}</li>
            <li>Currency: ${projectData.currency}</li>
            </ul>`;
        trip.appendChild(info);

    } catch (error) {
        console.log('error: ', error);
    }
};


export {
    updateUi
}