const express = require('express');
const path = require('path');
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


    app.get('/read/:id/:user_id', async (req, res) => {
        const {id,user_id} = req.params;
        const ok = "ok"
        console.log(ok);
        res.json(ok);
        // res.json(ok.map((el)=>{
        //   return el.blikes.length;
        // }));
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