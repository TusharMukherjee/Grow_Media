const express = require('express');
const {ApolloServer} = require('apollo-server-express');


const {typeDefs} = require('./nSchema/typeDef');
const {resolvers} = require('./nSchema/resolver');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json({
  limit: '200mb'
}));
app.use(express.urlencoded({
  limit: '200mb',
  extended: true 
}));


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
        //   return { id, email } = jwt.verify(token.split(' ')[1], `keycheck`)
        //   } catch (e) {
        //     throw new AuthenticationError(
        //     'Authentication token is invalid, please log in',)
        //   }
        // }
    });

    const checkContext = ( req ) => {
        // const token = req.headers.authorization;
        const token = req.headers.cookie?.replace(/aces_token=/g,'');
        // console.log(token);
        // const pureToken = token.split(" ")[1];
        // console.log("first");
        // console.log(pureToken);
        try {
            const { user_id } = jwt.verify(token, process.env.VERIFICATIONTOKEN)
            // console.log(user_id);
          return user_id;   
        } catch (e) {
          throw new Error('Authentication token is invalid, please log in with valid credentials!');
        }
      }

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