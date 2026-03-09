import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsInt, IsNumber } from 'class-validator';

export class PaymentShippingAddressDto {
  @IsString()
  @MaxLength(100)
  firstName!: string;

  @IsString()
  @MaxLength(100)
  lastName!: string;

  @IsString()
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
}

export class CheckoutCartItemDto {
  @IsUUID()
  id!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsString()
  name?: string;
}

export class CheckoutDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutCartItemDto)
  cart!: CheckoutCartItemDto[];

  @IsOptional()
  @IsString()
  currency?: string;

  @IsEnum(['stripe', 'razorpay', 'mock'])
  provider!: 'stripe' | 'razorpay' | 'mock';

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentShippingAddressDto)
  shippingAddress?: PaymentShippingAddressDto;

  @IsOptional()
  @IsString()
  paymentMethod?: string;
}

export class ConfirmPaymentDto {
  @IsUUID()
  orderId!: string;

  @IsEnum(['stripe', 'razorpay', 'mock'])
  provider!: 'stripe' | 'razorpay' | 'mock';

  @IsString()
  providerPaymentId!: string;

  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}
