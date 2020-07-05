import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePosts1593936637529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 创建数据表
        return await queryRunner.createTable(new Table({
            name:'posts',
            columns:[
                {name:'id', isGenerated:true, type:'int', generationStrategy:'increment', isPrimary:true},
                {name:'title', type:'varchar'},
                {name:'content', type:'text'},
                {name:'author_id', type:'int'},
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 刪除數據表
        return await queryRunner.dropTable('posts')
    }

}
