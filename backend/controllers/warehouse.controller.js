import Warehouse from '../models/Warehouse.model.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all warehouses
// @route   GET /api/warehouses
// @access  Public
const getWarehouses = asyncHandler(async (req, res) => {
  const warehouses = await Warehouse.find({});
  res.json(warehouses);
});

// @desc    Fetch single warehouse
// @route   GET /api/warehouses/:id
// @access  Public
const getWarehouseById = asyncHandler(async (req, res) => {
  const warehouse = await Warehouse.findById(req.params.id);

  if (warehouse) {
    res.json(warehouse);
  } else {
    res.status(404);
    throw new Error('Warehouse not found');
  }
});

// @desc    Create a warehouse
// @route   POST /api/warehouses
// @access  Private/Admin
const createWarehouse = asyncHandler(async (req, res) => {
  const { name, address, capacity, currentStock } = req.body;

  const warehouseExists = await Warehouse.findOne({ name });

  if (warehouseExists) {
    res.status(400);
    throw new Error('Warehouse already exists');
  }

  const warehouse = new Warehouse({
    name,
    address,
    capacity,
    currentStock,
  });

  const createdWarehouse = await warehouse.save();
  res.status(201).json(createdWarehouse);
});

// @desc    Update a warehouse
// @route   PUT /api/warehouses/:id
// @access  Private/Admin
const updateWarehouse = asyncHandler(async (req, res) => {
  const { name, address, capacity, currentStock } = req.body;

  const warehouse = await Warehouse.findById(req.params.id);

  if (warehouse) {
    warehouse.name = name || warehouse.name;
    warehouse.address = address || warehouse.address;
    warehouse.capacity = capacity || warehouse.capacity;
    warehouse.currentStock = currentStock || warehouse.currentStock;

    const updatedWarehouse = await warehouse.save();
    res.json(updatedWarehouse);
  } else {
    res.status(404);
    throw new Error('Warehouse not found');
  }
});

// @desc    Delete a warehouse
// @route   DELETE /api/warehouses/:id
// @access  Private/Admin
const deleteWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await Warehouse.findById(req.params.id);

  if (warehouse) {
    await warehouse.remove();
    res.json({ message: 'Warehouse removed' });
  } else {
    res.status(404);
    throw new Error('Warehouse not found');
  }
});

export {
  getWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
};