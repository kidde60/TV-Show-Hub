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