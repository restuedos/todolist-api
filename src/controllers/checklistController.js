import { AppError } from '../utils/errorHandler.js';
import Checklist from '../models/Checklist.js';
import ChecklistItem from '../models/ChecklistItem.js';

export const getAllChecklists = async (req, res, next) => {
  try {
    const checklists = await Checklist.find({ user: req.userId });
    res.json(checklists);
  } catch (error) {
    next(error);
  }
};

export const getChecklist = async (req, res, next) => {
  try {
    const checklist = await Checklist.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!checklist) {
      throw new AppError('Checklist not found', 404);
    }

    res.json(checklist);
  } catch (error) {
    next(error);
  }
};

export const createChecklist = async (req, res, next) => {
  try {
    const { name } = req.body;
    const checklist = await Checklist.create({
      name,
      user: req.userId,
    });

    res.status(201).json(checklist);
  } catch (error) {
    next(error);
  }
};

export const deleteChecklist = async (req, res, next) => {
  try {
    const checklist = await Checklist.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!checklist) {
      throw new AppError('Checklist not found', 404);
    }

    // Delete all items in the checklist
    await ChecklistItem.deleteMany({ checklist: req.params.id });

    res.json({ message: 'Checklist deleted' });
  } catch (error) {
    next(error);
  }
};

// New Checklist Item Controllers
export const getChecklistItems = async (req, res, next) => {
  try {
    const checklist = await Checklist.findOne({
      _id: req.params.checklistId,
      user: req.userId,
    });

    if (!checklist) {
      throw new AppError('Checklist not found', 404);
    }

    const items = await ChecklistItem.find({ checklist: req.params.checklistId });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getChecklistItemById = async (req, res, next) => {
  try {
    const checklist = await Checklist.findOne({
      _id: req.params.checklistId,
      user: req.userId,
    });

    if (!checklist) {
      throw new AppError('Checklist not found', 404);
    }

    const item = await ChecklistItem.findOne({
      _id: req.params.checklistItemId,
      checklist: req.params.checklistId,
    });

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createChecklistItem = async (req, res, next) => {
  try {
    const checklist = await Checklist.findOne({
      _id: req.params.checklistId,
      user: req.userId,
    });

    if (!checklist) {
      throw new AppError('Checklist not found', 404);
    }

    const item = await ChecklistItem.create({
      itemName: req.body.itemName,
      checklist: req.params.checklistId,
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateChecklistItemStatus = async (req, res, next) => {
  try {
    const checklist = await Checklist.findOne({
      _id: req.params.checklistId,
      user: req.userId,
    });

    if (!checklist) {
      throw new AppError('Checklist not found', 404);
    }

    const item = await ChecklistItem.findOne({
      _id: req.params.checklistItemId,
      checklist: req.params.checklistId,
    });

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    item.status = !item.status;
    await item.save();

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const renameChecklistItem = async (req, res, next) => {
  try {
    const checklist = await Checklist.findOne({
      _id: req.params.checklistId,
      user: req.userId,
    });

    if (!checklist) {
      throw new AppError('Checklist not found', 404);
    }

    const item = await ChecklistItem.findOne({
      _id: req.params.checklistItemId,
      checklist: req.params.checklistId,
    });

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    item.itemName = req.body.itemName;
    await item.save();

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteChecklistItem = async (req, res, next) => {
  try {
    const checklist = await Checklist.findOne({
      _id: req.params.checklistId,
      user: req.userId,
    });

    if (!checklist) {
      throw new AppError('Checklist not found', 404);
    }

    const item = await ChecklistItem.findOneAndDelete({
      _id: req.params.checklistItemId,
      checklist: req.params.checklistId,
    });

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};