import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm'

  @Entity()
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    userId: number

    @Column({ nullable: true })
    postId: number

    @Column({ nullable: true })
    trailId: number

    @ManyToOne(() => Comment, (comment) => comment.childComments, { nullable: true, onDelete: 'CASCADE'})
    parentComment: Comment
    
    @OneToMany(() => Comment, (comment) => comment.parentComment)
    childComments: Comment[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    

  }