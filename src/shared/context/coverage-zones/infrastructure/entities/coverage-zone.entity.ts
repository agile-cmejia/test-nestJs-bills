import { Location } from './../../../locations/infrastructure/entities/locations.entity';
import { Tenant } from './../../../tenants/infrastructure/entities/tenant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export type NullishCoverageZone = CoverageZone | null;

@Entity()
export class CoverageZone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @OneToMany(() => Tenant, (tenant: Tenant) => tenant.coverageZone)
  tenants?: Tenant[];

  @ManyToMany(() => Location, (location: Location) => location.coverageZones)
  @JoinTable()
  locations?: Location[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
