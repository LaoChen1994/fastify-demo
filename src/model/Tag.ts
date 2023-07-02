import {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    ForeignKey,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToSetAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyHasAssociationsMixin,
    BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin, Sequelize, DataTypes, Association
} from 'sequelize'
import User from "./User";
import Article from "./Article";

export default class Tag extends Model<
    InferAttributes<Tag, { omit: 'owner' | 'articles'}>,
    InferCreationAttributes<Tag, { omit: 'owner' | 'articles'}>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare parentId: ForeignKey<Tag['id']>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date>

    declare ownerId: ForeignKey<User['id']>;
    declare owner: NonNullable<User[]>

    declare articles: NonNullable<Article[]>
    declare addArticle: BelongsToManyAddAssociationMixin<Article, number>;
    declare addArticles: BelongsToManyGetAssociationsMixin<Article>;
    declare updateArticle: BelongsToSetAssociationMixin<Article, number>;
    declare updateArticles: BelongsToManySetAssociationsMixin<Article, number>;
    declare deleteArticle: BelongsToManyRemoveAssociationMixin<Article, number>;
    declare deleteArticles: BelongsToManyRemoveAssociationsMixin<Article, number>;
    declare hasArticle: BelongsToManyHasAssociationMixin<Article, number>;
    declare hasArticles: BelongsToManyHasAssociationsMixin<Article, number>;
    declare countArticles: BelongsToManyCountAssociationsMixin;
    declare createArticle: BelongsToManyCreateAssociationMixin<Article>

    declare static associations: {
        owner: Association<User, Tag>
        articles: Association<Article, Tag>
    }
}

export const init = (sequelize: Sequelize) => {
    Tag.init({
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
            primaryKey: true,
        },
        parentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'tag'
    })
}

export const buildAssociation = () => {
    Tag.belongsToMany(User, {
        through: 'UserTag'
    })

    Tag.belongsToMany(Article, {
        through: 'ArticleTag'
    })
}
