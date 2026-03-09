import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class AddressDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  label?: string;

  @IsString()
  @MaxLength(100)
  firstName!: string;

  @IsString()
  @MaxLength(100)
  lastName!: string;

  @IsEmail()
  @MaxLength(150)
  email!: string;

  @IsString()
  @Matches(/^[6-9]\d{9}$/)
  phone!: string;

  @IsString()
  address!: string;

  @IsString()
  @MaxLength(100)
  city!: string;

  @IsString()
  @MaxLength(100)
  state!: string;

  @IsString()
  @MaxLength(20)
  pincode!: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
