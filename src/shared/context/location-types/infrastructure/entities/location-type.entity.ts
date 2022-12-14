import { Location } from '../../../locations/infrastructure/entities/locations.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

type NullishLocationType = LocationType | null;

@Entity()
export class LocationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => LocationType, (locationType) => locationType.children)
  parent: NullishLocationType;

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @OneToMany(() => Location, (location: Location) => location.locationType)
  locations: Location[];

  @OneToMany(() => LocationType, (locationType) => locationType.parent)
  children?: LocationType[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;
}
