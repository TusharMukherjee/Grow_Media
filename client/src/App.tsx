import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import MainSearch from './components/searchComponents/MainSearch';
import Userhome from './components/searchComponents/Userhome';
import People from './components/searchComponents/People';
import Posts from './components/Posts';
import Tabs from './components/searchComponents/Tabs';
import Searchposts from './components/Searchposts';
import Followingspost from './components/Followingspost';
import Editprofile from './components/Editprofile';
import About from './components/About';
// import Readblog from './components/Readblog';
import Addblog from './components/Addblog';

// import Auth from './components/Auth'

// import {GET_ALL_BLOGS} from './gqlQueries/queries/Explorequery'
// import { useQuery } from '@apollo/client';
import Signup from './components/Signup';
// import Rootpage from './components/Rootpage';
import Login from './components/Login';
// import RequireAuth from './components/RequireAuth';
import HomePosts from './components/HomePosts';
import Readblog from './components/Readblog';
import {ProtectiveRoute} from './ProtectiveRoute'
// import { FROM_COOKIE } from '../gqlQueries/mutations/Allmutation'
import { useMutation } from '@apollo/client'
// const Readblog = React.lazy(() => import('./components/Readblog'));

type verifyjwtFunc = {
  verifyjwtFunc:{
      userId: Number
  }
}


function App() {

  const link = createHttpLink({
    uri: 'http://localhost:3001/graphql',
    credentials: 'include'
  })

  // #Apollographql authentication


  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });

  // const [checkMutation] = useMutation<verifyjwtFunc>(FROM_COOKIE,{onCompleted(data){
  //     console.log(data);
  //     // console.log(location);
  //     // if(location.pathname === `/login` || location.pathname === `/`){
  //     //  navigate(`/home`);
  //     // }
  // }})

  // useEffect(() =>{
  //     checkMutation();
  // },[]);   

  return (
    <ApolloProvider client={client}>
          <Router>
          <div>
          <div>
              {/* <Userhome/> */}
              <Routes>
              <Route path='/' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              
              <Route path = '/' element={<Navbar/>}>
                <Route path = "profile" element={ <Userhome/>}>
                  <Route path = ":profile_id" element={<> <ProtectiveRoute path='/profile/:profile_id'><HomePosts/></ProtectiveRoute> </>}/>
                  <Route path = "about/:profile_id" element={<> <ProtectiveRoute path='/about/:profile_id'><About/></ProtectiveRoute></>}/>
                </Route>
                </Route>
                <Route path = '/' element={<Navbar/>}>
                <Route path = "/read/:blog_id" element={<ProtectiveRoute path='/read/:blog_id'><Readblog/></ProtectiveRoute>}/>
                <Route path = "/search/people" element={<><ProtectiveRoute path="/search/people"><People/></ProtectiveRoute></>}/>
                <Route path = "/search/blogs" element={<><ProtectiveRoute path="/search/blogs"><Searchposts/></ProtectiveRoute></>}/>
                <Route path = "/explore" element={<><ProtectiveRoute path="/explore"><Posts /></ProtectiveRoute></>}/>
                <Route path = "/home" element={<><ProtectiveRoute path="/home"><Followingspost/></ProtectiveRoute></>}/>
                <Route path = "/editprofile" element={<><ProtectiveRoute path="/editprofile"><Editprofile/></ProtectiveRoute></>}/>
                <Route path = "/addblog" element={<><ProtectiveRoute path="/addblog"><Addblog/></ProtectiveRoute></>}/>
              </Route>
              {/* <Main/> */}
              </Routes>
          </div>
          </div>
        </Router>
        
    </ApolloProvider>
    
    
  );
}

export default App;
