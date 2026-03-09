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

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column({ nullable: true })
  authorId?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ default: true })
  published!: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "authorId" })
  author?: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
