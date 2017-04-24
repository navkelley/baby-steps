exports.DATABASE_URL = 'mongodb://localhost/baby-steps-dev'
/*process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://admin:test123@ds139198.mlab.com:39198/baby-steps' :
                            'mongodb://localhost/baby-steps-dev');*/
exports.PORT = process.env.PORT || 8080;