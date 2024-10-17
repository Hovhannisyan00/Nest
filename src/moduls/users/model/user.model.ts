import { Column, Model, Table } from 'sequelize-typescript';
@Table
export class Usersequeliza extends Model {
  @Column
  email: string;
  @Column
  password: string;
  @Column
  age: number;
}
