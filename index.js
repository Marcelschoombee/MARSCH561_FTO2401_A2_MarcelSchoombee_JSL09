fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature") // fetches the API endpoint
    .then(res => res.json()) //converts the response to json method
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})` // fetches the image from the url with regular-size
		document.getElementById("author").textContent = `By: ${data.user.name}` // updates the auther name in a element id 
    })
    .catch(err => {                         // this sets a default image if a error happens
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = ` // shows the dogecoin logo and name in a element 'crypto-top'
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += ` // shows the market data in a element called 'crypto'
            <p>🎯: R${data.market_data.current_price.zar}</p>
            <p>👆: R${data.market_data.high_24h.zar}</p>
            <p>👇: R${data.market_data.low_24h.zar}</p>
        `
    })
    .catch(err => console.error(err))

function getCurrentTime() { // function is defined to get current time
    const date = new Date() // its formatted to display only the time portion using 'toLocaleTimeString' 'short'
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}                           

setInterval(getCurrentTime, 1000)       // and its called every second to keep time up to date

navigator.geolocation.getCurrentPosition(position => { // obtain users current position 
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available") // if there is a error
            }
            return res.json() // returns the data as json
        })
        .then(data => {             // returns the weather icon, rounded off temp and city name
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});
