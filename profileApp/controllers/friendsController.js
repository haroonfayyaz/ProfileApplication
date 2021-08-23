const { modelsObject } = require("../models");
const { Op } = require("sequelize");

const friends = modelsObject["friends"];
module.exports = {

    createFriend: async(req, res, next) => {
        await friends.create(req.body).then((friend) => {
            res.send(friend);
        }).catch((err) => {
            next(err);
        })

    },

    fetchAllFriendsData: async(req, res, next) => {
        await friends.findAll({
            raw: true,
            attributes: { exclude: ['created_at', 'updated_at'] }
        }).then((friend) => {
            res.send(friend);
        }).catch((err) => {
            next(err);
        })
    },

    fetchFriendById: async(req, res) => {
        const friendId = req.params.friendId;
        const result = await friends.findOne({
            where: { id: friendId },
            raw: true,
            attributes: { exclude: ['created_at', 'updated_at'] }
        });
        res.send(result);
    },

    deleteFriend: async(req, res, next) => {
        const id = req.params.id;
        await friends.destroy({
            where: { id }
        }).then((_) => {
            res.sendStatus(200);
        }).catch((err) => next(err));
    }
};