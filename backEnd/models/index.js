const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    {
        ...config.dev,
        timezone : "Asia/Seoul"
    }
)

const db = {};

class User extends Sequelize.Model{
    static init(seq){
        return super.init({
            user_id : {
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            user_pw : {
                type : Sequelize.STRING(200),
                allowNull : false,
            },
            user_name : {
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            nickname : {
                type : Sequelize.STRING(10),
                allowNull : false,
            },
            profile_img : {
                type : Sequelize.STRING(100),
                allowNull : true,
            },
            profile_info : {
                type : Sequelize.STRING(100),
                allowNull : true,
            },
            level : {
                type : Sequelize.INTEGER,
                allowNull : false,
            },
            follower : {
                type : Sequelize.TEXT,
                allowNull : false,
            },
            following : {
                type : Sequelize.TEXT,
                allowNull : false,
            },
        },{
            sequelize : seq,
            timestamps : true, // 추가 수정 자동 생성
            underscored : false, // 카멜 케이스
            modelName : "User", // 노드 프로젝트에서 사용할 이름(조회 했을때 보임)
            tableName : "users", // 데이터 베이스 테이블의 이름
            paranoid : true, // 삭제 시간 표기
            charset : "utf8", // 인코딩 방식
            collate : "utf8_general_ci",
        });
    }
    static associate(db){

    }
}

class LoginCount extends Sequelize.Model{
    static init(seq){
        return super.init({
            date : {
                type : Sequelize.STRING(50),
                allowNull : false,
            },
            cnt : {
                type : Sequelize.INTEGER,
                allowNull : false,
            }
        },{
            sequelize : seq,
            timestamps : false,
            underscored : false,
            modelName : "LoginCount",
            tableName : "logincount",
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }
    static associate(db){

    }
}

db.sequelize = sequelize;
db.User = User;
db.LoginCount = LoginCount;

User.init(sequelize);
// User.associate(db);
LoginCount.init(sequelize);


// ------------------------------------ 관리자 만들어주는건데 나중에 삭제할 것!
async function initializeAdminUser() {
    try {
      // 관리자 계정을 생성합니다.
      const adminUser = await db.User.create({
        user_id: 'admin',
        user_pw: 'admin',
        user_name: 'Admin',
        nickname: 'admin',
        level: 9,
        follower: 1000,
        following: 1000
        // 나머지 필드에 대한 값은 필요에 따라 추가하세요.
      });
  
    //   console.log('Admin user created:', adminUser);
    } catch (error) {
      console.error('Error initializing admin user:', error);
    }
  }
  
//   initializeAdminUser();
// admin 생성 이것만 키고 끄고 하면 됨

// ----------------------------------------------



module.exports = db;