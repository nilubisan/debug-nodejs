const router = require("express").Router();
const { sequelize, DataTypes } = require("../db");
const Game = require("../models/game")(sequelize, DataTypes);
router.get("/all", (req, res) => {
  Game.findAll({ where: { owner_id: req.user.id } }).then(
    (data) => {
      res.status(200).json({
        games: data,
        message: "Data fetched.",
      });
    },
    (err) => {
      res.status(500).json({
        message: err,
      });
    }
  );
});

router.get("/:id", (req, res) => {
  Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } }).then(
    (game) => {
      res.status(200).json({
        game: game,
      });
    },
    (err) => {
      res.status(500).json({
        message: err,
      });
    }
  );
});

router.post("/create", (req, res) => {
  Game.create({
    title: req.body.game.title,
    owner_id: req.user.id,
    studio: req.body.game.studio,
    esrb_rating: req.body.game.esrb_rating,
    user_rating: req.body.game.user_rating,
    have_played: req.body.game.have_played,
  }).then(
    (game) => {
      res.status(200).json({
        game: game,
        message: "Game created.",
      });
    },
    (err) => {
      res.status(500).send(err.message);
    }
  );
});

router.put("/update/:id", (req, res) => {
  Game.update(
    {
      title: req.body.game.title,
      studio: req.body.game.studio,
      esrb_rating: req.body.game.esrb_rating,
      user_rating: req.body.game.user_rating,
      have_played: req.body.game.have_played,
    },
    {
      where: {
        id: req.params.id,
        owner_id: req.user.id,
      },
    }
  ).then(
    (response) => {
      if (response[0] === 0) {
        res.status(404).json({
          message: "Data not found.",
        });
      } else {
        res.status(200).json({
          message: "Successfully updated.",
        });
      }
    },
    (err) => {
      res.status(500).json({
        message: err.message,
      });
    }
  );
});

router.delete("/remove/:id", (req, res) => {
  return Game.findOne({
    where: { id: req.params.id, owner_id: req.user.id },
  }).then(
    (gameModel) => {
      if (gameModel === null) {
        res.status(404).json({
          message: "Data not found.",
        });
      } else {
        Game.destroy({
          where: {
            id: req.params.id,
            owner_id: req.user.id,
          },
        }).then(
          function successDelete() {
            res.status(200).json({
              message: "Successfully deleted",
            });
          },
          function deleteFail(err) {
            res.status(500).json({
              error: err.message,
            });
          }
        );
      }
    },
    (err) => {
      res.status(500).json({
        error: err.message,
      });
    }
  );
});

module.exports = router;
