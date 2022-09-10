const getData = async (id) => {
    const movieInfo = await fetch(`https://api.tvmaze.com/shows/${id}`).then((result) => result.json());
    return movieInfo;
    };

export default getData;