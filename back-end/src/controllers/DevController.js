const axios = require('axios');

const Dev = require('../models/Dev');
const parseStringArray = require('../utils/parseStringArray');

module.exports = {

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    // Tenta recuperar dev já existente na base do sistema
    let dev = await Dev.findOne({ github_username});

    // só vai no github se não existir na base do sistema
    if (!dev) {
      try{
        // consultar api github 
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
        // desestruturar somente os dados de interesse
        const { name = login, avatar_url, bio } = apiResponse.data;
    
        // separa a string em um array retirando os espaços que existirem
        const techArray = parseStringArray(techs);
    
        // passar primeiro longitude e depois latitude
        const location = {
          type: 'Point',
          coordinates: [
            longitude,
            latitude
          ]
        }
    
        // criar documento no banco de dados
        const dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techArray,
          location
        });
    
        return res.json(dev);
      } catch (err) {
  
        if (err.response.status == 404) {
          return res.status(404).json({message: 'User was not found on github.com', error: err.message });
        }
    
        return res.status(500).json({message: 'That\'s embarassing but an error happend while processing your request.', error: err.message });
      }
    }

    // retorna info do dev já existente no sistema
    return res.json(dev);
  
  
  },

  // async udpate(req, res) {
  //   const {id, techs, location} = req.body;


  // }
}