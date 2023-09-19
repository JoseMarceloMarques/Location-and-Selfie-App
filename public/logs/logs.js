getData();
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  
  for (item of data) {
    const root = document.createElement('p');
    const mood = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');

    mood.textContent = `Mood: ${item.mood}`;
    geo.textContent = `Latitude: ${item.lat}, Longitude: ${item.lon}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = `Date: ${dateString}`;
    image.src = item.image64;
    image.alt = "Selfie of the moment";

    root.append(mood, geo, date, image);
    document.body.append(root);
  }
}