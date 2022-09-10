import { display } from "./popup.js";

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

export {
	submitNewLike,
	fetchLikeApi,
	postComments,
	getComments,
	
};