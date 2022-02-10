import joi from "joi";

export const insertBody = joi.object({
	productId: joi.number().required(),
	amount: joi.number().required(),
})

export const updateBody = joi.object({
	cartId: joi.string().required(),
	productId: joi.number().required(),
	amount: joi.number().required(),
})