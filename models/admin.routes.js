const express = require('express');
const router = express.Router();

const userAuth = require('../auth/userAuth');
const isAuth = require('../auth/auth');

const Authentication = require('./Authentication/authentication.routes');
const ResetCode = require('./ResetCode/resetCode.routes');
const Type = require('./Types/type.routes');
const Construction = require('./Constructions/construction.routes');
const Image = require('./Images/image.routes');
const User = require('./Users/user.routes');

router.use('/auth', Authentication)

router.use('/reset', ResetCode)

router.use('/type', isAuth, Type);

router.use('/construction', isAuth, Construction);

router.use('/image', userAuth, Image);

router.use('/user', userAuth, User);



router.use('/', ( req, res ) => {
  res.status(404).send();
});

module.exports = router;