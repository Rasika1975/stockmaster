import Delivery from '../models/Delivery.model.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all deliveries
// @route   GET /api/deliveries
// @access  Public
const getDeliveries = asyncHandler(async (req, res) => {
  const deliveries = await Delivery.find({});
  res.json(deliveries);
});

// @desc    Fetch single delivery
// @route   GET /api/deliveries/:id
// @access  Public
const getDeliveryById = asyncHandler(async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);

  if (delivery) {
    res.json(delivery);
  } else {
    res.status(404);
    throw new Error('Delivery not found');
  }
});

// @desc    Create a delivery
// @route   POST /api/deliveries
// @access  Private
const createDelivery = asyncHandler(async (req, res) => {
  const { deliveryNo, customer, date, status, warehouse, items } = req.body;

  const delivery = new Delivery({
    deliveryNo,
    customer,
    date,
    status,
    warehouse,
    items,
  });

  const createdDelivery = await delivery.save();
  res.status(201).json(createdDelivery);
});

// @desc    Update a delivery
// @route   PUT /api/deliveries/:id
// @access  Private
const updateDelivery = asyncHandler(async (req, res) => {
  const { deliveryNo, customer, date, status, warehouse, items } = req.body;

  const delivery = await Delivery.findById(req.params.id);

  if (delivery) {
    delivery.deliveryNo = deliveryNo || delivery.deliveryNo;
    delivery.customer = customer || delivery.customer;
    delivery.date = date || delivery.date;
    delivery.status = status || delivery.status;
    delivery.warehouse = warehouse || delivery.warehouse;
    delivery.items = items || delivery.items;

    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } else {
    res.status(404);
    throw new Error('Delivery not found');
  }
});

// @desc    Delete a delivery
// @route   DELETE /api/deliveries/:id
// @access  Private
const deleteDelivery = asyncHandler(async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);

  if (delivery) {
    await delivery.remove();
    res.json({ message: 'Delivery removed' });
  } else {
    res.status(404);
    throw new Error('Delivery not found');
  }
});

export {
  getDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  deleteDelivery,
};