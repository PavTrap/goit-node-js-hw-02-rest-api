const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");



// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		match: emailRegexp,
		required: true,
	},
	password: {
		type: String,
		minlength: 6,
		required: true,
	},
	subscription: {
		type: String,
		enum: ["starter", "pro", "business"],
		default: "starter"
	 },
	 token: {
		type: String,
	 },
	 avatarURL: {
		type: String,
		required: true,
	 },
	 verify: {
		type: Boolean,
		default: false,
	 },
	 verificationToken: {
		type: String,
		required: [true, 'Verify token is required'],
	 }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError); 

const registerSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});
const verifyEmailSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required().messages({"any.required": "missing required email field"}),
});
const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required().messages({"any.required": "Missing field 'subscription'"}),
});


const schemas = {
	registerSchema,
	verifyEmailSchema,
	loginSchema,
	subscriptionSchema,
}
const User = model("user", userSchema)

module.exports = {
	User, 
	schemas,
};