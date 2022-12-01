import express from "express";

import { addUser, getUsers, login, UserByEmail, deleteUser } from "@controllers/users/usersController";


const usersRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: list of users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *       500:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *
 *
 */
usersRouter.route("/users").get(getUsers);


/**
 * @swagger
 * /user:
 *   post:
 *     summary: add user
 *     tags: [users]
 *     requestBody:
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *       500:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *
 *
 */
usersRouter.route("/user").post(addUser);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: user login 
 *     tags: [users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *       500:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *
 *
 */
usersRouter.route("/login").post(login);

/**
 * @swagger
 * /userByEmail:
 *   get:
 *     summary: list of users
 *     tags: [users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *       500:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *
 *
 */
usersRouter.route("/userByEmail").get(UserByEmail);

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: delete user
 *     tags: [users]
 *     parameters:
 *     - in: query
 *       name: firstname
 *       required: false
 *       schema:
 *        type: string
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *       500:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *
 *
 */
usersRouter.route("/user").delete(deleteUser);

export { usersRouter };
