import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

export enum ProjectStatus {
  PENDING = 'pending',
  CONTACTED = 'contacted',
  QUOTATION_SENT = 'quotation_sent',
  APPROVED = 'approved',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum ProjectCategory {
  ACADEMIC = 'Academic Projects',
  INDUSTRIAL = 'Industrial Projects',
  IOT = 'IoT Projects',
  EMBEDDED = 'Embedded Systems',
  ROBOTICS = 'Robotics',
  PCB_DESIGN = 'PCB Design',
  PROTOTYPE = 'Prototype Development',
  POWER_ELECTRONICS = 'Power Electronics',
  DIGITAL_ELECTRONICS = 'Digital Electronics',
  ANALOG_ELECTRONICS = 'Analog Electronics',
  AUDIO = 'Audio Projects',
  AUTOMATION = 'Automation',
  SMART_HOME = 'Smart Home',
  EV = 'E-Bike/EV Projects',
  OTHER = 'Other',
}

@Entity('custom_projects')
export class CustomProject {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Customer Information
  @Column({ name: 'customer_name', length: 255 })
  customerName!: string;

  @Column({ name: 'customer_email', length: 255 })
  customerEmail!: string;

  @Column({ name: 'customer_mobile', length: 20 })
  customerMobile!: string;

  // Project Details
  @Column({ name: 'project_title', length: 500 })
  projectTitle!: string;

  @Column({
    name: 'project_category',
    type: 'enum',
    enum: ProjectCategory,
    nullable: true,
  })
  projectCategory!: ProjectCategory;

  @Column({ name: 'project_description', type: 'text' })
  projectDescription!: string;

  // Budget & Timeline
  @Column({ name: 'budget_range', length: 100, nullable: true })
  budgetRange!: string;

  @Column({ name: 'expected_timeline', length: 100, nullable: true })
  expectedTimeline!: string;

  // File Attachment
  @Column({ name: 'attachment_url', length: 1000, nullable: true })
  attachmentUrl!: string;

  @Column({ name: 'attachment_name', length: 255, nullable: true })
  attachmentName!: string;

  @Column({ name: 'attachment_size', type: 'integer', nullable: true })
  attachmentSize!: number;

  @Column({ name: 'attachment_type', length: 100, nullable: true })
  attachmentType!: string;

  // Project Status & Tracking
  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
  })
  status!: ProjectStatus;

  @Column({ length: 20, default: 'normal' })
  priority!: string;

  // Quotation Details
  @Column({ name: 'estimated_cost', type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedCost!: number;

  @Column({ name: 'quoted_amount', type: 'decimal', precision: 10, scale: 2, nullable: true })
  quotedAmount!: number;

  @Column({ name: 'quotation_sent_at', type: 'timestamp', nullable: true })
  quotationSentAt!: Date;

  @Column({ name: 'quotation_file_url', length: 1000, nullable: true })
  quotationFileUrl!: string;

  // Admin Notes & Communication
  @Column({ name: 'admin_notes', type: 'text', nullable: true })
  adminNotes!: string;

  @Column({ name: 'customer_notes', type: 'text', nullable: true })
  customerNotes!: string;

  @Column({ name: 'internal_remarks', type: 'text', nullable: true })
  internalRemarks!: string;

  // Assignment
  @Column({ name: 'assigned_to', type: 'uuid', nullable: true })
  assignedTo!: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assignedUser!: User;

  // Timeline Tracking
  @Column({ name: 'contacted_at', type: 'timestamp', nullable: true })
  contactedAt!: Date;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt!: Date;

  @Column({ name: 'started_at', type: 'timestamp', nullable: true })
  startedAt!: Date;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt!: Date;

  // Metadata
  @Column({ length: 50, default: 'website' })
  source!: string;

  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress!: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent!: string;

  // Timestamps
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Soft Delete
  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt!: Date;

  @Column({ name: 'is_deleted', default: false })
  isDeleted!: boolean;
}
