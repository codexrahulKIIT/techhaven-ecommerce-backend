import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsString()
  productId!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsString()
  name?: string;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  // totalAmount will be calculated in service, so remove from DTO to avoid client setting it
  // @IsNumber()
  // totalAmount!: number;

  @IsOptional()
  @IsString()
  status?: 'pending' | 'shipped' | 'delivered' | 'cancelled';

  @IsOptional()
  @IsString()
  paymentProvider?: string;

  @IsOptional()
  shippingAddress?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  @IsOptional()
  @IsString()
  paymentMethod?: string;
}
