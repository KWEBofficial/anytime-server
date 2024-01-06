import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 예시 entity입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다. typeORM

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '김',
    comment: '사용자의 성',
  })
  lastName!: string;

  @Column({ nullable: true })
  age?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
//camel -> under bar
//entity folder 테이블 개수만큼 만들어야 함.
//repository folder 개수만큼 만들어져야 함. 담당이 있는 것
