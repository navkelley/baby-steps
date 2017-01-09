exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://admin:babysteps1@ds139198.mlab.com:39198/baby-steps' :
                            'mongodb://localhost/baby-steps-dev');
exports.PORT = process.env.PORT || 8081;