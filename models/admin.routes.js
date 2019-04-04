const express = require('express');
const router = express.Router();

const userAuth = require('../auth/userAuth');
const isAuth = require('../auth/auth');

const Authentication = require('./Authentication/authentication.routes');
const ResetCode = require('./ResetCode/resetCode.routes');
const Type = require('./Types/type.routes');
const Service = require('./Services/service.routes');
const Construction = require('./Constructions/construction.routes');
const Image = require('./Images/image.routes');
const User = require('./Users/user.routes');
const Mail = require('./Mails/mail.routes');

router.use('/auth', Authentication)

router.use('/reset', ResetCode)

router.use('/type', isAuth, Type);

router.use('/service', isAuth, Service);

router.use('/construction', isAuth, Construction);

router.use('/image', userAuth, Image);

router.use('/user', userAuth, User);

router.use('/mail', Mail);

router.use('/', ( req, res ) => {
  res.status(404).send();
});

module.exports = router;