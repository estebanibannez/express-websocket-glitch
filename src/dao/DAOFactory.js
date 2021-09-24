class DAOFactory {

    static getPersistence(entity, type) {
        try {
            const persistence = require(`./${entity}/${entity}.${type}`);
            return persistence;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}

module.exports = DAOFactory;