module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'admin',
        {
            admin_member_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '관리자고유번호',
            },
            company_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '소속회사코드'
            },
            admin_id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '관리자계정아이디'
            },
            admin_password: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: '관리자계정암호'
            },
            admin_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '관리자이름'
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '관리자메일주소'
            },
            telephone: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '관리자전화번호'
            },
            dept_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '부서이름'
            },
            used_yn_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: '사용여부'
            },
            reg_user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '등록자고유번호'
            },
            edit_user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '수정자고유번호'
            },
            edit_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '수정일시'
            },
            reg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '등록일시'
            },
        },
        {
            sequelize,
            tableName: 'admin',
            comment: '관리자계정정보',
            timestamps: false,   // 등록일시(createAT), 수정일시(updateAT) 컬럼 자동생성
            paranoid: true      // 데이터 삭제 컬럼 자동생성(deletedAT) 및 물리적 데이터 삭제안함 기능제공
        }
    );
}