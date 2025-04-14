const express = require('express');
const register = require('../controller/register');
const accountDetail = require('../controller/accountDetail');
const logout = require('../controller/logout');
const updateAccDetail = require('../controller/updateAccDetail');
const login = require('../controller/login');
const changePassword = require('../controller/changePassword');
const getAllCategories = require('../controller/getAllCategories');
const getSubCategoryByCategoryId = require('../controller/getSubCategoryByCategoryId');
const getAllCards = require('../controller/getAllCards');
const getSubCategoryById = require('../controller/getSubCategoryById');
const getCardById = require('../controller/getCardById');
const saveCardSave = require('../controller/saveCardSave');
const getCardSaveByUserId = require('../controller/getCardSaveByUserId');
const getCardsBySubCategory = require('../controller/getCardsBySubCategory');
const getCardSaveById = require('../controller/getCardSaveById');
const deleteCardSave = require('../controller/deleteCardSave');
const googleLogin = require('../controller/googleLogin');

const router = express.Router();
router.delete('/cardsave/:id', deleteCardSave)
router.get('/cardsave/:id', getCardSaveById);
router.get('/cards-by-subcategory/:name', getCardsBySubCategory);
router.get('/cardsave-user/:iduser', getCardSaveByUserId);
router.post('/savecard', saveCardSave);
router.get('/card/:id', getCardById);
router.get('/subcategory/:id', getSubCategoryById);
router.get('/all-cards', getAllCards);
router.get('/subcategories/:categoryId', getSubCategoryByCategoryId);
router.get('/all-categories', getAllCategories);
router.post('/register', register);
router.get('/acc-details', accountDetail);
router.post('/logout', logout);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/update-acc', updateAccDetail);
router.post('/changepass', changePassword);
module.exports = router;