const media = require("./model");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");

const createMedia = async (req, res) => {
  const { gameId, mediaType, url } = req.body;

  if (!gameId || !mediaType || !url) {
    throw new APIError("gameId, mediaType, and url are required", 400);
  }

  const mediaSave = new media(req.body);

  await mediaSave
    .save()
    .then((data) => {
      return new Response(data, "Media added successfully").created(res);
    })
    .catch((err) => {
      console.log(err);
      throw new APIError("Media couldn't be added", 400);
    });
};

const getMedias = async (req, res) => {
  try {
    const medias = await media.find().populate('gameId');

    return new Response(medias, 'Medias fetched successfully').success(res);
  } catch (err) {
    throw new APIError('An error occurred while fetching medias', 500);
  }
};

const deleteMedia = async (req, res) => {
  const { id } = req.params;

  const mediaCheck = await media.findById(id);

  if (!mediaCheck) throw new APIError('Media with that id cannot be found', 404);

  await media
    .findByIdAndDelete(id)
    .then((data) => {
      return new Response(data, 'Media deleted successfully').success(res);
    })
    .catch((err) => {
      throw new APIError('An error occurred while deleting the media', 400);
    });
};

module.exports = {
  createMedia,
  getMedias,
  deleteMedia,
};