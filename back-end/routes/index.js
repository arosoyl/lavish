const authRoute = require('./authRoute.js');
const eventsRoute = require('./eventsRoute.js');
const experiencesRoute = require('./experiencesRoute.js');
const reportsRoute = require('./reportsRoute.js');

function routes(app) {
    app.use('/api/auth', authRoute);

    app.use('/api/user', userRoute);

    app.use('/api/events',eventsRoute);

    app.use('/api/experiences',experiencesRoute);

    app.use('/api/reports', reportsRoute);
}
module.exports = routes;