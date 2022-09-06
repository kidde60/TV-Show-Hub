// import './style.css';
const path = 'https://imdb8.p.rapidapi.com/auto-complete?q=game';
const container = document.querySelector('.container')
const list = document.createElement('ul')


const getMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4e9eb6ac39mshafc132e8850bb83p183f0bjsn09e883c16e80',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    fetch(path, options)
        .then(response => response.json())
        .then(data => {
            const allMovies = data.d;
            allMovies.forEach((card) => {
                const listItem = document.createElement('li')
                listItem.innerHTML = '';
                listItem.innerHTML = `
                            <div>
                            <img src="${card.i.imageUrl}" alt="${card.l}">
                            <h1 class="title">${card.l}</h1>
                            <p class="likes">
                            <i class="fa-solid fa-heart"></i>
                            Likes
                            </p>
                            </div>
                            <button class="btn">Comments</button>
                        `
                list.appendChild(listItem);
                container.appendChild(list)
            });
        })
}
getMovies();

