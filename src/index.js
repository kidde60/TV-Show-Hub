import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  displayCards();
});

const tvShowApi = async () => {
  const fetchResult = await fetch('https://api.tvmaze.com/shows');
  const showResult = await fetchResult.json();
  return showResult.slice(8, 62);
};

window.onload = tvShowApi();

const countShows = (array) => array.length;

const displayCards = async () => {
  const shows = await tvShowApi();
  const fetchLikes = await fetchLikeApi();

  const showCount = document.querySelector('.show-count');
  showCount.innerText = `Displaying ${countShows(shows)} Shows`;

  shows.forEach((card) => {
    const cardLikes = fetchLikes.find((like) => like.item_id === card.id);
    const { id } = card;

    let liveCount = cardLikes?.likes ?? 0;

    const container = document.querySelector('.container');
    const listCards = document.createElement('div');
    listCards.classList.add('card-item');

    listCards.innerHTML = `
      <div>
        <img src=${card.image.original} alt=${card.name}>
      </div>
      <div class="card-text">
        <a href="${card.officialSite}" class="show-title" target="_blank">${card.name}</a>
        
        <div class="rating-container">
          <span class="rating-label">Rating </span>
          <span class="rating-value">${card.rating.average}</span>
        </div>

        <div class="show-info">
          <div class="likes">
            <i class="fa fa-heart" aria-hidden="true"></i>
            <p class="totalLikes">${liveCount} likes</p>
          </div>
          <div class="comment">
            <i class="fa fa-comment" aria-hidden="true"></i>
            <button id="${id}" class="comment-btn">Comment</button>
          </div>
        </div>
      </div>
    `;

    const likeBtn = listCards.querySelectorAll('.fa-heart');
    likeBtn.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        button.style.cursor = 'pointer';
      });

      button.addEventListener('click', () => {
        const liveCountElement = listCards.querySelector('.totalLikes');
        liveCount += 1;
        liveCountElement.textContent = getLikesText(liveCount);
        submitNewLike(id);
        button.disabled = true;
        button.style.color = 'red';
      });
    });

    container.appendChild(listCards);

    const totalLikes = document.querySelectorAll('.totalLikes');
    totalLikes.forEach((like) => {
      const count = parseInt(like.innerText);
      like.innerText = getLikesText(count);
    });

    function getLikesText(count) {
      if (count === 1) {
        return `${count} like`;
      } else {
        return `${count} likes`;
      }
    }
  });
};

const tvId = 'MjgCDPvMKfBMbwFq4McF';

const fetchLikeApi = async () => {
  const getLikeResult = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`)
    .then((res) => res.json());
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

const postComments = async (id, name, comment) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4va6c4ouZmpzSETsANV3/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: name,
      comment: comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

const getComments = async (id) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4va6c4ouZmpzSETsANV3/comments?item_id=${id}`)
    .then((res) => res.json());
  return response;
};

document.addEventListener('click', async (e) => {
  if (e.target.matches('.comment-btn')) {
    const id = e.target.id;
    const commentList = await getComments(id); // Wait for getComments to complete and return the comment list
    const showInfo = await getData(id);
    await displayPopup(showInfo, id, commentList);
    const container = document.querySelector('.container');
    container.style.display = 'none';
    const popup = document.querySelector('.popup');
    popup.style.display = 'block';

    displayComments(commentList);
  }
});

const getData = async (id) => {
  const showInfo = await fetch(`https://api.tvmaze.com/shows/${id}`).then((result) => result.json());
  return showInfo;
};

const countComments = (comments) => comments.length;

const displayPopup = async (showInfo, id, commentList) => {
  const show = await showInfo;
  const comments = await commentList;
  const popup = document.querySelector('.popup');
  popup.innerHTML = `
    <div class="modal-container">
      <div class="modal">
        <span class="close-btn"><i class="fas fa-times"></i></span>
        <div class="modal-content">
          <div class="modal-image">
            <a href="#" id="official-site-link"><img src="${show.image.original}" id="show-img" alt=""></a>
          </div>
          <div class="modal-details">
            <div class="summary-tag">
              <h1>${show.name}</h1>
              <p>${show.summary}</p>
              <br>
            </div>
            
            <div>
              <h3>${countComments(comments) === 0 ? 'No Comments' : `${countComments(comments)} Comment${countComments(comments) === 1 ? '' : 's'}`}</h3>
              <ul class="display-comments"></ul>
              <br>
            </div>

            <div>
              <h2>Add a comment</h2>
              <br>
              <div class="form">
                <input type="text" id="fname" name="fname" placeholder="Enter your name"><br><br>
                <textarea name="comment" id="comment" cols="20" rows="3" placeholder="Enter comment"></textarea>
                <button id="${id}" class="submit" type="submit">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    const container = document.querySelector('.container');
    container.style.display = 'grid';
    popup.style.display = 'none';
  });
};

const displayComments = async (commentList) => {
  const commentsContainer = document.querySelector('.display-comments');
  commentsContainer.innerHTML = '';
  const comments = await commentList;
  comments.forEach((comment) => {
    commentsContainer.innerHTML += `
      <div class="text-bubble">
        <li>${comment.username}: ${comment.comment}<br> ${comment.creation_date}</li>
      </div>
    `;
  });
};

document.addEventListener('click', async (e) => {
  if (e.target.matches('.submit')) {
    e.preventDefault();
    const name = document.getElementById('fname').value;
    const comment = document.getElementById('comment').value;
    const id = e.target.id;
    await postComments(id, name, comment);
    const commentList = await getComments(id);
    displayComments(commentList);
  }
});
