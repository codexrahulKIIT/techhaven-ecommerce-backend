import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 75, default: "Unknown" })
  firstName!: string;

  @Column({ length: 75, default: "Unknown" })
  lastName!: string;

  @Index('UQ_users_email', { unique: true })
  @Column({ length: 150 })
  email!: string;

  @Index('UQ_users_phone', { unique: true })
  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ default: "user" })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
