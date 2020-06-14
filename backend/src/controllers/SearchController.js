const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    // Filtrar por tecnologias
    const techsArray = parseStringAsArray(techs);
    
    // Buscar todos os devs num raio de 10km
    const devs = await Dev.find({
      techs: {
        // Operadores do MongoDB 
        // https://docs.mongodb.com/manual/reference/operator/query/
        $in: techsArray,
        
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ devs: [] });
  }
}