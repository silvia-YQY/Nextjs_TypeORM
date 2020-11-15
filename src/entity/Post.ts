import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    title: string;
    @Column('text')
    content: string;
    @Column('int')
    authorId: number
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @ManyToOne('User', 'posts')
    author: User
    @OneToMany('Comment','post')
    comments: Comment[]
}
