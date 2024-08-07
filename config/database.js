import { Sequelize } from "sequelize"

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('pmst_seasonfeet', 'pmst_seasonfeet', '32aada465db8f7c62ec472a75b687672210b3d43', {
    host: 'ne8.h.filess.io',
    dialect: 'mysql',
    port: 3307
});
export const connection = async () => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default sequelize;