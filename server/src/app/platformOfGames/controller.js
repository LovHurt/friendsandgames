const platformOfGame = require("./model");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");

const createPlatformOfGame = async (req, res) => {
  const { gameId, platformId } = req.body;

  if (!gameId || !platformId) {
    throw new APIError("Both gameId and platformId are required", 400);
  }

  const platformOfGameCheck = await platformOfGame.findOne({ gameId, platformId });

  if (platformOfGameCheck) throw new APIError('This game-platform relation already exists', 409);

  const platformOfGameSave = new platformOfGame(req.body);

  await platformOfGameSave
    .save()
    .then((data) => {
      return new Response(data, "PlatformOfGame relation added successfully").created(res);
    })
    .catch((err) => {
      console.log(err);
      throw new APIError("PlatformOfGame couldn't be added", 400);
    });
};

const getPlatformOfGames = async (req, res) => {
  try {
    const platformOfGames = await platformOfGame.find()
      .populate('gameId')
      .populate('platformId');

    return new Response(platformOfGames, 'PlatformOfGame relations fetched successfully').success(res);
  } catch (err) {
    throw new APIError('An error occurred while fetching PlatformOfGame relations', 500);
  }
};

const deletePlatformOfGame = async (req, res) => {
  const { id } = req.params;

  const platformOfGameCheck = await platformOfGame.findById(id);

  if (!platformOfGameCheck) throw new APIError('PlatformOfGame relation with that id cannot be found', 404);

  await platformOfGame
    .findByIdAndDelete(id)
    .then((data) => {
      return new Response(data, 'PlatformOfGame relation deleted successfully').success(res);
    })
    .catch((err) => {
      throw new APIError('An error occurred while deleting the PlatformOfGame relation', 400);
    });
};

module.exports = {
  createPlatformOfGame,
  getPlatformOfGames,
  deletePlatformOfGame,
};