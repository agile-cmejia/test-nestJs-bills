import { AppSection } from './../../../app-sections/infrastructure/entities/app-section.entity';
import { IssuerEnum } from './../../../../dataTypes/Enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class AppModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { unique: true })
  tag: string;

  @Column({ nullable: true })
  route: string;

  @Column()
  order: number;

  @Column('enum', { enum: IssuerEnum })
  application: IssuerEnum;

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @OneToMany(() => AppSection, (appSection) => appSection.appModule)
  appSections?: AppSection[] | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
