import { RecordType } from '../../../record-types/infrastructure/entities/record-type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class RecordFieldsVisibilityByType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RecordType, (recordType: RecordType) => recordType.recordFieldsVisibility)
  @JoinColumn({ name: 'record_type_id' })
  recordType: RecordType;

  @Column({ unique: true })
  value: string;

  @Column({ default: false })
  enabled: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
