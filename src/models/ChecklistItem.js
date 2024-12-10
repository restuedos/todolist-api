import mongoose from 'mongoose';

const checklistItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('ChecklistItem', checklistItemSchema);