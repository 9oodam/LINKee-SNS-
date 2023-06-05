const Sequelize = require("sequelize");
const config = require("./config");

const User = require("./users");
const {Post, LikePost} = require("./posts");
const {BigComment, LikeBigComment} = require("./bigComments.js")
const {SmallComment, LikeSmallComment} = require("./smallComment")

// sequelize 연결
const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
)

// 테이블 생성, 관계형 설정
const db = {}
db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.LikePost = LikePost;
db.BigComment = BigComment;
db.LikeBigComment = LikeBigComment;
db.SmallComment = SmallComment;
db.LikeSmallComment = LikeSmallComment;

User.init(sequelize);
Post.init(sequelize);
LikePost.init(sequelize);
BigComment.init(sequelize);
LikeBigComment.init(sequelize);
SmallComment.init(sequelize);
LikeSmallComment.init(sequelize);

User.associate(db);
Post.associate(db);
LikePost.associate(db);
BigComment.associate(db);
LikeBigComment.associate(db);
SmallComment.associate(db);
LikeSmallComment.associate(db);

module.exports = db;