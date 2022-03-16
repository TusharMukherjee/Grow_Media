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
// const { response } = require('express');

const app = express();
app.use(express.json());

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
        console.log(token);
        // const pureToken = token.split(" ")[1];
        console.log("first");
        // console.log(pureToken);
        try {
            const { user_id } = jwt.verify(token, `tKBw+m]$#VC"&P3_Lq:u`)
            console.log(user_id);
          return user_id;   
        } catch (e) {
          throw new AuthenticationError(
            'Authentication token is invalid, please log in',
          )
        }
      }
    

    const dir = path.join(__dirname,'../photos');

    
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

    app.get('/user/:id', async (req, res) => {
        const {id} = req.params;
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
        const usersblog = await UsersModel.query().where('username', id);
        // const usersblog = await FriendsModel.query().select('followers_id').where('uUser_id',id).withGraphFetched('friendsFollowers').withGraphFetched('blogs');
        // const tiko = await usersblog.$relatedQuery(blogs);
        // await usersblog.$relatedQuery('blogs');
        console.log(usersblog.length === 0);
        // console.log(usersblog[0].password);
        res.json(usersblog);
    });

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