import { AppMenuItem } from '../../../app-menu-items/infrastructure/entities/app-menu-item.entity';
import { AppModule } from './../../../app-modules/infrastructure/entities/app-module.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class AppSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { unique: true })
  tag: string;

  @Column({ nullable: true })
  route: string;

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @ManyToOne(() => AppModule, (appModule) => appModule.appSections)
  @JoinColumn({ name: 'app_module_id' })
  appModule: AppModule;

  @ManyToMany(() => AppMenuItem, (menuItem) => menuItem.appSections)
  @JoinTable()
  menuItems: AppMenuItem[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
