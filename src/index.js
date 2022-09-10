/* eslint-disable no-use-before-define */

import { getData } from './modules/tvApi.js';
import { fetchLikeApi } from './modules/involvementApi.js';
import './style.css';
import Logo from './assets/logo.svg';

// Logo
const navbar = document.querySelector('.navbar a');
const pageLogo = document.createElement('img');
pageLogo.setAttribute('class', 'logo');
pageLogo.setAttribute('src', Logo);
navbar.appendChild(pageLogo);

document.addEventListener('DOMContentLoaded', () => {
  displayShow();
});

// Home page
const tvShowApi = async () => {
  const fetchResult = await fetch('https://api.tvmaze.com/shows');
  const ShowResult = await fetchResult.json();
  return ShowResult.slice(9, 29);
};
window.onload = tvShowApi();
const contCount = (array) => array.length;
const displayShow = async () => {
  const shows = await tvShowApi();
  const fetchLikes = await fetchLikeApi();
  const showLength = document.querySelector('.movie-number');
  showLength.innerText = `Displaying ${contCount(shows)} Shows`;
  shows.forEach((card) => {
    const cardLikes = fetchLikes.find((like) => like.item_id === card.id);
    const { id } = card;
    let liveCount = +cardLikes?.likes;
    const container = document.querySelector('.container');
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-item');
    cardItem.innerHTML = '';
    cardItem.innerHTML = `                 
      <img src=${card.image.original} alt=${card.name}>
      <div class="card-text">
        <div class="title-and-likes">
          <p class="show-title">${card.name}</p>
          <i class="fas fa-thumbs-up"  aria-hidden="true"></i>
          <p class="total-likes">${liveCount} likes</p>
        </div>
        <hr>
        <button id = ${id} class="comment-btn">Comments</button>
      </div>`;
    const likeIcon = cardItem.querySelectorAll('.fa-thumbs-up');
    likeIcon.forEach((icon) => {
      icon.addEventListener('click', (thumb) => {
        const liveCountElement = cardItem.getElementsByClassName('total-likes')[0];
        liveCount += 1;
        liveCountElement.innerHTML = `${liveCount} likes`;
        submitNewLike(id);
        thumb.disabled = true;
        icon.style.color = 'orange';
      });
    });

    container.appendChild(cardItem);
    const totalLikes = document.querySelectorAll('.total-likes');
    totalLikes.forEach((like) => {
      if (like.innerText === 'NaN likes') {
        like.innerText = '0 likes';
      } else if (like.innerText === '1 likes') {
        like.innerText = '1 like';
      }
    });
  });
};