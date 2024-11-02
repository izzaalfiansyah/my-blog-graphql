import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({
    type: "text",
  })
  content: string;

  @Field(() => [String], { nullable: true })
  @Column({
    nullable: true,
    type: "text",
  })
  tags?: string[];

  @Field({ nullable: true })
  @Column()
  coverImage?: string;

  @Field()
  @Column({
    type: "datetime",
    default: () => "current_timestamp",
  })
  createdAt: Date;
}
