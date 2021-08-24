const { modelsObject } = require("../models");
const { Op } = require("sequelize");

const messages = modelsObject["messages"];
module.exports = {
  createMessage: async (req, res, next) => {
    await messages
      .create(req.body)
      .then((message) => {
        res.send(message);
      })
      .catch((err) => {
        next(err);
      });
  },

  fetchAllMessagesData: async (req, res, next) => {
    await messages
      .findAll({
        raw: true,
        attributes: { exclude: ["created_at", "updated_at"] },
      })
      .then((message) => {
        res.send(message);
      })
      .catch((err) => {
        next(err);
      });
  },

  fetchMessageById: async (req, res) => {
    const messageId = req.params.id;
    const result = await messages.findOne({
      where: { id: messageId },
      raw: true,
      attributes: { exclude: ["created_at", "updated_at"] },
    });
    res.send(result);
  },

  deleteMessage: async (req, res, next) => {
    const id = req.params.id;
    await messages
      .destroy({
        where: { id },
      })
      .then((_) => {
        res.sendStatus(200);
      })
      .catch((err) => next(err));
  },
  updateMessage: async (req, res, next) => {
    const id = req.params.id;
    await messages
      .update(req.body, {
        where: { id },
      })
      .then((response) => {
        if (response.length > 0) {
          module.exports.fetchMessageById(req, res);
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  },
};
