import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { IsInt } from 'class-validator';

export class CartItemQuantityDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class AddCartItemDto extends CartItemQuantityDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  guestToken?: string;

  @IsUUID()
  productId!: string;
}

export class SyncCartItemDto extends CartItemQuantityDto {
  @IsUUID()
  productId!: string;
}

export class SyncGuestCartDto {
  @IsString()
  guestToken!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyncCartItemDto)
  items!: SyncCartItemDto[];
}

export class MergeGuestCartDto {
  @IsString()
  guestToken!: string;

  @IsUUID()
  userId!: string;
}
