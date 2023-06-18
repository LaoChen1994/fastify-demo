import {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    ForeignKey,
    DataTypes,
    Sequelize,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyHasAssociationsMixin, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin,
} from 'sequelize'

import User from './User'
import Tag from './Tag'


export default class Article extends Model<
    InferAttributes<Article, {omit: 'owner' | 'tags'}>,
    InferCreationAttributes<Article, {omit: 'owner' | 'tags'}>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare content: string;
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date>

    declare ownerId: ForeignKey<User['id']>
    declare owner: NonNullable<User>

    declare tags: NonNullable<Tag[]>
    declare getTags: BelongsToManyGetAssociationsMixin<Tag>;
    declare addTag: BelongsToManyAddAssociationMixin<Tag, number>;
    declare addTags: BelongsToManyAddAssociationsMixin<Tag, number>;
    declare updateTags: BelongsToManySetAssociationsMixin<Tag, number>;
    declare deleteTag: BelongsToManyRemoveAssociationMixin<Tag, number>;
    declare deleteTags: BelongsToManyRemoveAssociationsMixin<Tag, number>;
    declare hasTag: BelongsToManyHasAssociationMixin<Tag, number>;
    declare hasTags: BelongsToManyHasAssociationsMixin<Tag, number>;
    declare countTags: BelongsToManyCountAssociationsMixin;
    declare createTag: BelongsToManyCreateAssociationMixin<Tag>
}

export const init = (sequelize: Sequelize) => {
    Article.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(1024),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(4096),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'articles',
    })
}
