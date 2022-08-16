import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name: string;

  @Column()
  public units: number;

  @Column()
  public maxGuests: number;

  @Column()
  public maxKids: number;

  @Column()
  public roomSize: number;

  @Column()
  public bedType: string;

  @Column()
  public npOfBeds: number;

  @Column()
  public amenities: string;

  @Column({ array: true })
  public photos: string;

  @Column()
  public description: string;

  @Column()
  public price: number;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
