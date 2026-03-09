import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { OrderItem } from "./order-item.entity";

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "success" | "failed";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items!: OrderItem[];

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  totalAmount!: number;

  @Column({ type: "varchar", length: 20, default: "pending" })
  status!: OrderStatus;

  @Column({ type: "varchar", length: 20, default: "pending" })
  paymentStatus!: PaymentStatus;

  @Column({ type: "varchar", length: 50, nullable: true })
  paymentProvider?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  paymentId?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  paymentMethod?: string;

  @Column({ type: "jsonb", nullable: true })
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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
