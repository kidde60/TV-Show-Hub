/* eslint-disable no-use-before-define */

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

// Likes
const tvId = 'MjgCDPvMKfBMbwFq4McF';
const fetchLikeApi = async () => {
  const getLikeResult = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`).then((res) => res.json());
  return getLikeResult;
};
const submitNewLike = async (id) => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

const postComments = async (id, name, com) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4va6c4ouZmpzSETsANV3/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: name,
      comment: com,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
const getComments = async (id) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4va6c4ouZmpzSETsANV3/comments?item_id=${id}`).then((res) => res.json());
  return response;
};
document.addEventListener('click', async (e) => {
  if (!e.target.matches('.comment-btn')) {
    return;
  }
  const { id } = e.target;
  const comList = await getComments(id);
  const showInfo = await getData(id);
  await display(showInfo, id, comList);
  const popup = document.querySelector('.popup');
  popup.classList.add('active');
  displayCom(comList);
});

// Popup {
const getData = async (id) => {
  const movieInfo = await fetch(`https://api.tvmaze.com/shows/${id}`).then((result) => result.json());
  return movieInfo;
};
const countComments = (number) => number.length;
const display = async (movieInfo, id, comList) => {
  const show = await movieInfo;
  const array = await comList;
  const popup = document.querySelector('.popup');
  popup.innerHTML = `
  <div class="modal-container"> 
    <div class="modal">
        <img src="${show.image.original}" alt="${show.name}" class="modal-image">
        <div>
          <div class="modal-content">
            <div class="modal-title">
              <h1>${show.name}</h1>
              <a href="#" class="close-modal"><i class="fas fa-times fa-2x"></i></a>
            </div>
            <ul class="modal-sub-title">
              <li>${show.premiered.substring(0, 4)}</li>
              <li>•</li>
              <li>${show.language}</li>
              <li>•</li>
              <li>${show.averageRuntime} mins</li>
              <li>•</li>
              <li><i class="fas fa-star"></i> ${show.rating.average}</li>
              <li>•</li>
              <li>${show.status}</li>
            </ul>
            <hr>
            <ul class="genres">
              <li>${show.genres[0]}</li>
              <li>${show.genres[1]}</li>
              <li>${show.genres[2]}</li>
            </ul>
            <p>${show.summary}</p>
            <div class="current-comments">
              <h4>Comments (${countComments(array)})</h4>
              <div class="all-comments">
                <ul class="display-comments"></ul>
              </div>
            </div>
            <div class="add-comments">
              <h4>Add a comment</h4>
              <form class="form-add-comment" action="">
                <input class="input-comment-name" type="text" id="fname" name="fname" placeholder="Your name?" required>
                <textarea class="input-comment-insight" id="comment" name="comment" placeholder="Your comments?" rows="6" required></textarea>
                <button id=${id} type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`;
};

const displayCom = async (showInfo) => {
  const commentList = document.querySelector('.display-comments');
  commentList.innerHTML = '';
  const array = await showInfo;
  array.forEach((item) => {
    commentList.innerHTML += `<li class="listCom">${item.username}<br>${item.comment}<br>${item.creation_date}</li>`;
  });
};
document.addEventListener('click', async (e) => {
  if (!e.target.matches('.submit')) {
    return;
  }
  e.preventDefault();
  const name = document.getElementById('fname').value;
  const com = document.getElementById('comment').value;
  const { id } = e.target;
  await postComments(id, name, com);
  const comList = await getComments(id);
  displayCom(comList);
});