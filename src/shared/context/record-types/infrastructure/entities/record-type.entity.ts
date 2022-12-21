import { RecordFieldsVisibilityByType } from '../../../record-fields-visibility-by-types/infrastructure/entities/record-fields-visibility-by-type.entity';
import { RecordAdditionalFieldsByType } from '../../../record-additional-fields-by-types/infrastructure/entities/record-additional-fields-by-type.entity';
import { AppMenuItem } from './../../../app-menu-items/infrastructure/entities/app-menu-item.entity';
import { TenantType } from './../../../tenant-types/infrastructure/entities/tenant-type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class RecordType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  botName: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: true })
  enabled?: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @ManyToMany(() => TenantType, (tenantTypes) => tenantTypes.recordTypes)
  tenantTypes: TenantType[];

  @OneToMany(() => AppMenuItem, (appMenuItem) => appMenuItem.recordType)
  appMenuItems: AppMenuItem[];
  @ManyToMany(
    () => RecordAdditionalFieldsByType,
    (recordAdditionalFieldsByType) => recordAdditionalFieldsByType.recordTypes,
  )
  @JoinTable()
  additionalRecordFields: RecordAdditionalFieldsByType[];

  @OneToMany(
    () => RecordFieldsVisibilityByType,
    (recordFieldsVisibilityByType) => recordFieldsVisibilityByType.recordType,
  )
  recordFieldsVisibility: RecordFieldsVisibilityByType[] | null;
  /*

  @OneToMany(() => RoleAccessToRecordFields, (roleAccessToRecordFields) => roleAccessToRecordFields.recordType)
  roleAccessToRecordFields: RoleAccessToRecordFields[] | null;

  @OneToMany(() => RecordStatusByRecordType, (recordStatusByRecordType) => recordStatusByRecordType.recordType)
  recordStatus: RecordStatusByRecordType[] | null;

  @OneToMany(() => ProblemCodeByRecordType, (problemCode) => problemCode.recordType)
  problemCode: ProblemCodeByRecordType[] | null;

   */
}
