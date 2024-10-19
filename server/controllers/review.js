import { ProductModel } from "../models/Product.js";
import { ReviewModel } from "../models/Review.js";
import { handleError } from "../utils/handleError.js";

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.query;
    const reviews = await ReviewModel.find({ productId: productId }).populate(
      "postedBy"
    );

    res.json({ reviews });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const addReview = async (req, res) => {
  const { _id } = req.user;
  const { star, productId, comment } = req.body;
  try {
    const review = await ReviewModel.create({
      star,
      comment,
      postedBy: _id,
      productId,
    });

    const reviews = await ReviewModel.find({ productId }).populate("postedBy");

    const totalLength = reviews.length;
    const reviewsum = reviews
      .map((item) => item.star)
      .reduce((acc, star) => acc + star, 0);

    const actualRating = Math.round(reviewsum / totalLength);

    await ProductModel.findByIdAndUpdate(productId, {
      totalRating: actualRating,
    });

    const lastPage = Math.ceil(totalLength / 2);

    res.json({ reviews, lastPage });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const updateReview = async (req, res) => {
  const { reviewId, comment, star } = req.body;
  try {
    const review = await ReviewModel.findByIdAndUpdate(
      reviewId,
      { comment, star },
      {
        new: true,
      }
    );

    res.json({ review });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};
export const deleteReview = async (req, res) => {
  const { id } = req.params;
  
  try {
    await ReviewModel.findByIdAndDelete(id);

    res.json({ message: "Отзыв удален" });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};
