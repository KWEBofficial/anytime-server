import {
    Entity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import team from './team.entity';

  @Entity()
  export default class notice {
    @PrimaryGeneratedColumn()
    id!: number;
/*
    @Column({
        type: 'int',
        nullable: false
    })
    teamId!: number;
*/
    @ManyToOne(() => team, (team:team) => team.notices)
    team!: team;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    content?: string;
    
    @Column({
        type: 'timestamp',
        nullable: false
    })
    startTime!: Date;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    endTime!: Date;
    
    @Column({
        type: 'tinyint',
        nullable: false,
        default: 0
    })
    isPrior!: number;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;
  }