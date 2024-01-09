import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
  })
  teamname!: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  color!: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  explanation!: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isPublic!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
