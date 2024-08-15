import express from 'express';
import { authenticated } from '../middlewares/authenticated.js';
import { checkHasRole } from '../middlewares/hasRole.js';
import { getUsers, getRoles, editUserRole, deleteUser, getMe } from '../controllers/user.js';
import { mapUser } from '../helpers/mapUser.js';
import * as ROLES from '../constants/roles.js';


export const router = express.Router({ mergeParams: true })

router.get('/', authenticated, checkHasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) })
})

router.get('/me', authenticated, async (req, res) => {
  const user = await getMe(req.user.id);

  res.send({ data: mapUser(user) })
})

router.get('/roles', authenticated, checkHasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = await getRoles();

  res.send({ data: roles })
})

router.patch('/:id', authenticated, checkHasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await editUserRole(req.params.id, {
    role: req.body.roleId
  })

  res.send({ data: mapUser(newUser) })
})

router.delete('/:id', authenticated, checkHasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id)

  res.send({ error: null })
})