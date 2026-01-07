const Boom = require('@hapi/boom');

const isAdmin = (request, h) => {
    const user = request.auth.credentials;

    if (!user) {
        throw Boom.unauthorized('Not authenticated');
    }

    if (user.role !== 'admin') {
        throw Boom.forbidden('Admin access required');
    }

    return h.continue;
};

module.exports = { isAdmin };