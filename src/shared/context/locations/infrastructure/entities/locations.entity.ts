import { CoverageZone } from './../../../coverage-zones/infrastructure/entities/coverage-zone.entity';
import { LocationType } from './../../../location-types/infrastructure/entities/location-type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tag: string;

  @ManyToOne(() => LocationType, { nullable: true })
  @JoinColumn({ name: 'location_type_id' })
  locationType: LocationType | null;

  @ManyToOne(() => Location, (location) => location.children)
  @JoinColumn({ name: 'location_parent_id' })
  parent?: Location | null;

  @OneToMany(() => Location, (location) => location.parent)
  children?: Location[];

  @ManyToMany(() => CoverageZone, (coverageZones) => coverageZones.locations)
  coverageZones: CoverageZone[];

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;
}
