// backend/src/entities/b2b.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

export type B2BStatus = "pending" | "approved" | "rejected";

@Entity("b2b_requests")
export class B2BRequest {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({ nullable: true })
  userId?: string;
  @Column()
  company!: string;
  @Column()
  email!: string;
  @Column({ nullable: true })
  phone?: string;
  @Column()
  details!: string;
  @Column({ default: "pending" })
  status!: B2BStatus;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "userId" })
  user?: User;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
