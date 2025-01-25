const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: [true, 'Task name is required'],
        },
        description: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
