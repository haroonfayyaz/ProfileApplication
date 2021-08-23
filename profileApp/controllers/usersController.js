const { modelsObject } = require("../models");
const { Op } = require("sequelize");

const user = modelsObject["users"];
const friends = modelsObject["friends"];
const messages = modelsObject["messages"];
module.exports = {

    createUser: async(req, res, next) => {

        await user.create(req.body).then((user) => {
            res.send(user);
        }).catch((err) => {
            next(err);
        })

    },

    fetchAllUsersData: async(req, res, next) => {
        await user.findAll({
            raw: true,
            attributes: { exclude: ['created_at', 'updated_at'] }
        }).then((users) => {
            res.send(users);
        }).catch((err) => {
            next(err);
        })
    },

    fetchUserById: async(req, res) => {
        const userId = req.params.userId;
        const result = await user.findByPk(userId, {
            raw: true,
            attributes: { exclude: ['created_at', 'updated_at'] }
        });
        res.send(result);
    },

    deleteProfile: async(req, res, next) => {
        const id = req.params.id;
        await friends.destroy({
            where: {
                [Op.or]: [{ user_id1: id, user_id2: id }],
            },
        }).then(async(response) => {
            await user.destroy({
                where: { id },
            }).then((response) => {
                res.sendStatus(200).send(response);
            }).catch((err) => next(err))
        }).catch((err) => next(err));
    }
};