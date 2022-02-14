const express = require('express');
const path = require('path');
const {ApolloServer} = require('apollo-server-express');
const {BlogsModel} = require('../sqlDB/models/blogsModel')


const {typeDefs} = require('./nSchema/typeDef');
const {resolvers} = require('./nSchema/resolver');
const { UsersModel } = require('../sqlDB/models/users');
const { FriendsModel } = require('../sqlDB/models/friends');
// const { default: knex } = require('knex');
// const cors = require('cors');

const main = async () => {

    const server = new ApolloServer({typeDefs, resolvers});

    const app = express();
    app.use(express.json());

    const dir = path.join(__dirname,'../photos');

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
        const usersblog = await BlogsModel.query().where('blog_id','=',id).withGraphFetched('[users,bcomments.[replyComments]]');
        // const usersblog = await FriendsModel.query().select('followers_id').where('uUser_id',id).withGraphFetched('friendsFollowers').withGraphFetched('blogs');
        // const tiko = await usersblog.$relatedQuery(blogs);
        // await usersblog.$relatedQuery('blogs');
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
    server.applyMiddleware({app})

    app.listen(3001, () => {
        console.log("SERVER RUNNING ON PORT 3001");
    });

};

main().catch((err) => {
    console.log(err);
});