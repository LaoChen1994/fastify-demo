import fp from 'fastify-plugin';
import {Sequelize} from 'sequelize';
import {parse} from 'yaml';
import Fs from 'fs'
import {resolve} from 'path'
import * as console from "console";
import * as Models from '../model'

const isProduction = process.env.NODE_ENV === 'production';

export default fp(async (server) => {
    try {
        console.log('isProd =>', isProduction)
        const configPath = isProduction ? resolve(__dirname, '../../../config.yaml') : resolve(__dirname, '../../config.yaml');

        const config = parse(Fs.readFileSync(configPath, 'utf8'));

        const sequelize = new Sequelize({
            dialect: 'mysql',
            ...config.db,
            logging: console.log
        });

        await sequelize.authenticate();

        for (const modelName in Models) {
            const model = Models[modelName];

            if (model.init) {
                model.init(sequelize)
            }

            if (model.default && model.default.sync) {
                await model.default.sync({alter: true})
            }
        }

        console.log('Connection has been established successfully.');

        server.decorate("db", sequelize)
    } catch (e) {
        console.log('connect error => ', e)
    } finally {

    }
});
