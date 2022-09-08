import './style.css';
import Logo from './assets/logo.svg';

const navbar = document.querySelector('.navbar a');
const pageLogo = document.createElement('img');
pageLogo.setAttribute('class', 'logo');
pageLogo.setAttribute('src', Logo);
navbar.appendChild(pageLogo);

// const involvement = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
// const uniqueID = '41z7rNWXbEPeMpQVJIbo'

const container = document.querySelector('.container');
const list = document.createElement('ul');
const popup = document.querySelector('.modal-container')
const url = 'https://api.tvmaze.com/shows';
const getData = async () => {
  let data = await fetch(url);
  data = await data.json();
  return data.slice(13);
}
const display = async () => {
  const data = await getData()
  data.forEach((card) => {
    // console.log(card)
    const listItem = document.createElement('li');
    listItem.innerHTML = '';
    listItem.innerHTML = `
      <img src="${card.image.medium}" alt="${card.name}">
      <div class="card-text">
        <div class="title-like">
          <h3 class="title">
            ${card.name}
          </h3>
          <p class="likes">
            Like
            <i class="far fa-heart"></i>
          </p>
        </div>
        <hr>
        <button class="openBtn" id=${card.id}>Read More <i class="fas fa-chevron-right"></i></button>
      </div>`;
    list.appendChild(listItem);
    container.appendChild(list);
  })
  
  const commentBtn = document.querySelectorAll('.openBtn')
  commentBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.target.id;
      popup.style.display = 'block';
      getOneItem(id)
    })
  })
}
display()

const getOneItem = async (id) => {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
    .then((result) => result.json())
  console.log(response);
  const card = response;
  console.log(card)
  const modalContent = document.querySelector('.modal-container');
  modalContent.innerHTML = '';
  modalContent.innerHTML += `
  <div class="modal">
    <img src="${card.image.original}" alt="${card.name}" class="modal-image">
    <div>
      <div class="modal-content">
        <div class="modal-title">
          <h1>${card.name}</h1>
          <a href="#" class="close-modal"><i class="fas fa-times fa-2x"></i></a>
        </div>

        <ul class="modal-sub-title">
          <li>${card.language}</li>
          <li>•</li>
          <li>${card.averageRuntime} mins</li>
          <li>•</li>
          <li><i class="fas fa-star"></i> ${card.rating.average}</li>
          <li>•</li>
          <li>${card.status}</li>
        </ul>

        <hr>

        <ul class="genre">
        <li>${card.genres}</li>
        </ul>

        <p>${card.summary}</p>

        <hr>

        <div class="current-comments">
          <h3>Reviews (3)</h3>
          <div class="all-comments">
            <h5 class="single-comment">Name:<br>Comment:</h5>
            <h5 class="single-comment">Name:<br>Comment:</h5>
            <h5 class="single-comment">Name:<br>Comment:</h5>
          </div>
        </div>

        <div class="add-comments">
          <h3>Add a review</h3>
          <form class="form-add-comment" action="">
            <input class="input-comment-name" type="text" placeholder="Your name?" required>
            <textarea class="input-comment-insight" placeholder="Your comments?" rows="6" required></textarea>
            <button id = ${id} type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>`;
  popup.appendChild(modalContent)
}

// const modalContainer = document.querySelectorAll('.modal-container');
// const closeModal = document.querySelector('.close-modal');
// closeModal.addEventListener('click', () => {
//   modalContainer.remove();
// });
