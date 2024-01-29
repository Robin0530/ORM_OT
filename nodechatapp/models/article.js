module.exports = function(sequelize, DataTypes) {
    // sequelize.define 
    // define은 3개의 파라메터를 가진다
    // ('테이블명','테이블을 구성하는 컬럼을 orm타입으로 정의하는 영역','옵션')
    return sequelize.define(
        'article',
        {
            article_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '게시글고유번호',
            },
            board_type_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '게시판고유번호 1:공지사항게시판,2:일반사용자 게시판',
            },
            title: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: '글제목',
            },
            article_type_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '게시글유형코드 0:일반게시글 1:상단고정게시글',
            },
            contents: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: '글내용',
            },
            view_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '조회수',
            },
            ip_address: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: '작성자IP주소',
            },
            is_display_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: '게시여부 0:게시안함 1:게시함',
            },
            reg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '등록일시',
            },
            reg_member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '등록자고유번호',
            },
            edit_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '수정일시',
            },
            edit_member_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '수정자고유번호',
            },
        },
        {
            sequelize,
            tableName: 'article',   // 기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨
            timestamps: false,      // 등록일시(createAT), 수정일시(updateAT) 컬럼 자동생성 (컬럼 자동생성 별로 안좋음. 명시적으로 만드는게 낫다.)
            comment: '게시글정보테이블',
            // paranoid: true,      // 데이터 삭제 컬럼 자동생성(deletedAT) 및 물리적 데이터 삭제안함 기능제공
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'article_id' }],   // 여러개의  컬럼이 프라이머리키인경우(복합키){} 추가하여 설정가능
                },
            ],
        },
    )
    }