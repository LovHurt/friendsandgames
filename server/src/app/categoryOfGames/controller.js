const categoryOfGame = require("./model");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");

const createCategoryOfGame = async (req, res) => {
  const { gameId, categoryId } = req.body;

  if (!gameId || !categoryId) {
    throw new APIError("Both gameId and categoryId are required", 400);
  }

  const categoryOfGameCheck = await categoryOfGame.findOne({ gameId, categoryId });

  if (categoryOfGameCheck) throw new APIError('This game-category relation already exists', 409);

  const categoryOfGameSave = new categoryOfGame(req.body);

  await categoryOfGameSave
    .save()
    .then((data) => {
      return new Response(data, "CategoryOfGame relation added successfully").created(res);
    })
    .catch((err) => {
      console.log(err);
      throw new APIError("CategoryOfGame couldn't be added", 400);
    });
};

const getCategoryOfGames = async (req, res) => {
  try {
    const categoryOfGames = await categoryOfGame.find()
      .populate('gameId')
      .populate('categoryId');

    return new Response(categoryOfGames, 'CategoryOfGame relations fetched successfully').success(res);
  } catch (err) {
    throw new APIError('An error occurred while fetching CategoryOfGame relations', 500);
  }
};

const deleteCategoryOfGame = async (req, res) => {
  const { id } = req.params;

  const categoryOfGameCheck = await categoryOfGame.findById(id);

  if (!categoryOfGameCheck) throw new APIError('CategoryOfGame relation with that id cannot be found', 404);

  await categoryOfGame
    .findByIdAndDelete(id)
    .then((data) => {
      return new Response(data, 'CategoryOfGame relation deleted successfully').success(res);
    })
    .catch((err) => {
      throw new APIError('An error occurred while deleting the CategoryOfGame relation', 400);
    });
};

module.exports = {
  createCategoryOfGame,
  getCategoryOfGames,
  deleteCategoryOfGame,
};