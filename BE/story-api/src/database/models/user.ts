import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { historyDetail, historyDetailId } from './historyDetail';
import type { invoice, invoiceId } from './invoice';
import type { servicePackageTransaction, servicePackageTransactionId } from './servicePackageTransaction';
import type { story, storyId } from './story';
import type { storyFollowDetail, storyFollowDetailId } from './storyFollowDetail';
import type { storyRatingDetail, storyRatingDetailId } from './storyRatingDetail';

export interface userAttributes {
  id: number;
}

export type userPk = "id";
export type userId = user[userPk];
export type userCreationAttributes = userAttributes;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;

  // user hasMany historyDetail via userId
  historyDetails!: historyDetail[];
  getHistoryDetails!: Sequelize.HasManyGetAssociationsMixin<historyDetail>;
  setHistoryDetails!: Sequelize.HasManySetAssociationsMixin<historyDetail, historyDetailId>;
  addHistoryDetail!: Sequelize.HasManyAddAssociationMixin<historyDetail, historyDetailId>;
  addHistoryDetails!: Sequelize.HasManyAddAssociationsMixin<historyDetail, historyDetailId>;
  createHistoryDetail!: Sequelize.HasManyCreateAssociationMixin<historyDetail>;
  removeHistoryDetail!: Sequelize.HasManyRemoveAssociationMixin<historyDetail, historyDetailId>;
  removeHistoryDetails!: Sequelize.HasManyRemoveAssociationsMixin<historyDetail, historyDetailId>;
  hasHistoryDetail!: Sequelize.HasManyHasAssociationMixin<historyDetail, historyDetailId>;
  hasHistoryDetails!: Sequelize.HasManyHasAssociationsMixin<historyDetail, historyDetailId>;
  countHistoryDetails!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany invoice via userId
  invoices!: invoice[];
  getInvoices!: Sequelize.HasManyGetAssociationsMixin<invoice>;
  setInvoices!: Sequelize.HasManySetAssociationsMixin<invoice, invoiceId>;
  addInvoice!: Sequelize.HasManyAddAssociationMixin<invoice, invoiceId>;
  addInvoices!: Sequelize.HasManyAddAssociationsMixin<invoice, invoiceId>;
  createInvoice!: Sequelize.HasManyCreateAssociationMixin<invoice>;
  removeInvoice!: Sequelize.HasManyRemoveAssociationMixin<invoice, invoiceId>;
  removeInvoices!: Sequelize.HasManyRemoveAssociationsMixin<invoice, invoiceId>;
  hasInvoice!: Sequelize.HasManyHasAssociationMixin<invoice, invoiceId>;
  hasInvoices!: Sequelize.HasManyHasAssociationsMixin<invoice, invoiceId>;
  countInvoices!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany servicePackageTransaction via userId
  servicePackageTransactions!: servicePackageTransaction[];
  getServicePackageTransactions!: Sequelize.HasManyGetAssociationsMixin<servicePackageTransaction>;
  setServicePackageTransactions!: Sequelize.HasManySetAssociationsMixin<servicePackageTransaction, servicePackageTransactionId>;
  addServicePackageTransaction!: Sequelize.HasManyAddAssociationMixin<servicePackageTransaction, servicePackageTransactionId>;
  addServicePackageTransactions!: Sequelize.HasManyAddAssociationsMixin<servicePackageTransaction, servicePackageTransactionId>;
  createServicePackageTransaction!: Sequelize.HasManyCreateAssociationMixin<servicePackageTransaction>;
  removeServicePackageTransaction!: Sequelize.HasManyRemoveAssociationMixin<servicePackageTransaction, servicePackageTransactionId>;
  removeServicePackageTransactions!: Sequelize.HasManyRemoveAssociationsMixin<servicePackageTransaction, servicePackageTransactionId>;
  hasServicePackageTransaction!: Sequelize.HasManyHasAssociationMixin<servicePackageTransaction, servicePackageTransactionId>;
  hasServicePackageTransactions!: Sequelize.HasManyHasAssociationsMixin<servicePackageTransaction, servicePackageTransactionId>;
  countServicePackageTransactions!: Sequelize.HasManyCountAssociationsMixin;
  // user belongsToMany story via userId and storyId
  storyId_stories!: story[];
  getStoryId_stories!: Sequelize.BelongsToManyGetAssociationsMixin<story>;
  setStoryId_stories!: Sequelize.BelongsToManySetAssociationsMixin<story, storyId>;
  addStoryId_story!: Sequelize.BelongsToManyAddAssociationMixin<story, storyId>;
  addStoryId_stories!: Sequelize.BelongsToManyAddAssociationsMixin<story, storyId>;
  createStoryId_story!: Sequelize.BelongsToManyCreateAssociationMixin<story>;
  removeStoryId_story!: Sequelize.BelongsToManyRemoveAssociationMixin<story, storyId>;
  removeStoryId_stories!: Sequelize.BelongsToManyRemoveAssociationsMixin<story, storyId>;
  hasStoryId_story!: Sequelize.BelongsToManyHasAssociationMixin<story, storyId>;
  hasStoryId_stories!: Sequelize.BelongsToManyHasAssociationsMixin<story, storyId>;
  countStoryId_stories!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user belongsToMany story via userId and storyId
  storyId_story_storyFollowDetails!: story[];
  getStoryId_story_storyFollowDetails!: Sequelize.BelongsToManyGetAssociationsMixin<story>;
  setStoryId_story_storyFollowDetails!: Sequelize.BelongsToManySetAssociationsMixin<story, storyId>;
  addStoryId_story_storyFollowDetail!: Sequelize.BelongsToManyAddAssociationMixin<story, storyId>;
  addStoryId_story_storyFollowDetails!: Sequelize.BelongsToManyAddAssociationsMixin<story, storyId>;
  createStoryId_story_storyFollowDetail!: Sequelize.BelongsToManyCreateAssociationMixin<story>;
  removeStoryId_story_storyFollowDetail!: Sequelize.BelongsToManyRemoveAssociationMixin<story, storyId>;
  removeStoryId_story_storyFollowDetails!: Sequelize.BelongsToManyRemoveAssociationsMixin<story, storyId>;
  hasStoryId_story_storyFollowDetail!: Sequelize.BelongsToManyHasAssociationMixin<story, storyId>;
  hasStoryId_story_storyFollowDetails!: Sequelize.BelongsToManyHasAssociationsMixin<story, storyId>;
  countStoryId_story_storyFollowDetails!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user belongsToMany story via userId and storyId
  storyId_story_storyRatingDetails!: story[];
  getStoryId_story_storyRatingDetails!: Sequelize.BelongsToManyGetAssociationsMixin<story>;
  setStoryId_story_storyRatingDetails!: Sequelize.BelongsToManySetAssociationsMixin<story, storyId>;
  addStoryId_story_storyRatingDetail!: Sequelize.BelongsToManyAddAssociationMixin<story, storyId>;
  addStoryId_story_storyRatingDetails!: Sequelize.BelongsToManyAddAssociationsMixin<story, storyId>;
  createStoryId_story_storyRatingDetail!: Sequelize.BelongsToManyCreateAssociationMixin<story>;
  removeStoryId_story_storyRatingDetail!: Sequelize.BelongsToManyRemoveAssociationMixin<story, storyId>;
  removeStoryId_story_storyRatingDetails!: Sequelize.BelongsToManyRemoveAssociationsMixin<story, storyId>;
  hasStoryId_story_storyRatingDetail!: Sequelize.BelongsToManyHasAssociationMixin<story, storyId>;
  hasStoryId_story_storyRatingDetails!: Sequelize.BelongsToManyHasAssociationsMixin<story, storyId>;
  countStoryId_story_storyRatingDetails!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany storyFollowDetail via userId
  storyFollowDetails!: storyFollowDetail[];
  getStoryFollowDetails!: Sequelize.HasManyGetAssociationsMixin<storyFollowDetail>;
  setStoryFollowDetails!: Sequelize.HasManySetAssociationsMixin<storyFollowDetail, storyFollowDetailId>;
  addStoryFollowDetail!: Sequelize.HasManyAddAssociationMixin<storyFollowDetail, storyFollowDetailId>;
  addStoryFollowDetails!: Sequelize.HasManyAddAssociationsMixin<storyFollowDetail, storyFollowDetailId>;
  createStoryFollowDetail!: Sequelize.HasManyCreateAssociationMixin<storyFollowDetail>;
  removeStoryFollowDetail!: Sequelize.HasManyRemoveAssociationMixin<storyFollowDetail, storyFollowDetailId>;
  removeStoryFollowDetails!: Sequelize.HasManyRemoveAssociationsMixin<storyFollowDetail, storyFollowDetailId>;
  hasStoryFollowDetail!: Sequelize.HasManyHasAssociationMixin<storyFollowDetail, storyFollowDetailId>;
  hasStoryFollowDetails!: Sequelize.HasManyHasAssociationsMixin<storyFollowDetail, storyFollowDetailId>;
  countStoryFollowDetails!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany storyRatingDetail via userId
  storyRatingDetails!: storyRatingDetail[];
  getStoryRatingDetails!: Sequelize.HasManyGetAssociationsMixin<storyRatingDetail>;
  setStoryRatingDetails!: Sequelize.HasManySetAssociationsMixin<storyRatingDetail, storyRatingDetailId>;
  addStoryRatingDetail!: Sequelize.HasManyAddAssociationMixin<storyRatingDetail, storyRatingDetailId>;
  addStoryRatingDetails!: Sequelize.HasManyAddAssociationsMixin<storyRatingDetail, storyRatingDetailId>;
  createStoryRatingDetail!: Sequelize.HasManyCreateAssociationMixin<storyRatingDetail>;
  removeStoryRatingDetail!: Sequelize.HasManyRemoveAssociationMixin<storyRatingDetail, storyRatingDetailId>;
  removeStoryRatingDetails!: Sequelize.HasManyRemoveAssociationsMixin<storyRatingDetail, storyRatingDetailId>;
  hasStoryRatingDetail!: Sequelize.HasManyHasAssociationMixin<storyRatingDetail, storyRatingDetailId>;
  hasStoryRatingDetails!: Sequelize.HasManyHasAssociationsMixin<storyRatingDetail, storyRatingDetailId>;
  countStoryRatingDetails!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
