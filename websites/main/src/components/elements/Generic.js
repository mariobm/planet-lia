const axios = require('axios');
const getLanguages = (game, language) =>
    {
        axios.get('https://api.github.com/repos/planet-lia/planet-lia/contents/games/'+game+'/bots/'+language)
    .then(function (response) {
        JSON.parse(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });
    }