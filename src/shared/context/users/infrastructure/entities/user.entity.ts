import { Tenant } from '../../../tenants/infrastructure/entities/tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

export type NullishUser = User | null;
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('text', { unique: true })
  email: string;

  @Column({ nullable: true })
  fireBaseId: string;

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @Column({ type: 'boolean', default: false })
  validated: boolean;

  @Column({ type: 'boolean', default: false })
  BackOfficeAccess: boolean;

  @Column({ type: 'boolean', default: false })
  SaasAccess: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @ManyToMany(() => Tenant, (tenant) => tenant.users)
  tenants: Tenant[];
  /* 
                @Field(() => [UserGridPreferences], { nullable: true })
                @ManyToMany(() => UserGridPreferences, grid => grid.userId)
                gridPreferences: UserGridPreferences[];
              
                @Field(() => [UserRoleByTenants], { nullable: true })
                @OneToMany(() => UserRoleByTenants, userRoleByTenants => userRoleByTenants.user)
                roles: UserRoleByTenants[];
               */
}
