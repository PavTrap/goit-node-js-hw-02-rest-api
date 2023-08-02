const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, isValidFavorite, authenticate } = require("../../middlewares");
const {schemas} = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);
router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);
router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addContact);
router.put("/:contactId", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);
router.patch("/:contactId/favorite", authenticate, isValidId, isValidFavorite(schemas.updateFavoriteSchema), ctrl.updateFavorite)
router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

module.exports = router;

// const express = require("express");
// const Joi = require("joi");

// const contacts = require("../../models/contacts");

// const { HttpError } = require("../../helpers");

// const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required().messages({
//     "any.required": "missing required name field",
//   }),
//   email: Joi.string().required().messages({
//     "any.required": "missing required email field",
//   }),
//   phone: Joi.string().required().messages({
//     "any.required": "missing required phone field",
//   }),
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//     // res.status(500).json({
//     //   message: "Server error",
//     // });
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//       // const error = new Error("Not found");
//       // error.status = 404;
//       // throw error;
//       // // return res.status(404).json({
//       // //   message: "Not found",
//       // // });
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//     // const { status = 500, message = "Server error" } = error;
//     // res.status(status).json({ message });
//     // // res.status(500).json({
//     // //  message: "Server error",
//     // // });
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     if (Object.keys(req.body).length === 0) {
//       throw HttpError(400, "missing fields");
//     }
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { contactId } = req.params;
//     const result = await contacts.updateContactById(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({
//       mesage: "Delete success",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
