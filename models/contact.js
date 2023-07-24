const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");

const contactSchema = new Schema({
		name: {
				type: String,
				requred: true,
				},
		email: {
				type: String,
				// requred: true,
				},
		phone: {
				type: String,
				// requred: true,
				},
		favorite: {
				type: Boolean,
				default: false,
				},	
}, {versionKey: false})

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
	name: Joi.string().required().messages({
	  "any.required": "missing required name field",
	}),
	email: Joi.string().required().messages({
	  "any.required": "missing required email field",
	}),
	phone: Joi.string().required().messages({
	  "any.required": "missing required phone field",
	}),
	favorite: Joi.boolean().messages()
 });

 const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required().messages({
		"any.required": "missing required favorite field"
	})
 })

const schemas = {
	addSchema,
	updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
	Contact,
	schemas,
};