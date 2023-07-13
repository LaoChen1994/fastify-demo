import fp from 'fastify-plugin';
import {Sequelize} from 'sequelize';
import {parse} from 'yaml';
import Fs from 'fs'
import {resolve} from 'path'
import * as Models from '../model'
import { ModelInit, Noop } from '../typings';

const isProduction = process.env.NODE_ENV === 'production';

export default fp(async (server) => {
    try {
        const configPath = isProduction ? resolve(__dirname, '../../../config.yaml') : resolve(__dirname, '../../config.yaml');

        const config = parse(Fs.readFileSync(configPath, 'utf8'));

        const sequelize = new Sequelize({
            dialect: 'mysql',
            ...config.db,
            logging: console.log
        });

        await sequelize.authenticate();

        const inits: ModelInit[] = [];
        const buildAssociations: Noop[] = [];

        for (const modelName in Models) {
            const model = Models[modelName];

            if (!model) {
                continue;
            }

            const { init, buildAssociation } = model

            init && inits.push(init)
            buildAssociation && buildAssociations.push(buildAssociation)
        }

        for (const init of inits) {
            if (typeof init === 'function') {
                init(sequelize)
            }
        }

        for (const buildAssociation of buildAssociations) {
            if (typeof buildAssociation === "function") {
                buildAssociation()
            }
        }

        await sequelize.sync()

        server.decorate("db", sequelize)
    } catch (e) {
        console.log('connect error => ', e)
    } finally {

    }
});
