import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize
} from "sequelize";
import User from './User'

export default class Address extends Model<
    InferAttributes<Address>,
    InferCreationAttributes<Address>
> {
    declare userId: ForeignKey<User['id']>;
    declare address: string;

    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

export const init = (sequelize: Sequelize) => {
    Address.init(
        {
            address: {
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            tableName: 'address',
            sequelize // passing the `sequelize` instance is required
        }
    );
}

export const buildAssociation = () => {
    Address.belongsTo(User, { targetKey: 'id' });
}
