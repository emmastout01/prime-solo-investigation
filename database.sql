-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(255) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"avatar" VARCHAR(800)
);

CREATE TABLE "groups"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(500),
	"budgetId" INT REFERENCES "budget" NOT NULL
);

CREATE TABLE "user_groups" (
	"id" SERIAL PRIMARY KEY,
	"userId" INT REFERENCES "user" NOT NULL,
	"groupsId" INT REFERENCES "groups" NOT NULL
);

CREATE TABLE "budget" (
	"id" SERIAL PRIMARY KEY,
	"totalBudget" INT
);

CREATE TABLE "expenses" (
	"id" SERIAL PRIMARY KEY,
	"categoryId" INT REFERENCES "category",
	"userId" INT REFERENCES "user",
	"budget_id" INT REFERENCES "budget",
	"amount" INT,
	"name" VARCHAR(255)
);

CREATE TABLE "categories" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255),
	"budgetAmount" INT
);

INSERT INTO "user" ("username", "password", "avatar")
VALUES ('TESTUSER', 'TESTPW', 'TEST');

INSERT INTO "budget" ("totalBudget")
VALUES ('2000');

INSERT INTO "groups" ("name", "budgetId")
VALUES ('Test group', 1);

INSERT INTO "user_group" ("userId", "groupsId")
VALUES(1, 1), (2, 1);

-- possibly pass this category a reference to the budget to distinguish which budgets have which categories
INSERT INTO "category" ("name", "budgetAmount")
VALUES ('Food', 400), ('Bills', 4000), ('Entertainment', 300);

INSERT INTO "expenses" ("categoryId", "userId", "budget_id", "amount", "name")
VALUES 
(1, 1, 1, 40, 'Chipotle'),
(1, 2, 1, 60, 'Thai'),
(2, 2, 1, 600, 'Car Payment');

--test queries
--select all users in given group
SELECT "user".username FROM "user_group"
JOIN "user" ON "user".id = user_group."userId"
JOIN "groups" ON "groups".id = user_group."groupsId"
WHERE user_group."groupsId" = 1;

--join all
SELECT * FROM "user_group"
JOIN "user" ON "user".id = user_group."userId"
JOIN "groups" ON "groups".id = user_group."groupsId"
JOIN "budget" ON "budget".id = "groups"."budgetId"
JOIN "expenses" ON "expenses".budget_id = "budget".id
JOIN "category" ON "category".id = expenses."categoryId";

-- select users expenses
SELECT "user".username, "expenses".name ,"expenses".amount FROM "user" 
JOIN "expenses" ON "expenses"."userId" = "user".id
JOIN "category" ON "category".id = expenses."categoryId"
WHERE "user".id = 2;