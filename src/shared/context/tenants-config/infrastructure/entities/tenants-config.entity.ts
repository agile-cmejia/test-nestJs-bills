import { Tenant } from '../../../tenants/infrastructure/entities/tenant.entity';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, Entity } from 'typeorm';

@Entity()
export class TenantsConfig {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Tenant, (tenant) => tenant.tenantsConfig, { nullable: true })
  tenantId: Tenant | null;

  @Column()
  association: number;

  @Column({ default: false })
  hasRoleAliases: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
