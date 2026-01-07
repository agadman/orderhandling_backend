const User = require('../models/user.model');
const Jwt = require('@hapi/jwt');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.getAllUsers = async (request, h) => {
    try {
        const users = await User.find();
        return h.response(users).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
}

exports.getUserById = async (request, h) => {
    try {
        const user = await User.findById(request.params.id);
        return h.response(user).code(200);

    } catch (error) {
        return h.response(error).code(500);
    }
}

exports.createUser = async (request, h) => {
  try {
    const { username, email, password } = request.payload;

      // Default: alltid user
    let role = 'user';

    // Endast admin får sätta admin
    if (request.auth?.isAuthenticated && request.auth.credentials?.role === 'admin') {
      role = request.payload.role || 'user';
    }

    const user = new User({ username, email, password, role }); 
    const savedUser = await user.save();

    return h.response({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
      createdAt: savedUser.createdAt
    }).code(201);

  } catch (error) {
    console.error(error);
    return h.response({ message: error.message }).code(500);
  }
};

exports.deleteUser = async (request, h) => {
    try {
        await User.findByIdAndDelete(request.params.id);
        return h.response().code(204);
    } catch (error) {
        return h.response(error).code(500);
    }
}

exports.loginUser = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const user = await User.findOne({ email }).select('+password'); 
    if (!user) {
      return h.response({ message: 'Ogiltig e-post eller lösenord' }).code(401);
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return h.response({ message: 'Ogiltig e-post eller lösenord' }).code(401);
    }

    const token = generateToken(user);

    return h
      .response({
        message: 'Inloggning lyckades',
        user: { id: user._id, username: user.username, email: user.email, role: user.role }
      })
      .state('jwt', token);
  } catch (error) {
    console.error(error);
    return h.response({ message: error.message }).code(500);
  }
};

exports.me = async (request, h) => {
  return h.response({
    user: request.auth.credentials
  }).code(200);
};

const generateToken = (user) => {
  return Jwt.token.generate(
    {
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        username: user.username
      }
    },
    { key: process.env.JWT_SECRET, algorithm: 'HS256' },
    { ttlSec: 24 * 60 * 60 }
  );
};