import { Sequelize } from "sequelize";

export type ModelInit = (sequelize: Sequelize) => void;

export type Noop = () => void