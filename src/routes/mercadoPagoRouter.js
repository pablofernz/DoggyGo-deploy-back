const { Router } = require("express");
const { walkPayment } = require("../handlers/mercadoPagoHandler");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/", walkPayment);

module.exports = mercadoPagoRouter;
