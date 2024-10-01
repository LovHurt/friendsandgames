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
      console.log(err);
      throw new APIError("category couldn't add", 400);
    });
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    
    const categoryCheck = await category.findById(id);

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
    const getSubcategories = async (parentId) => {
      const subcategories = await category.find({ parentId });
      
      return await Promise.all(
        subcategories.map(async (subcategory) => {
          const childSubcategories = await getSubcategories(subcategory._id);

          return {
            ...subcategory.toObject(),
            subcategories: childSubcategories,
          };
        })
      );
    };

    const rootCategories = await category.find({ parentId: null });

    const populatedCategories = await Promise.all(
      rootCategories.map(async (rootCat) => {
        const subcategories = await getSubcategories(rootCat._id);
        return {
          ...rootCat.toObject(),
          subcategories,
        };
      })
    );

    return new Response(populatedCategories, 'Root and nested subcategories fetched successfully').success(res);
  } catch (err) {
    throw new APIError('An error occurred while fetching categories', 500);
  }
};



module.exports = {
    createCategory,
    deleteCategory,
    getCategoriesWithSubcategories,
}
