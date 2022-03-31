const mongoose = require('mongoose');


const dbConn = async() => {
    try {
        await mongoose.connect((`mongodb+srv://...`), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            sslValidate: false
        });

        console.info('DB Conected');
    } catch (error) {
        console.error(error);
        throw new Error('Error al intentar conectar a la db')
    }
};

module.exports = {
    dbConn,
}