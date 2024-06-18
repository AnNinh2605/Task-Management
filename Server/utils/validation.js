import Joi from 'joi';

const validate = (taskData) => {
    const schema = Joi.object({
        // name: task name
        name: Joi.string()
            .invalid(null)
            .optional(),

        description: Joi.string()
            .invalid(null)
            .optional(),

        username: Joi.string()
            .invalid(null)
            .optional(),

        email: Joi.string()
            .pattern(new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$'))
            .optional(),

        password: Joi.string()
            .min(6)
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .optional(),

        userId: Joi.string().trim().min(1).optional().empty('').messages({
            'string.base': 'userId must be a string',
            'string.empty': 'userId cannot be an empty string',
            'string.min': 'userId must be at least 1 character long',
            'any.required': 'userId is required',
            'any.allowOnly': 'userId cannot be null or undefined'
        }),

        date: Joi.date()
            .optional(),

        completed: Joi.boolean()
            .optional(),

        important: Joi.boolean()
            .optional()
    })

    const { error } = schema.validate(taskData);
    if (error) {
        console.error('Validation error:', error.details[0].message);

        return {
            status: "error",
            message: "Invalid input data. Please check and try again."
        }
    }
}

export default validate;