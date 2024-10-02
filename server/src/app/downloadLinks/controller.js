const downloadLink = require("./model");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");

const createDownloadLink = async (req, res) => {
  const { gameId, url } = req.body;

  if (!gameId || !url) {
    throw new APIError("gameId and url are required", 400);
  }

  const downloadLinkSave = new downloadLink(req.body);

  await downloadLinkSave
    .save()
    .then((data) => {
      return new Response(data, "Download link added successfully").created(res);
    })
    .catch((err) => {
      console.log(err);
      throw new APIError("Download link couldn't be added", 400);
    });
};

const getDownloadLinks = async (req, res) => {
  try {
    const downloadLinks = await downloadLink.find().populate('gameId');

    return new Response(downloadLinks, 'Download links fetched successfully').success(res);
  } catch (err) {
    throw new APIError('An error occurred while fetching download links', 500);
  }
};

const deleteDownloadLink = async (req, res) => {
  const { id } = req.params;

  const downloadLinkCheck = await downloadLink.findById(id);

  if (!downloadLinkCheck) throw new APIError('Download link with that id cannot be found', 404);

  await downloadLink
    .findByIdAndDelete(id)
    .then((data) => {
      return new Response(data, 'Download link deleted successfully').success(res);
    })
    .catch((err) => {
      throw new APIError('An error occurred while deleting the download link', 400);
    });
};

module.exports = {
  createDownloadLink,
  getDownloadLinks,
  deleteDownloadLink,
};