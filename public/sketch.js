function setup() {
    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude.toFixed(2);
            const lon = position.coords.longitude.toFixed(2);
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            
            noCanvas();
            const video = createCapture(VIDEO);
            video.size(160, 120);
            
            const button = document.getElementById('locate');
            button.addEventListener('click', async event => {
                const mood = document.getElementById('mood').value;
                video.loadPixels();
                const image64 = video.canvas.toDataURL();
                const data = { lat, lon, mood, image64 };
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };

                const response = await fetch('/api', options);
                const json = await response.json();
                console.log(json);
            });
        });
    } else {
        console.log('geolocation not available');
    }
}