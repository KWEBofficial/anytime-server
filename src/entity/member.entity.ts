import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Member {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
    comment: '실명',
  })
  membername!: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    unique: true,
    comment: '사용자 이메일 주소',
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '인코딩된 비밀번호',
  })
  password!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
