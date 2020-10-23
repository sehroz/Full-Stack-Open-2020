require('express-async-errors')
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const users = await User.find({})

  if (!body.username || !body.password) {
    return response.status(204).json({
      error: 'username or password missing',
    })
  } else if (
    users.find(
      (user) => user.username.toLowerCase() === body.username.toLowerCase()
    )
  ) {
    return response.status(400).json({
      error: '`username` to be unique',
    })
  } else if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({
      error: 'username or password length is too short',
    })
  }

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
