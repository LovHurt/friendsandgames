const category = require("./model");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");

const createCategory = async (req, res) => {
  const { name } = req.body;

  const categoryCheck = await category.findOne({ name });

  if (categoryCheck) throw new APIError('this category exist already', 409);

  const categorySave = new category(req.body);

  await categorySave
    .save()
    .then((data) => {
      return new Response(data, "category added successfuly").created(res);
    })
    .catch((err) => {
      throw new APIError("category couldn't add", 400);
    });
};

const deleteCategory = async (req, res) => {
    const {id} = req.body;
    
    const categoryCheck = await category.findOne({id});

    if(!categoryCheck) throw new APIError('category with that id can not be found', 404);

    await category
        .findByIdAndDelete(id)
        .then((data)=> {
            return new Response(data, 'category deleted successfuly').success(res)
        })
        .catch((err)=>{
            throw new APIError('an error occured while category delete', 400)
        })

}

const getCategoriesWithSubcategories = async (req, res) => {
  try {
    const categories = await category.find({ parentId: null });

    const populatedCategories = await Promise.all(
      categories.map(async (cat) => {
        const subcategories = await category.find({ parentId: cat._id });
        return {
          ...cat.toObject(),
          subcategories,
        };
      })
    );

    return new Response(populatedCategories, 'root and subcategories fetched successfuly').success(res);
  } catch (err) {
    throw new APIError('an error occured while fetching categories', 500);
  }
};



module.exports = {
    createCategory,
    deleteCategory,
    getCategoriesWithSubcategories,
}
