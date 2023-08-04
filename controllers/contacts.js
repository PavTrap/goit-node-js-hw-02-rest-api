
const {Contact} = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");


const listContacts = async (req, res, next) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 10, favorite = null} = req.query;
  const query = favorite ? { owner, favorite } : { owner };
  const skip = (page - 1) * limit;
  // const result = await Contact.find({owner}, "", {skip, limit}).populate("owner", "name email");
  const result = await Contact.find(query, "", {skip, limit});
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateContactById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
};

const updateFavorite = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    mesage: "Delete success",
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavorite:ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
