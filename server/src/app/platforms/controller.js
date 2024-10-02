const platform = require("./model");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");

const createPlatform = async (req, res) => {
  const { name } = req.body;

  const platformCheck = await platform.findOne({ name });

  if (platformCheck) throw new APIError('This platform already exists', 409);

  const platformSave = new platform(req.body);

  await platformSave
    .save()
    .then((data) => {
      return new Response(data, "Platform added successfully").created(res);
    })
    .catch((err) => {
      console.log(err);
      throw new APIError("Platform couldn't be added", 400);
    });
};

const deletePlatform = async (req, res) => {
  const { id } = req.params;

  const platformCheck = await platform.findById(id);

  if (!platformCheck) throw new APIError('Platform with that id cannot be found', 404);

  await platform
    .findByIdAndDelete(id)
    .then((data) => {
      return new Response(data, 'Platform deleted successfully').success(res);
    })
    .catch((err) => {
      throw new APIError('An error occurred while deleting the platform', 400);
    });
};

const getPlatforms = async (req, res) => {
  try {
    const platforms = await platform.find();

    return new Response(platforms, 'Platforms fetched successfully').success(res);
  } catch (err) {
    throw new APIError('An error occurred while fetching platforms', 500);
  }
};  

module.exports = {
    createPlatform,
    deletePlatform,
    getPlatforms,
};