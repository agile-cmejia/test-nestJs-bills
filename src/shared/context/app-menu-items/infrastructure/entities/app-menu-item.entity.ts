import { AppSection } from './../../../app-sections/infrastructure/entities/app-section.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
@Entity()
export class AppMenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  application: string;

  @Column({ nullable: true })
  route: string;

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @ManyToMany(() => AppSection, (appSection) => appSection.menuItems)
  appSections: AppSection[];

  @Column({ type: 'boolean', default: false })
  hasRecordTypes: boolean;

  /*  
        @ManyToOne(() => RecordType, (recordType) => recordType.menuItems)
        @JoinColumn({ name: 'record_type_id' })
        recordType: RecordType | null;
        
        @OneToMany(() => RoleMenuItemActions, (roleMenuItemActions) => roleMenuItemActions.menuItem)
        roleMenuItemActions: RoleMenuItemActions[];
              */

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
