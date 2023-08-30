const { Router } = require('express'); 

// Importar todos los routers;

const userRouter = require ("./userRouter");
const dogRouter = require ("./dogRouter");
const walkRouter = require ("./walkRouter");
// const reviewRouter = require ("./reviewRouter");
const locationRouter = require ("./locationRouter");
// const mercadopagoRouter = require ("./mercadoPagoRouter");

const router = Router();

// Configurar los routers

router.use("/user", userRouter);
router.use("/dog", dogRouter);
router.use("/walk", walkRouter);
// router.use("/review", reviewRouter);
router.use("/location", locationRouter);
// router.use("/payment", mercadopagoRouter);


module.exports = router