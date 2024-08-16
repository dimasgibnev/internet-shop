import express from "express";
import {
  addProduct,
  editProduct,
  getProduct,
  deleteProduct,
  getProducts,
} from "../controllers/product.js";
import {
  addDescription,
  deleteDescription,
} from "../controllers/description.js";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import * as ROLES from "../constants/roles.js";

export const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.page,
    req.query.limit
  );

  res.send({ data: { lastPage, products } });
});

router.get("/:id", async (req, res) => {
  const product = await getProduct(req.params.id);

  res.send({ data: product });
});

router.post("/:id/comments", authenticated, async (req, res) => {
  const newDescription = await addDescription(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: newDescription });
});

router.delete(
  "/:postId/comments/:commentId",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteDescription(req.params.productId, req.params.descriptionId);

    res.send({ error: null });
  }
);

router.post(
  "/",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  async (req, res) => {
    const newProduct = await addProduct({
      name: req.body.title,
      imageUrl: req.body.imageUrl,
      cordless: req.body.cordless,
    });

    res.send({ data: newProduct });
  }
);

router.patch(
  "/:id",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      cordless: req.body.cordless,
    });

    res.send({ data: updatedProduct });
  }
);

router.delete(
  "/:id",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteProduct(req.params.id);

    res.send({ error: null });
  }
);
