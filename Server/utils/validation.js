import Joi from 'joi';

const validate = (dataInput) => {
    const checkCondition = {
        // name: task name
        // trim & min to check when the field includes the entire space bar
        name: Joi.string().required().trim().min(1),

        description: Joi.string().required().trim().min(1),

        username: Joi.string().required().trim().min(1),

        email: Joi.string().required().trim().pattern(new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$')),

        password: Joi.string().required().trim().min(6).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),

        userId: Joi.string().required().trim().min(1),

        date: Joi.date().required(),

        completed: Joi.boolean().required(),

        important: Joi.boolean().required()
    }

    // create checkApply object bases on dataInput and checkCondition
    const checkApply = {};
    for (const key in dataInput) {
        if (checkCondition[key]) {
            checkApply[key] = checkCondition[key];
        }
    }

    const schema = Joi.object(checkApply);

    const { error, value } = schema.validate(dataInput);

    if (error) {
        console.error('Validation error:', error.details[0].message);

        return {
            status: "error",
            message: "Invalid input data. Please check and try again."
        }
    }
    else {
        return value;
    }
}

export default validate;