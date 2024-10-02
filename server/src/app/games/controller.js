const game = require("./model");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");

const createGame = async (req, res) => {
  const { name, minPlayers, maxPlayers, isPaid, platformOfGames, medias, downloadLinks } = req.body;

  if (!name || !minPlayers || !maxPlayers || isPaid === undefined) {
    throw new APIError("name, minPlayers, maxPlayers, and isPaid are required", 400);
  }

  const gameSave = new game(req.body);

  await gameSave
    .save()
    .then((data) => {
      return new Response(data, "Game added successfully").created(res);
    })
    .catch((err) => {
      console.log(err);
      throw new APIError("Game couldn't be added", 400);
    });
};

const getGames = async (req, res) => {
  try {
    const games = await game.find()
      .populate('platformOfGames')
      .populate('medias')
      .populate('downloadLinks');

    return new Response(games, 'Games fetched successfully').success(res);
  } catch (err) {
    throw new APIError('An error occurred while fetching games', 500);
  }
};

const deleteGame = async (req, res) => {
  const { id } = req.params;

  const gameCheck = await game.findById(id);

  if (!gameCheck) throw new APIError('Game with that id cannot be found', 404);

  await game
    .findByIdAndDelete(id)
    .then((data) => {
      return new Response(data, 'Game deleted successfully').success(res);
    })
    .catch((err) => {
      throw new APIError('An error occurred while deleting the game', 400);
    });
};

module.exports = {
  createGame,
  getGames,
  deleteGame,
};