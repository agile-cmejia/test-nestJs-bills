import {
  CoverageZone,
  NullishCoverageZone,
} from './../../../coverage-zones/infrastructure/entities/coverage-zone.entity';
import { User } from '../../../users/infrastructure/entities/user.entity';
import { TenantType } from '../../../tenant-types/infrastructure/entities/tenant-type.entity';
import { TenantsConfig } from '../../../tenants-config/infrastructure/entities/tenants-config.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export type NullishTenant = Tenant | null;

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  parentId?: number;

  @Column({ default: 0 })
  coverageZoneId: number;

  @Column({ nullable: true })
  url: string;

  @Column({ default: true })
  enabled: boolean;

  @OneToOne(() => TenantsConfig, (tenantsConfig) => tenantsConfig.tenantId, { nullable: true })
  @JoinColumn({ name: 'tenant_config_id' })
  tenantsConfig: TenantsConfig | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @ManyToMany(() => TenantType, (tenantType) => tenantType.children)
  @JoinTable()
  tenantType: TenantType[];

  @ManyToOne(() => Tenant, (tenant) => tenant.children)
  @JoinColumn({ name: 'tenant_parent_id' })
  parent?: Tenant | null;

  @OneToMany(() => Tenant, (tenant) => tenant.parent)
  children?: Tenant[];

  @ManyToMany(() => User, (user) => user.tenants)
  @JoinTable()
  users: User[];

  @ManyToOne(() => CoverageZone)
  @JoinColumn({ name: 'coverage_zone_id' })
  coverageZone?: NullishCoverageZone;

  /*

  @OneToMany(() => UserRoleByTenants, userRoleByTenants => userRoleByTenants.tenant)
  roles: UserRoleByTenants[];

  @OneToMany(() => TenantRoleAliases, tenantRoleAlias => tenantRoleAlias.tenant)
  tenantRoleAlias: TenantRoleAliases[];
     */
}
