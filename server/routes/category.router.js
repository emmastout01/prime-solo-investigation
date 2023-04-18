const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/:id", (req, res) => {
  const groupId = req.params.id;
  const sqlText = `
    SELECT "categories".name AS "categoryName", "categories"."budgetAmount" FROM "budget"
    JOIN "categories" ON "categories"."budgetId" = "budget".id
    JOIN "groups" ON "groups"."budgetId" = "budget".id
    WHERE "groups".id = $1;
  `;

  pool
    .query(sqlText, [groupId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get request for user budget failed: ", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  const newCategory = req.body;
  console.log(newCategory);
  const sqlText = `INSERT INTO "categories" ("name", "budgetAmount", "budgetId")
  VALUES ($1, $2, $3);`;

  pool
    .query(sqlText, [newCategory.name, newCategory.amount, newCategory.budgetId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get request for user budget failed: ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
