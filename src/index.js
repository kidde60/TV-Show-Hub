// import './style.css';



// import Logo from './assets/logo.svg';

// const uniqueID = '41z7rNWXbEPeMpQVJIbo'


const container = document.querySelector('.container');
const navbar = document.querySelector('.navbar a');
const list = document.createElement('ul');
const popup = document.querySelector('.modal-container')
// const pageLogo = document.createElement('img');
// pageLogo.setAttribute('class', 'logo');
// pageLogo.setAttribute('src', Logo);)
// navbar.appendChild(pageLogo);
const url = 'https://api.tvmaze.com/shows';
const getData = async () => {
  let data = await fetch(url);
  data = await data.json();

  return data.slice(3, 15);
}
window.onload = getData()
const movieCount = (arr) => arr.length;

const display = async () => {
  const data = await getData();
  const likes = await fetchLikeApi();
  const movieNumber = document.querySelector('.movie-number');
  movieNumber.innerHTML = `(${movieCount(data)})`;
  data.forEach((card) => {
    const cardLikes = likes.find((like) => like.item_id === card.id)
    const { id } = card;
    let liveCount = +cardLikes?.likes;
    // console.log(card)
    const listItem = document.createElement('li');
    listItem.innerHTML = '';
    listItem.innerHTML = `
          <div>
            <img src="${card.image.medium}" alt="${card.name}">
            <div class="card-text">
              <div class="title-like">
                <p class="title">
                  ${card.name}
                </p>
                <p class="likes">
                  
                  <i class="far fa-heart"></i>
                  <p class="likes">${liveCount} Likes</p>
                </p>
              </div>
              <hr>
              <button class="openBtn" id=${id}>Comments</button>
            </div>`;

    const likeBtn = listItem.querySelectorAll('.fa-heart');
    likeBtn.forEach((button) => {
      button.addEventListener('click', (btn) => {
        const liveCountElement = listItem.getElementsByClassName('likes');
        liveCount += 1;
        liveCountElement.innerHTML = `${liveCount} likes`;
        submitNewLike(id);
        btn.disabled = true;
        button.style.color = 'red';
        location.reload()
      },
      )
    })
    list.appendChild(listItem);
    container.appendChild(list);
  })

}
display()

const uniqueID = 'MjgCDPvMKfBMbwFq4McF'
const fetchLikeApi = async () => {
  const getLikeResult = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${uniqueID}/likes`)
    .then((res) => res.json());
  return getLikeResult;
};

const submitNewLike = async (id) => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${uniqueID}/likes`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

