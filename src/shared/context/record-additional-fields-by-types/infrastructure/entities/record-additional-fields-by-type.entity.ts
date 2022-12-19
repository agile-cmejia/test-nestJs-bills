import { RecordType } from '../../../record-types/infrastructure/entities/record-type.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

@Entity()
export class RecordAdditionalFieldsByType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => RecordType, (recordType) => recordType.additionalRecordFields)
  recordTypes: RecordType[];

  @Column()
  name: string;

  @Column({ nullable: true })
  botFieldName: string;

  @Column()
  description: string;

  @Column({ default: 'public' })
  visibility: string;

  @Column({ nullable: true })
  tag: string;

  @Column({ default: 'string' })
  dataType: string;

  @Column({ type: 'boolean', default: true })
  headerField?: boolean;

  @Column({ type: 'boolean', default: true })
  enabled?: boolean;

  @Column({ type: 'boolean', default: false })
  required: boolean;

  @Column({ type: 'boolean', default: true })
  gridEditable: boolean;
  /* 
            @OneToMany(() => RoleAccessToRecordFields, (roleAccessToRecordFields) => roleAccessToRecordFields.recordType)
            roleAccessToRecordFields: RoleAccessToRecordFields[] | null;
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
