//Dynamic UI function
const updateUi = async(getTrips) => {
    try {
        //get main container element to hold upcoming trips
        const container = document.querySelector('.container');
        container.innerHTML = '<div class="my-trips"><h2>Upcoming Trips</h2></div>';

        //get previous trips div
        const expired = document.querySelector('.previous-trips');
        expired.innerHTML = `<div class="my-trips"><h2>Previous Trips</h2></div>`;

        /*remove all trip cards from DOM.
        Each time a new trip is added the ForEach loop below will update all saved trips.*/
        const getAllTrips = document.querySelectorAll('.trip');
        getAllTrips.forEach(trip => {
            trip.remove();
        });

        //iterate through each destination in all trips array and create an html trip card
        getTrips.forEach(dest => {
            //if countdown is less than a day away change days string to day
            let days = dest.countdown > 1 ? 'days' : 'day';

            //create div to hold each trip
            const trip = document.createElement('div');
            trip.className = 'trip';
            trip.id = `${dest.tripId}`;
            trip.innerHTML = `
            <div class="display">${Client.getImages(dest.pictures)}
                <div class="info"><h3><strong>Things to know before you go</strong></h3>
                <ul>
                <li><strong>Capital City:</strong> ${dest.capital}</li>
                <li><strong>Population of ${dest.country}:</strong> ${dest.population}</li>
                <li><strong>Language spoken:</strong> ${dest.language}</li>
                <li><strong>Currency:</strong> ${dest.currency}</li>
                </ul></div>
            </div>
            <div class="details">
                <div class="description">
                    <p><strong>Your ${dest.length} day trip to ${dest.city}, ${dest.country} on ${dest.tripDate}.</strong></p>
                    <div class="countdown"><p><strong>${dest.countdown} ${days} away!</strong></p></div>
                </div>
                
                <div class="btn"><button class="delete-trip" id=${dest.tripId}>Delete Trip</button></div>
                <div class="forecast">${Client.getForecast(dest.countdown, dest.forecast)}</div>
            </div>`

            //Check if trip is has expired or not
            if (dest.countdown > 0) {
                container.appendChild(trip);
            } else {
                expired.appendChild(trip);
                document.querySelector('.countdown').remove();
            };
        });
        document.querySelectorAll('.slides').forEach(slide => {
            slide.addEventListener('click', Client.displayModal)
        });
        document.querySelectorAll('.delete-trip').forEach(button => {
            button.addEventListener('click', Client.deleteTrip)
        });
    } catch (error) {
        console.log('error: ', error);
    }
};

export {
    updateUi
}