import { IsString, IsOptional, IsPhoneNumber, MinLength, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('IN')
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  address?: string;
}
