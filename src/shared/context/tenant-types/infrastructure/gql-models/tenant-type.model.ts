import { TenantType } from './../entities/tenant-type.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TenantTypeGQLModel implements TenantType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  tag: string;

  @Field()
  enabled: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  //TODO: implement rest of the GQL models
  /* 
  @Field(() => [RecordType], { nullable: true })
  recordTypes?: RecordType[];

  @Field(() => [Tenant], { nullable: true })
  children?: Tenant[];

  @Field(() => [Role], { nullable: true })
  roles?: Role[];
 */
}
