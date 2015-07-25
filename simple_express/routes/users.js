var express = require('express');
var router = express.Router();
var users = require('../controllers/users.server.controller');

router.route('/')
	.get(users.list)
	.post(users.create);
	
router.route('/random')
	.get(users.createRandom);
	
router.route('/username/:username')
	.get(users.read)
	.put(users.update)
	.delete(users.remove);
	
router.param('username', users.findByUserName);

router.get('/male', users.findMale);

router.route('/checkpwd/:username')
	.get(users.checkPwd)

module.exports = router;