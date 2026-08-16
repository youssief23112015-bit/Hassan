import { IsEmail, IsString, MinLength, IsOptional, IsUUID, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@speakup.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+201012345678' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Ahmed' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Farouk' })
  @IsString()
  last_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  branch_id?: string;

  @ApiPropertyOptional({ example: 'student' })
  @IsOptional()
  @IsString()
  role_slug?: string;

  @ApiPropertyOptional({ example: 'ar' })
  @IsOptional()
  @IsIn(['ar', 'en'])
  language?: string;
}
