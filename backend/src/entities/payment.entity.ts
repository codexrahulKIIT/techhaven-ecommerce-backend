import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

export type PaymentRecordStatus = 'pending' | 'success' | 'failed' | 'cancelled';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orderId!: string;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order!: Order;

  @Column({ type: 'varchar', length: 50 })
  provider!: string;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status!: PaymentRecordStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  providerPaymentId?: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'varchar', length: 12, default: 'INR' })
  currency!: string;

  @Column({ type: 'jsonb', nullable: true })
  payload?: Record<string, unknown>;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
