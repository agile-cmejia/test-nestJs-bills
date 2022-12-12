import { FindUserDto } from './dto/find-user.dto';
import { capitalizeSentence } from '../../../utils';
import { dbConfig } from '../../../infrastructure/persistance/postgre-sql/dbConfig';
import { User } from '../infrastructure/entities/user.entity';
import { Injectable, Logger, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, dbConfig.name)
    private readonly userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);
  private usersCollection: User[] = [];

  async create(createUserDto: CreateUserDto) {
    this.logger.log('Creating new User...');
    const { email, firstName, lastName, tenantsIds } = createUserDto;
    const existingTenantEmail = await this.userRepository.findOneBy({ email });
    if (existingTenantEmail) {
      this.logger.error(`The email ${email} is already used and needs to be unique`);
      throw new ForbiddenException('email is already in use', {
        cause: new Error(),
        description: `The email ${email} is already used and needs to be unique`,
      });
    }
    if (tenantsIds && tenantsIds.length > 0) {
      this.logger.log(`tenant types: ${tenantsIds}`);
    }
    const newTenantType = this.userRepository.create({
      ...createUserDto,
      firstName: capitalizeSentence(firstName).trim(),
      lastName: capitalizeSentence(lastName).trim(),
      email: email.trim().toLowerCase(),
    });
    return await this.userRepository.save(newTenantType);
  }

  async findAll() {
    this.logger.log('Finding All Users ...');
    this.usersCollection = await this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.tenants', 'tenants')
      //.leftJoinAndSelect('users.roles', 'roles')
      //.leftJoinAndSelect('roles.role', 'role')
      //.leftJoinAndSelect('roles.tenant', 'tenant')
      //.leftJoinAndSelect('roles.roleAlias', 'roleAlias')
      .getMany();
    this.logger.log(`Found ${this.usersCollection.length} users`);
    return this.usersCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Looking for user with id: ${id}`);
    this.usersCollection = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tenants', 'tenants')
      //.leftJoinAndSelect('user.roles', 'roles')
      //.leftJoinAndSelect('roles.role', 'role')
      //.leftJoinAndSelect('roles.tenant', 'tenant')
      //.leftJoinAndSelect('roles.roleAlias', 'roleAlias')
      .where('user.id = :id', { id })
      .getMany();
    this.logger.log(`Found ${this.usersCollection.length} users`);
    return this.usersCollection[0];
  }

  async findByMany(findUserDto: FindUserDto) {
    const {
      ids,
      firstNames,
      lastNames,
      enabled,
      emails,
      fireBaseId,
      validated,
      BackOfficeAccess,
      SaasAccess,
      tenantsIds,
      rolesIds,
    } = findUserDto;
    let query = this.userRepository.createQueryBuilder('users').leftJoinAndSelect('users.tenants', 'tenants');
    //.leftJoinAndSelect('users.roles', 'roles')
    //.leftJoinAndSelect('roles.role', 'role')
    //.leftJoinAndSelect('roles.tenant', 'tenant')
    //.leftJoinAndSelect('roles.roleAlias', 'roleAlias');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('users.id IN (:...ids) ', { ids });
    }
    if (firstNames && firstNames.length > 0) {
      this.logger.log(`Finding by firstNames: ${firstNames}`);
      query = query.andWhere('users.name IN (:...firstNames) ', {
        firstNames: firstNames.map((name) => capitalizeSentence(name)),
      });
    }
    if (lastNames && lastNames.length > 0) {
      this.logger.log(`Finding by last names: ${lastNames}`);
      query = query.andWhere('users.name IN (:...lastNames) ', {
        lastNames: lastNames.map((name) => capitalizeSentence(name)),
      });
    }
    if (emails && emails.length > 0) {
      this.logger.log(`Finding by emails: ${emails}`);
      query = query.andWhere('users.emails IN (:...emails) ', {
        emails: emails.map((email) => email.toLowerCase()),
      });
    }
    if (rolesIds && rolesIds.length > 0) {
      this.logger.log(`Finding by roleAliases Ids: ${rolesIds}`);
      query = query.andWhere('roles.id IN (:...rolesIds) ', { rolesIds });
    }
    if (tenantsIds && tenantsIds.length > 0) {
      this.logger.log(`Finding by tenants Ids: ${tenantsIds}`);
      query = query.andWhere('tenants.id IN (:...tenantsIds) ', { tenantsIds });
    }

    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('users.enabled = :enabled ', { enabled });
    }

    if (validated != null) {
      this.logger.log(`Finding by validated: ${validated}`);
      query = query.andWhere('users.validated = :validated ', { validated });
    }

    if (BackOfficeAccess != null) {
      this.logger.log(`Finding by BackOffice Access: ${BackOfficeAccess}`);
      query = query.andWhere('users.BackOfficeAccess = :BackOfficeAccess ', { BackOfficeAccess });
    }

    if (SaasAccess != null) {
      this.logger.log(`Finding by Saas Access: ${SaasAccess}`);
      query = query.andWhere('users.SaasAccess = :SaasAccess ', { SaasAccess });
    }

    if (fireBaseId) {
      this.logger.log(`Finding by fire Base Id: ${fireBaseId}`);
      query = query.andWhere('users.fireBaseId = :fireBaseId ', { fireBaseId });
    }

    this.usersCollection = await query.getMany();
    this.logger.log(`Found ${this.usersCollection.length} Users`);
    return this.usersCollection;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log(`Updating user with id: ${id}`);
    const { email, firstName, lastName, tenantsIds } = updateUserDto;
    const userToUpdate = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tenants', 'tenants')
      //.leftJoinAndSelect('user.roles', 'roles')
      //.leftJoinAndSelect('roles.role', 'role')
      //.leftJoinAndSelect('roles.tenant', 'tenant')
      //.leftJoinAndSelect('roles.roleAlias', 'roleAlias')
      .where('user.id = :id', { id })
      .getOne();

    if (!userToUpdate) {
      this.logger.error(`The user with id ${id} was not found`);
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: `The user with id ${id} was not found`,
      });
    }
    if (email) {
      const existingTenantEmail = await this.userRepository.findOneBy({ email });
      if (existingTenantEmail.id != id) {
        this.logger.error(`The email ${email} is already used and needs to be unique`);
        throw new ForbiddenException('email is already in use', {
          cause: new Error(),
          description: `The email ${email} is already used and needs to be unique`,
        });
      }
    }
    if (tenantsIds && tenantsIds.length > 0) {
      this.logger.log(`looking for tenant ids: ${tenantsIds}`);
    }
    this.userRepository.merge(userToUpdate, {
      ...updateUserDto,
      firstName: firstName ? capitalizeSentence(firstName).trim() : userToUpdate.firstName,
      lastName: lastName ? capitalizeSentence(lastName).trim() : userToUpdate.lastName,
      email: email ? email.trim().toLowerCase() : userToUpdate.email,
    });
    this.logger.log(`User with id: ${id} was updated.`);
    return await this.userRepository.save(userToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Enabling / Disabling User with id: ${id}.`);
    const userToDisable = await this.userRepository.findOneBy({ id });
    if (!userToDisable) {
      this.logger.error(`The user with id ${id} was not found`);
      throw new NotFoundException('Tenant not found', {
        cause: new Error(),
        description: `The tenant with id ${id} was not found`,
      });
    }
    userToDisable.enabled = !userToDisable.enabled;
    this.logger.log(`Tenant with id: ${id} was ` + userToDisable.enabled ? 'Enabled!' : 'Disabled!');

    return await this.userRepository.save(userToDisable);
  }
}
