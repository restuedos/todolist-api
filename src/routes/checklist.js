import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../utils/validation.js';
import { auth } from '../middleware/auth.js';
import {
  getAllChecklists,
  createChecklist,
  deleteChecklist,
  getChecklistItems,
  createChecklistItem,
  getChecklistItemById,
  updateChecklistItemStatus,
  deleteChecklistItem,
  renameChecklistItem,
} from '../controllers/checklistController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Checklist:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     ChecklistItem:
 *       type: object
 *       required:
 *         - itemName
 *       properties:
 *         id:
 *           type: string
 *         itemName:
 *           type: string
 *         completed:
 *           type: boolean
 *         checklistId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

router.use(auth);

/**
 * @swagger
 * /api/checklists:
 *   get:
 *     summary: Get all checklists
 *     tags: [Checklists]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of checklists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checklist'
 */
router.get('/', getAllChecklists);

/**
 * @swagger
 * /api/checklists:
 *   post:
 *     summary: Create a new checklist
 *     tags: [Checklists]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Checklist created successfully
 */
router.post(
  '/',
  [body('name').trim().notEmpty().withMessage('Name is required')],
  validateRequest,
  createChecklist
);

/**
 * @swagger
 * /api/checklists/{id}:
 *   delete:
 *     summary: Delete a checklist
 *     tags: [Checklists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checklist deleted successfully
 */
router.delete('/:id', deleteChecklist);

/**
 * @swagger
 * /api/checklists/{checklistId}/item:
 *   get:
 *     summary: Get all items for a specific checklist
 *     tags: [Checklist Items]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: checklistId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of items for the checklist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChecklistItem'
 */
router.get('/:checklistId/item', getChecklistItems);

/**
 * @swagger
 * /api/checklists/{checklistId}/item/{checklistItemId}:
 *   get:
 *     summary: Get a specific checklist item
 *     tags: [Checklist Items]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: checklistId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: checklistItemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checklist item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChecklistItem'
 */
router.get('/:checklistId/item/:checklistItemId', getChecklistItemById);

/**
 * @swagger
 * /api/checklists/{checklistId}/item:
 *   post:
 *     summary: Create a new checklist item
 *     tags: [Checklist Items]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: checklistId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemName
 *             properties:
 *               itemName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Checklist item created successfully
 */
router.post(
  '/:checklistId/item',
  [body('itemName').trim().notEmpty().withMessage('Item Name is required')],
  validateRequest,
  createChecklistItem
);

/**
 * @swagger
 * /api/checklists/{checklistId}/item/{checklistItemId}:
 *   put:
 *     summary: Update the status of a checklist item
 *     tags: [Checklist Items]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: checklistId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: checklistItemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checklist item status updated
 */
router.put('/:checklistId/item/:checklistItemId', updateChecklistItemStatus);

/**
 * @swagger
 * /api/checklists/{checklistId}/item/rename/{checklistItemId}:
 *   put:
 *     summary: Rename a checklist item
 *     tags: [Checklist Items]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: checklistId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: checklistItemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemName
 *             properties:
 *               itemName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Checklist item renamed
 */
router.put(
  '/:checklistId/item/rename/:checklistItemId',
  [body('itemName').trim().notEmpty().withMessage('New name is required')],
  validateRequest,
  renameChecklistItem
);

/**
 * @swagger
 * /api/checklists/{checklistId}/item/{checklistItemId}:
 *   delete:
 *     summary: Delete a checklist item
 *     tags: [Checklist Items]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: checklistId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: checklistItemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checklist item deleted successfully
 */
router.delete('/:checklistId/item/:checklistItemId', deleteChecklistItem);

export default router;
