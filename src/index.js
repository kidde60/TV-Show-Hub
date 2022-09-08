// import './style.css';
// import Logo from './assets/logo.svg';

// const path = 'https://imdb8.p.rapidapi.com/auto-complete?q=friends';
const container = document.querySelector('.container');
const navbar = document.querySelector('.navbar a');
const list = document.createElement('ul');

// const pageLogo = document.createElement('img');
// pageLogo.setAttribute('class', 'logo');
// pageLogo.setAttribute('src', Logo);
// navbar.appendChild(pageLogo);
const url = 'https://api.tvmaze.com/shows';
const getData = async () => {
  let data = await fetch(url);
  data = await data.json();

  return data.slice(3, 15);
}

const display = async () => {
  const data = await getData()
  data.forEach((card) => {
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
                  Like
                  <i class="far fa-heart"></i>
                </p>
              </div>
              <hr>
              <button class="openBtn">Comments</button>
            </div>`;
    list.appendChild(listItem);
    container.appendChild(list);
    // const commentBtn = document.querySelectorAll('.openBtn')
    // commentBtn.forEach((btn) => {
    //   btn.addEventListener('click',)
    // })
  })

}
display()


