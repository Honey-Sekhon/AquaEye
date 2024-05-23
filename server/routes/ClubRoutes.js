const express = require('express');
const router = express.Router();
const clubController = require('../controllers/ClubController');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');

router.post('/', auth, rbac('superAdmin'), clubController.createClub);
router.get('/', auth, rbac('superAdmin'), clubController.getAllClubs);
router.get('/:id', auth, rbac('superAdmin'), clubController.getClubById);
router.put('/:id', auth, rbac('superAdmin'), clubController.updateClubById);
router.delete('/:id', auth, rbac('superAdmin'), clubController.deleteClubById);
router.post('/:clubId/assign-tokens', auth, rbac('admin'), clubController.assignTokens);

module.exports = router;
