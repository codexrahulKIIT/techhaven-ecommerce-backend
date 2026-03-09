import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '@/entities/address.entity';

type UpsertAddressInput = {
  label?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
};

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepo: Repository<Address>,
  ) {}

  async findByUser(userId: string): Promise<Address[]> {
    return this.addressesRepo.find({
      where: { userId },
      order: { isDefault: 'DESC', updatedAt: 'DESC' },
    });
  }

  async create(userId: string, payload: UpsertAddressInput): Promise<Address> {
    if (payload.isDefault) {
      await this.addressesRepo.update({ userId }, { isDefault: false });
    }

    const address = this.addressesRepo.create({ userId, ...payload });
    return this.addressesRepo.save(address);
  }

  async update(userId: string, id: string, payload: Partial<UpsertAddressInput>): Promise<Address> {
    const address = await this.addressesRepo.findOne({ where: { id, userId } });
    if (!address) {
      throw new NotFoundException('Address not found');
    }

    if (payload.isDefault) {
      await this.addressesRepo.update({ userId }, { isDefault: false });
    }

    Object.assign(address, payload);
    return this.addressesRepo.save(address);
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.addressesRepo.delete({ id, userId });
    if ((result.affected ?? 0) === 0) {
      throw new NotFoundException('Address not found');
    }
  }
}
