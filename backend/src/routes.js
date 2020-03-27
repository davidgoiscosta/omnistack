const express = require("express");
const ongController = require("./controllers/ongController")
const incidentController = require("./controllers/incidentController")
const profileController = require("./controllers/profileController")
const sessionController = require("./controllers/sessionController")
const routes = express.Router();
const { celebrate, Segments, Joi  } = require('celebrate')

routes.post("/session", celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), sessionController.create)
routes.get("/incidents", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.list);

routes.get("/ongs", ongController.list)

routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),ongController.create);

routes.get("/profiles", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.listSpecific)


routes.post("/incidents", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}),incidentController.register)

routes.delete("/incidents/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete)

module.exports = routes;