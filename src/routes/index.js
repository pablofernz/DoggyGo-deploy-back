const { Router } = require('express');
// Importar todos los routers;

const userRouter = require ("./userRouter");
const dogRouter = require ("./dogRouter");
const walkRouter = require ("./walkRouter");
// const reviewRouter = require ("./reviewRouter");
const locationRouter = require ("./locationRouter");

const router = Router();

// Configurar los routers


router.use("/user", userRouter);
router.use("/dog", dogRouter);
router.use("/walk", walkRouter);
// router.use("/review", reviewRouter);
router.use("/location", locationRouter);


module.exports = router