const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */

/**
 * POST route template
 */
router.post("/", (req, res) => {
  const newExpense = req.body;
  const userId = req.user.id;
  const sqlText = `
    INSERT INTO "expenses" ("categoryId", "userId", "budget_id", "amount", "name")
    VALUES ($1, $2, $3, $4, $5)
  `;
  // console.log("in expense post request");

  pool
    .query(sqlText, [
      newExpense.categoryId,
      userId,
      newExpense.budgetId,
      newExpense.amount,
      newExpense.name,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Post request for new expense failed: ", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  const idToDelete = req.params.id;
  const sqlText = `
    DELETE FROM "expenses" WHERE "id" = $1
  `;

  pool
    .query(sqlText, [idToDelete])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Delete request for expense failed:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
