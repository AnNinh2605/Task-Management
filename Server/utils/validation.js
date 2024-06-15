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
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .optional(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .optional(),

            userId: Joi.string().trim().min(1).required().allow(null).messages({
                'string.base': 'userId must be a string',
                'string.empty': 'userId cannot be an empty string',
                'string.min': 'userId must be at least 1 character long',
                'any.required': 'userId is required',
                'any.allowOnly': 'userId cannot be null or undefined'
            })
    })

    const { error } = schema.validate(taskData);
    if (error) {
        console.error('Validation error:', error.details[0].message);

        return { error: "Invalid input data. Please check and try again." }
    }
}

export default validate;