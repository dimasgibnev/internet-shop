import mongoose from "mongoose";

export const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) res.status(500).json({message: 'не верный id'})

  return isValid;
};
