const { where } = require("sequelize");
const {User, Post, LikePost, BigComment, SmallComment, LikeBigComment, LikeSmallComment} = require("../models");
const {sequelize} = require("../models");

exports.getPost = async (req, res) => {
    const {acc_decoded} = req;
    
    const user_id = acc_decoded.user_id;

    try {
        // 로그인 된 유저
        const user = await User.findOne({where : {user_id}});
        // console.log(user.dataValues);

        // 모든 유저
        const userAll = await User.findAll();

        // 로그인 된 유저가 팔로우 하고 있는 유저들
        const following = JSON.parse(user.following);
        // console.log(following);
        if(following !== 0){
            following.push(user.id);
        }else{
            await User.update({
                following : `[${user.id}]`
            },
            {where : {id : user.id}});
        };

        // 팔로우 하고 있는 유저들의 게시글
        const followingPost = [];

        // for of : 순차적
        // forEach : 비순차적
        if(following != 0) {
            const posts = await Post.findAll();

            for await (const el of posts) {
                for await (const el2 of following) {
                    if(el.user_id == el2) {
                        followingPost.push(el);
                    }
                }
            }
        }

        res.json({user, userAll, following, followingPost});
        
    } catch (error) {
        console.log(error);
    }
};


exports.getProfile = async (req, res) => {
    const {user_id} = req.acc_decoded;

    try {
        const user = await User.findOne({where : {user_id}});
        res.json(user);

    } catch (error) {
        console.log(error);
    }
}

exports.getcontents = async (req,res)=>{
    try {
        const param = req.params.id;
        const data = await Post.findOne({where:{id:param}});
        let posts_User_id = data.dataValues.user_id;
        // post의 user_id 가 users 컬럼의 id임!!!!!!!!!!!!!!!!!!!!
        const b = await User.findOne({where:{id:posts_User_id}});
        let a = data.dataValues; // 해당글의 모든 컬럼값들
        let c = req.session.user_id;
        let d;
        let e_content;
        let e = [];
        let e_nick = [];
        let d_comment_id = [];
        let s_comment = [[]];
        

        // 댓글 가져오기
        
        const comment = await BigComment.findAll({where:{post_id:param}});
        if(comment == ""){
            e = 1;
        }else{
            e_content = comment;
            for(let i=0; i<comment.length; i++){
                e[i] = comment[i].user_id;
                d_comment_id[i] = comment[i].id;
            }
            for(let i=0;i<e.length;i++){
                const data = await User.findOne({where:{id:e[i]}});
                e_nick[i] = data.nickname;
            }
            for (let i = 0; i <d_comment_id.length; i++) {
                s_comment[i] = [];
            }
            for(let i=0; i<d_comment_id.length;i++){
                const data = await SmallComment.findAll({where:{comment_id:d_comment_id[i]}});
                for(let j=0; j<data.length; j++){
                    s_comment[i][j] = data[j].dataValues;
                }
            }
        }
        
        let users_id_ = b.user_id;
        // post 에서의 user_id / 즉 user에서는 id임
        if(users_id_ == c){
            // 로그인 중
            d = 1;
        }else{
            d = 0;
        }

        res.json({a, b, d, e_content, e, e_nick, d_comment_id, s_comment});
    } catch (error) {
        console.log(error);
    }
}

exports.delBtn = async (req, res)=>{
    try {
        const param = req.params.id;
        const delete1 = await Post.destroy({where:{id:param}});
        res.json("1");
    } catch (error) {
        console.log(error);
    }
}

exports.getlike = async (req,res)=>{
    const data = req.query;
    let x = req.session.user_id;
    const val2 = await User.findOne({where:{user_id:x}});
    let val22 = val2.dataValues.id; // 접속한 유저의 id;

    const val = await LikePost.findOne({where:{user_id:val22, post_id:data.post_id}});

    // console.log("이게시글에 좋아요 누른 유저", val);
    // console.log("접속한애", val2.dataValues.id);
    
    // val2가 접속한애
    if(val != null && val.user_id == val2.dataValues.id){
        res.json("1");
    }else{
        res.json("0");
    }
}

exports.likeClick = async (req, res)=>{
    const data = req.query;
    let se = req.session.user_id;
    const uf = await User.findOne({where:{user_id:se}});
    if(data.check == 0){
        await LikePost.create({
            user_id : uf.dataValues.id,
            post_id : data.post_id,
        });
        await Post.update({likes: sequelize.literal('likes + 1') },{where: {id:data.post_id} });
        // await Post.update({likes: "5" },{where: {id:data.post_id} });

        const send = await Post.findOne({where:{id:data.post_id}});
        res.json(send.dataValues.likes);
    }else{
        await LikePost.destroy({where:{user_id:uf.dataValues.id, post_id : data.post_id}});
        await Post.update({likes: sequelize.literal('likes - 1') },{where: {id:data.post_id} });
        res.json("0");
    }
}

// 댓글
exports.bigComment = async (req,res) =>{
    try {
        // let postbody = req.body; // post
        // console.log("확인", postbody.bigInputValue);

        
        let param = req.params.id;
        let postbody = req.query; // get
        let se = req.session.iidd;
        const createId = await BigComment.create({
            content : postbody.bigInputValue,
            likes : "0",
            user_id : se,
            post_id : param,
        });

        const data = await User.findOne({where:{id:se}});
        let a = data.dataValues;
        let b = createId.id;

        res.json({a, b});
    } catch (error) {
        console.log(error);
    }
}

exports.smallComment1 = async (req,res) =>{
    try {
        let param = req.params.id;
        let postbody = req.query;
        let se = req.session.iidd;

        const smallcommentcreateId = await SmallComment.create({
            content : postbody.smallInputValue,
            likes : "0",
            user_id : se,
            comment_id : postbody.comment_id,
        });

        const data = await User.findOne({where:{id:se}});
        let a = data.dataValues;
        res.json({a, smallcommentcreateId});
    } catch (error) {
        console.log(error);
    }
}

exports.c_comment_nick1 = async (req,res)=>{
    try {
        let param = req.query;
        const data = await User.findOne({where:{id:param.c_comment_nick}});

        let se = req.session.user_id;
        const uf = await User.findOne({where:{user_id:se}});


        const data2 = await LikeSmallComment.findOne({where:{user_id: uf.dataValues.id, comment_id: param.comment_id}});

        console.log("user_id",uf.dataValues.id );
        console.log("comment_id",param.comment_id );

        const data3 = await SmallComment.findOne({where:{user_id:uf.dataValues.id, id: param.comment_id}}); // 좋아요 표시해주기
        // const data3 = await SmallComment.findOne({where:{id: param.comment_id}});

        let a = data.dataValues;
        let b;
        if(data3 == null){
            const data3 = await SmallComment.findOne({where:{id: param.comment_id}}); // 좋아요 표시해주기
            b = data3.dataValues;
        }else{
            b = data3.dataValues;
        }

        res.json({a, data2, b});
    } catch (error) {
        console.log(error);
    }
}

exports.getbiglike1 = async (req, res)=>{
    const data = req.query;
    let x = req.session.user_id;
    const val2 = await User.findOne({where:{user_id:x}});
    let onuserId = val2.dataValues.id; // 접속한 유저의 id;
 
    console.log("onuserId", onuserId);
    console.log("check1", data.post_id); // 현재 페이지의 총 댓글value

    let tda = [];
    let data1;
    let j=0;
    if(data.post_id != undefined){
        for(let i=0; i<data.post_id.length; i++){
            data1 = await LikeBigComment.findOne({where:{user_id:onuserId, comment_id:data.post_id[i]}});
            if(data1 != null){
                // console.log("data1", data1);
                // console.log("data1.dataValues", data1.dataValues);
                tda[j] = data1.dataValues;
                j++;
            }
        }
    }
    
    if(tda.length>0){
        res.json(tda);
    }else{
        res.json("0");
    }
}

// 댓글 좋아요
exports.likebigcomment1 = async (req,res)=>{
    const data = req.query;
    let se = req.session.user_id;
    const uf = await User.findOne({where:{user_id:se}});
    if(data.check == 0){
        await LikeBigComment.create({
            user_id : uf.dataValues.id,
            comment_id : data.civalue1,
        });
        console.log("user_id :", uf.dataValues.id);
        console.log("id : ", data.civalue1);
        await BigComment.update({likes: sequelize.literal('likes + 1') },{where: {id:data.civalue1} });
        res.json("1");
    }
    else{
        await LikeBigComment.destroy({where:{user_id:uf.dataValues.id, comment_id : data.civalue1}});
        await BigComment.update({likes: sequelize.literal('likes - 1') },{where: {id:data.civalue1} });
        res.json("0");
    }
}

// 작은댓글 좋아요
exports.likesmallComment1 = async (req,res)=>{
    const data = req.query;
    let se = req.session.user_id;
    const uf = await User.findOne({where:{user_id:se}});

    if(data.check_val == 0){
        await LikeSmallComment.create({
            user_id : uf.dataValues.id,
            comment_id : data.comment_id,
        });

        await SmallComment.update({
            likes : sequelize.literal('likes+1')}, {where:{id:data.comment_id}
        });
    }else{
        await LikeSmallComment.destroy({
            where:{
                user_id : uf.dataValues.id,
                comment_id : data.comment_id,
            }
        });

        await SmallComment.update({
            likes : sequelize.literal('likes-1')}, {where:{id:data.comment_id}
        });
    }
    // console.log("a",uf.dataValues.id);
    // console.log("b", data.comment_id);
    // console.log("checkval", data.check_val);
    res.json("1");
}


