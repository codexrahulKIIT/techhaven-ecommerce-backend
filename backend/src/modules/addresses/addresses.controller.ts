import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Address } from '@/entities/address.entity';
import { AddressesService } from './addresses.service';
import { AddressDto } from './dto/address.dto';

@Controller('addresses')
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  async list(@Request() req: any): Promise<Address[]> {
    return this.addressesService.findByUser(req.user.id);
  }

  @Post()
  async create(@Request() req: any, @Body() payload: AddressDto): Promise<Address> {
    return this.addressesService.create(req.user.id, payload);
  }

  @Put(':id')
  async update(@Request() req: any, @Param('id') id: string, @Body() payload: Partial<AddressDto>): Promise<Address> {
    return this.addressesService.update(req.user.id, id, payload);
  }

  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string): Promise<{ message: string }> {
    await this.addressesService.remove(req.user.id, id);
    return { message: 'Address deleted successfully' };
  }
}
