import './style.css';
import Logo from './assets/logo.svg';

const path = 'https://imdb8.p.rapidapi.com/auto-complete?q=friends';
const container = document.querySelector('.container');
const navbar = document.querySelector('.navbar a');
const list = document.createElement('ul');

const pageLogo = document.createElement('img');
pageLogo.setAttribute('class', 'logo');
pageLogo.setAttribute('src', Logo);
navbar.appendChild(pageLogo);

const getMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4e9eb6ac39mshafc132e8850bb83p183f0bjsn09e883c16e80',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
    },
  };

  fetch(path, options)
    .then((response) => response.json())
    .then((data) => {
      const allMovies = data.d;
      allMovies.forEach((card) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = '';
        listItem.innerHTML = `
          <div>
            <img src="${card.i.imageUrl}" alt="${card.l}">
            <div class="card-text">
              <div class="title-like">
                <p class="title">
                  ${card.l}<br>${card.y}
                </p>
                <p class="likes">
                  Like
                  <i class="far fa-heart"></i>
                </p>
              </div>
              <hr>
              <button class="openBtn">Comments</button>
            </div>`;
        list.appendChild(listItem);
        container.appendChild(list);
      });
    });
};
getMovies();

const openBtn = document.querySelector('.openBtn');
const modalContainer = document.querySelector('.modal-container');
openBtn.addEventListener('click', () => {
  modalContainer.classList.add('show');
})

const closeIcon = doocument.querySelector('.close-modal');

