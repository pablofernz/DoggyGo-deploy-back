require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: `${ACCESS_TOKEN}`,
});

const walkPayment = (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://127.0.0.1:5173/home/success",
      failure: "http://127.0.0.1:5173",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      // init_point -> es una url donde voy a poder realizar mi pago
      res.json({ id: response.body.id, init_point: response.body.init_point });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error al crear preferencia de pago" });
    });
};

module.exports = {
  walkPayment,
};
