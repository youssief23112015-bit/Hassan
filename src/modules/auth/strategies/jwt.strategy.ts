import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../shared/entities/user.entity';
import { UserRole } from '../../../shared/entities/user-role.entity';
import { Role } from '../../../shared/entities/role.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserRole) private userRoleRepo: Repository<UserRole>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.userRepo.findOne({
      where: { id: payload.sub },
      relations: ['branch'],
    });
    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('User inactive or not found');
    }

    const userRoles = await this.userRoleRepo.find({
      where: { user_id: user.id },
      relations: ['role', 'role.permissions'],
    });

    const roles = userRoles.map((ur) => ur.role.slug);
    const permissions = userRoles.flatMap((ur) =>
      ur.role.permissions.map((p) => `${p.module}:${p.action}`),
    );

    return {
      userId: user.id,
      email: user.email,
      branchId: user.branch_id,
      roles,
      permissions,
    };
  }
}
