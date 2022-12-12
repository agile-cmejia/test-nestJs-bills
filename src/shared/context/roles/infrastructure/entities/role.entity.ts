import { Tenant } from '../../../tenants/infrastructure/entities/tenant.entity';
import { TenantType } from '../../../tenant-types/infrastructure/entities/tenant-type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text', { unique: true })
  tag: string;

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @Column({ type: 'boolean', default: false })
  BackOfficeAccess: boolean;

  @Column({ type: 'boolean', default: false })
  SaasAccess: boolean;

  @Column({ type: 'boolean', default: false })
  tenantSpecific: boolean;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_creator_id' })
  tenantCreator?: Tenant;

  @ManyToMany(() => TenantType, (tenantType) => tenantType.roles)
  tenantTypes: TenantType[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  /*   
    aliases?: number[];
  */
}
