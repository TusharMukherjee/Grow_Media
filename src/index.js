const express = require('express');
const path = require('path');
const {ApolloServer} = require('apollo-server-express');
const {BlogsModel} = require('../sqlDB/models/blogsModel')


const {typeDefs} = require('./nSchema/typeDef');
const {resolvers} = require('./nSchema/resolver');
const { UsersModel } = require('../sqlDB/models/users');
// const { FriendsModel } = require('../sqlDB/models/friends');
// const { BlogCommentsModel } = require('../sqlDB/models/blogsComments');
// const { default: knex } = require('knex');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { ExtraInfoModel } = require('../sqlDB/models/extraInfo');
// const { response } = require('express');
const { cloudinary } = require('./cloudinary');
const { bCommentLikesModel } = require('../sqlDB/models/bcommentLikes');
const { BlogCommentsModel } = require('../sqlDB/models/blogsComments');
const { buildResolveInfo } = require('graphql/execution/execute');
const { BlogLikesModel } = require('../sqlDB/models/blogsLikes');
const { totalmem } = require('os');

const app = express();
// app.use(express.json());
app.use(express.json({
  limit: '200mb'
}));
app.use(express.urlencoded({
  limit: '200mb',
  extended: true 
}));

// app.use(bodyParser.json({
//   limit: '50mb'
// }));

// app.use(bodyParser.urlencoded({
//   limit: '50mb',
//   parameterLimit: 100000,
//   extended: true 
// }));

// const options = {
//   port: 3001,
//   bodyParserOptions: { limit: "50mb", type: "application/json" },
// };


const main = async () => {

    const corsOptions = {
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        // origin: 'https://studio.apollographql.com',
        credentials: true
    }

    app.use(cors(corsOptions));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req, res}) => ({req,res,checkContext})
        // context : ({ req }) => {
        //     const token = req.headers.authorization || ''
        //   try {
        //   return { id, email } = jwt.verify(token.split(' ')[1], `tKBw+m]$#VC"&P3_Lq:u`)
        //   } catch (e) {
        //     throw new AuthenticationError(
        //     'Authentication token is invalid, please log in',)
        //   }
        // }
    });

    const checkContext = ( req ) => {
        // const token = req.headers.authorization;
        const token = req.headers.cookie.replace(/aces_token=/g,'');
        // console.log(token);
        // const pureToken = token.split(" ")[1];
        // console.log("first");
        // console.log(pureToken);
        try {
            const { user_id } = jwt.verify(token, `tKBw+m]$#VC"&P3_Lq:u`)
            // console.log(user_id);
          return user_id;   
        } catch (e) {
          throw new AuthenticationError(
            'Authentication token is invalid, please log in',
          )
        }
      }
        
      // const uploaded_name = (args) => app.post('/api/upload', async (req, res) => {
      //     try{
      //       const imageData = req.body.data;
      //         const uploadResponse = await cloudinary.uploader.upload(imageData, {
      //           upload_preset: "grow_media",
      //       });
      //       await UsersModel.relatedQuery('blogs').insert({"bluser_id": args.user_id, "b_image": uploadResponse.public_id+'.'+uploadResponse.format,"heading": args.blog_heading, "content": args.blog_content});
      //       res.send(uploadResponse);
      //       return (true);
      //     }
      //     catch(error){
      //       console.log(error);
      //       return 0;
      //     }
      //   });
        
    const dir = path.join(__dirname,'../photos');

    // app.use((req,_, next) => {
    //   // const aces_token = req
    //   console.log(req);
    //   next();
    // });
    
    // app.use('/',(req,res,next) => {

    //     const jwtToken = jwt.sign({
    //         "user_id": 51
    //     },"secret123", { expiresIn: '1d' });

    //     res.cookie("access-token",jwtToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly:true});
    //     next();
    // })
    // response.cookie("access-token",jwtToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly:true});

    // app.use((req, next) => {
    //     const accessToken = req.cookies["access-token"];
    //     try {
    //       const data = verify(accessToken, `y9-xs"=!<"R&mCT4F.,T`);
    //       (req).userId = data.user_id;
    //     } catch {}
    //     next();
    // });

    app.use('/uploads', express.static(dir));
    
    // app.get('/uploads', async (req, res) => {
    //     res.end();
    //     // res.send(express.static(dir));
    // });

    // app.get('/', async (req, res) => {
    //     const ideas = await Users.query()
    //     res.json(ideas)
    // });

    app.get('/user', async (req, res) => {
        // const {id} = req.params;
        // const ideas = await BlogsModel.query().withGraphFetched('bcomments.[replyComments]');
        const ideas = await BlogsModel.query().withGraphFetched('users').modifyGraph('users', whereUser => { whereUser.select('user_id', 'profile_img', 'username') });
        // const ideas = await Blogs.query().select('blogs.*').where('buser_id',id);
        res.json(ideas);
    });

    app.get('/read', async (req, res) => {
        // const {id} = req.params;
        // let userInfo = await UsersModel.query().withGraphFetched('blogs').where('user_id','=',id);
        //     let numberOfBlogs = await BlogsModel.query().count('blog_id').where('bluser_id', '=', id);
            // let ok = await BlogsModel.query().where('blog_id','=',id).withGraphFetched('[users,bcomments.[blogsComUsers,replyComments.[replyUsers]]]');
            // const ok = await bCommentLikesModel.query().count('bluser_id as a').where('bcomment_id', id);
            // const ok = await BlogsModel.query().where('blog_id','=',id).withGraphFetched('[users,bcomments.[blogsComUsers,bcommentLikesb,replyComments.[replyUsers]]]').where('bluser_id',userId);
            // // });

            // const ok = await BlogsModel.query().withGraphFetched('[users, blikes]')
            // .modifyGraph('users', whereUser => { whereUser.select('user_id', 'profile_img', 'username') })
            // .modifyGraph('blikes',builder=>{
            //   builder.select('blblog_id', BlogLikesModel.relatedQuery('blogsLikesBlogs').count('blblog_id').as('totallike'));  
            // });

        //     select  blogs.blog_id, blogs.heading, blogs.content, blogs.b_image,
        //     users.user_id, users.profile_img, users.username,
        //         count(distinct blikes.blike_id) as totalblikes ,
        //         count(distinct bcomments.bcomment_id) as totalbcomments
        // from	blogs
        // right join users on blogs.bluser_id = users.user_id 
        // right join blikes on blogs.blog_id = blikes.blblog_id
        // right join bcomments on bcomments.blblog_id = blogs.blog_id

        // group by blogs.blog_id

            const ok = await BlogsModel.query().select('blogs.blog_id', 'blogs.heading', 'blogs.content', 'blogs.b_image', 'users.user_id', 'users.profile_img', 'users.username')
            .countDistinct('blikes.blike_id', {as: 'totalblikes'})
            .countDistinct('bcomments.bcomment_id', {as: 'totalbcomments'})
            .from('blogs')
            .rightJoin('users', function(){
              this
              .on('blogs.bluser_id', '=', 'users.user_id ')
            })
            .rightJoin('blikes', function(){
              this
              .on('blogs.blog_id', '=', 'blikes.blblog_id')
            })
            .rightJoin('bcomments', function(){
              this
              .on('blogs.blog_id', '=', 'bcomments.blblog_id')
            })
            .groupBy('blogs.blog_id');
              
            
              // const ok = await BlogCommentsModel.query().where('blblog_id','=',id).withGraphFetched('[blogsComUsers,replyComments.[replyUsers],bcommentLikesb]').modifyGraph('bcommentLikesb',builder => { 
              //   builder.where('bluser_id','=',user_id);
              // }); 
              // is liked
              // allcmnt(?liked)

              // const ok = await BlogsModel.query().where('blog_id','=',id).withGraphFetched('[users,bcomments.[blogsComUsers,bcommentLikesb,replyComments.[replyUsers]]]').modifyGraph('bcomments',builder => {
              //   builder.select('bcomment_id','blcomment',BlogCommentsModel.relatedQuery('bcommentLikesb').count().as('totalBlogComments'));
              // });
              // take total
              
              // allcomment + counts


              // const ok = await BlogCommentsModel.query().where('blblog_id','=',id)


              // const ok = await BlogCommentsModel.query().where('blblog_id','=',id).withGraphFetched('[blogsComUsers,replyComments.[replyUsers],bcommentLikesb]').modifyGraph().count('bcommentLikesb')
                

              // const ok = await BlogsModel.query().where('blog_id','=',id).withGraphFetched('users');

              // const ok = await bCommentLikesModel.query().where('blog_id',id).where('bluser_id','=',user_id);


              // await BlogsModel.query().where('blog_id','=',args.id).withGraphFetched('[users,bcomments.[blogsComUsers,bcommentLikesb,replyComments.[replyUsers]]]').modifyGraph('bcomments',builder => {
              //   builder.select('bcomment_id','blcomment',BlogCommentsModel.relatedQuery('bcommentLikesb').count().as('totalBlogComments'));
              // });
            // const ok = await BlogsModel.query().where('blog_id','=',id).withGraphFetched('[bcomments.[blogsComUsers,bcommentLikesb,replyComments.[replyUsers]]]').modifyGraph('bcommentLikesb',builder => {
            //   builder.select(bCommentLikesModel.relatedQuery('bcommentLikesb').count().as('totallikes'));
            // });
            // const ok = await BlogCommentsModel.query().where('bcomment_id','=',id).withGraphFetched('[blogsComUsers, blogsCom, replyComments, bcommentLikesb]').modifyGraph('bcommentLikesb',builder => {
            //   builder.select(bCommentLikesModel.relatedQuery('bcommentLikesb').count().as('totalLikes'));
            // });
        // const usersblog = await Blogs.query().withGraphFetched('users').where('buser_id','=',id);
        // const usersblog = await Users.query().withGraphFetched('blogs').where('user_id','=',id);
        // const usersblog = await Users.relatedQuery('blogs').findById(id);
        // const usersblog = await FriendsModel.query().select('uUser_id').where('followers_id',id).withGraphFetched('friendsUsers');
        // const usersblog = await FriendsModel.query().select('followers_id').where('uUser_id',id).withGraphFetched('friendsFollowers');
        // const usersblog = await Users.query().findById(id);
        // const usersblog = await BlogsModel.query().where('blog_id','=',id).withGraphFetched('[bcomments.[blogsComUsers,replyComments.[replyUsers]]]');
        // const usersblog = await UsersModel.query().where('username',id).andWhere('password',password);
        // const usersblog = await BlogsModel.query().where('bluser_id',id);
        // const usersblog = await UsersModel.query().withGraphFetched('blogs').where('user_id','=',id);
        // const usersblog = await UsersModel.query().where('username', id);
        // const usersblog = await FriendsModel.query().select('followers_id').where('uUser_id',id).withGraphFetched('friendsFollowers').withGraphFetched('blogs');
        // const tiko = await usersblog.$relatedQuery(blogs);
        // const usersblog = await UsersModel.query().select('bio','link').where('user_id', id);
        // const usersblogei = await ExtraInfoModel.query().where('bluser_id', id);
        // const usersblogei = await UsersModel.query().where('user_id', id).withGraphFetched('usersExtraInfo');
        // await usersblog.$relatedQuery('blogs');
        // console.log(usersblog.length === 0);
        // const addblog = [...usersblog, ...usersblogei];
        // console.log(usersblog[0].password);
        // userInfo = {...userInfo,...numberOfBlogs};
        console.log(ok);
        res.json(ok);
        // res.json(ok.map((el)=>{
        //   return el.blikes.length;
        // }));
    });

    // BlogsModel.query().where('blog_id','=',args.id).withGraphFetched('[users,bcomments.[blogsComUsers,replyComments.[replyUsers]]]');

    // app.post('/post', async (req, res) => {
    //     // creates a new idea from the request body
    //     // only allows the idea and creator fields for safety
    //     // const newIdea = ;
    //     const idea = await Users.query().insert(req.body);
    //     res.json(req.body);
    //   })

    // app.use(cors());
    // app.use('/graphql', graphqlHTTP({
    //     schema,
    //     rootValue: root,
    //     graphiql: true
    // }));
    await server.start();
    server.applyMiddleware({app, path: "/graphql", cors: false })

    app.listen(3001, () => {
        console.log("SERVER RUNNING ON PORT 3001");
    });

};

main().catch((err) => {
    console.log(err);
});