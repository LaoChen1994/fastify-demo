import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
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
    Association,
} from 'sequelize'
import { ModelInit, Noop } from '../typings';

import Article from "./Article";
import Tag from "./Tag";


export default class User extends Model<
    InferAttributes<User, {
        omit: 'articles' | 'tags'
    }>,
    InferCreationAttributes<User, {
        omit: 'articles' | 'tags'
    }>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string | null;
    declare password: string;
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date>

    declare articles: NonNullable<Article[]>;

    declare tags: NonNullable<Tag[]>

    declare getArticles: HasManyGetAssociationsMixin<Article>;
    // 在给一篇已存在的文章加上ownerId
    declare addArticle: HasManyAddAssociationMixin<Article, number>;
    declare addArticles: HasManyAddAssociationsMixin<Article, number>;
    declare updateArticles: HasManySetAssociationsMixin<Article, number>;
    declare deleteArticle: HasManyRemoveAssociationMixin<Article, number>;
    declare deleteArticles: HasManyAddAssociationsMixin<Article, number>;
    declare hasArticle: HasManyHasAssociationMixin<Article, number>;
    declare hasArticles: HasManyHasAssociationsMixin<Article, number>;
    declare countArticles: HasManyCountAssociationsMixin;
    // 新建一篇文章，并和当前的用户关联
    declare createArticle: HasManyCreateAssociationMixin<Article, 'ownerId'>

    declare getTags: HasManyGetAssociationsMixin<Tag>;
    declare addTag: HasManyAddAssociationMixin<Tag, number>;
    declare addTags: HasManyAddAssociationsMixin<Tag, number>;
    declare updateTags: HasManySetAssociationsMixin<Tag, number>;
    declare deleteTag: HasManyRemoveAssociationMixin<Tag, number>;
    declare deleteTags: HasManyAddAssociationsMixin<Tag, number>;
    declare hasTag: HasManyHasAssociationMixin<Tag, number>;
    declare hasTags: HasManyHasAssociationsMixin<Tag, number>;
    declare countTags: HasManyCountAssociationsMixin;
    declare createTag: HasManyCreateAssociationMixin<Tag, 'ownerId'>

    declare static associations: {
        articles: Association<Article, User>
        tags: Association<Tag, User>
    }
}

export const init: ModelInit = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    }, {
        tableName: 'users',
        sequelize,
    })
}

export const buildAssociation: Noop = () => {
    User.hasMany(Article, {
        sourceKey: 'id',
        foreignKey: 'ownerId',
        as: 'articles'
    })

    User.belongsToMany(Tag, {
        through: 'UserTag'
    });
}
