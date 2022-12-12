import { Tenant } from '../../../tenants/infrastructure/entities/tenant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../../../roles/infrastructure/entities/role.entity';

@Entity()
export class TenantType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text', { unique: true })
  tag: string;

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

  @ManyToMany(() => Tenant, (tenant) => tenant.tenantType)
  children: Tenant[];

  @ManyToMany(() => Role, (roles) => roles.tenantTypes)
  @JoinTable()
  roles: Role[];

  /*
    @ManyToMany(() => RecordType, (RecordTypes) => RecordTypes.tenantTypes)
    @JoinTable()
    recordTypes?: RecordType[];
  */
}
