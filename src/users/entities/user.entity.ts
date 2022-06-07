import { Report } from '../../reports/entities/report.entity'
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  name: string

  @Column({ default: true })
  admin: boolean

  @Column()
  // @Exclude()
  password: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

  // Hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id: ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated user with id: ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove user with id: ${this.id}`)
  }
}
