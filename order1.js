const express = require("express");

const Order =
    require("../models/Order");

const router =
    express.Router();


// Create Order

router.post(
    "/",
    async (req, res) => {

        try {

            const order =
                new Order(req.body);

            const savedOrder =
                await order.save();

            res.status(201).json(
                savedOrder
            );

        } catch (error) {

            res.status(400).json({
                message:
                    "Failed to create order",
                error: error.message
            });

        }

    }
);


// Get all orders

router.get(
    "/",
    async (req, res) => {

        try {

            const orders =
                await Order.find()
                    .populate(
                        "user",
                        "name email"
                    )
                    .populate(
                        "items.product"
                    );

            res.json(orders);

        } catch (error) {

            res.status(500).json({
                message:
                    "Failed to fetch orders"
            });

        }

    }
);


// Update order status

router.put(
    "/:id",
    async (req, res) => {

        try {

            const order =
                await Order.findByIdAndUpdate(
                    req.params.id,
                    {
                        status:
                            req.body.status
                    },
                    {
                        new: true
                    }
                );

            res.json(order);

        } catch (error) {

            res.status(400).json({
                message:
                    "Failed to update order"
            });

        }

    }
);


module.exports = router;
