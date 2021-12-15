// router with express connection
const express = require('express');
const router = express.Router();

// connect routers
const usersRouter = require('./users');
const worldsRouter = require('./worlds');
const imagesRouter = require('./images');
const authRouter = require('./auth');

// use routers
router.use('/users', usersRouter);
router.use('/worlds', worldsRouter);
router.use('/images', imagesRouter);
router.use('/auth', authRouter);

// no entry route
// router.use('/', (req,res)=>{
//     res.status(403).json({"error":"forbidden"});
// });

// export router
module.exports = router;
