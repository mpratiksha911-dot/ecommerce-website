const express = require("express");

const Product =
    require("../models/Product");

const router =
    express.Router();


// GET products

router.get(
    "/",
    async (req, res) => {

        try {

            const products =
                await Product.find();

            res.json(products);

        } catch (error) {

            res.status(500).json({
                message:
                    "Failed to fetch products"
            });

        }

    }
);


// GET single product

router.get(
    "/:id",
    async (req, res) => {

        try {

            const product =
                await Product.findById(
                    req.params.id
                );

            if (!product) {

                return res.status(404).json({
                    message:
                        "Product not found"
                });

            }

            res.json(product);

        } catch (error) {

            res.status(500).json({
                message:
                    "Failed to fetch product"
            });

        }

    }
);


// CREATE product

router.post(
    "/",
    async (req, res) => {

        try {

            const product =
                new Product(req.body);

            const saved =
                await product.save();

            res.status(201).json(saved);

        } catch (error) {

            res.status(400).json({
                message:
                    "Failed to create product",
                error: error.message
            });

        }

    }
);


// UPDATE product

router.put(
    "/:id",
    async (req, res) => {

        try {

            const updated =
                await Product.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true
                    }
                );

            res.json(updated);

        } catch (error) {

            res.status(400).json({
                message:
                    "Failed to update product"
            });

        }

    }
);


// DELETE product

router.delete(
    "/:id",
    async (req, res) => {

        try {

            await Product.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message:
                    "Product deleted successfully"
            });

        } catch (error) {

            res.status(400).json({
                message:
                    "Failed to delete product"
            });

        }

    }
);


module.exports = router;
