import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Userhome from './components/searchComponents/Userhome';
import People from './components/searchComponents/People';
import Posts from './components/Posts';
import Searchposts from './components/Searchposts';
import Followingspost from './components/Followingspost';
import Editprofile from './components/Editprofile';
import About from './components/About';
import Addblog from './components/Addblog';

import Signup from './components/Signup';
import Login from './components/Login';
import HomePosts from './components/HomePosts';
import Readblog from './components/Readblog';
import { useLazyQuery } from '@apollo/client';
import { FROM_COOKIE } from './gqlQueries/queries/Explorequery';
import {useDispatch} from 'react-redux'
import { logIn } from './features/UserSlice'
import PrivateRoute from './PrivateRoute';

type verifyjwtFunc = {
  verifyjwtFunc:{
     user_id: Number 
  }
}


function App() {

  const dispatchJwt = useDispatch();

  const [callLazy,{data}]=useLazyQuery<verifyjwtFunc>(FROM_COOKIE);

  useEffect(()=>{
    callLazy();
    if(data){
      console.log(data);
      dispatchJwt(logIn(data?.verifyjwtFunc))
    }
  },[data])

  return (
          <Router>
          <div>
          <div>
              <Routes>
              {console.log("in cp")}
              <Route path='/' element={ <Signup/> }/>
              <Route path='/login' element={<Login/>}/>
                <Route path = '/' element={<Navbar/>}>
                <Route path = "profile" element={ <Userhome/>}>
                  <Route path = ":profile_id" element={<> <PrivateRoute path='/profile/:profile_id'><HomePosts/></PrivateRoute> </>}/>
                  <Route path = "about/:profile_id" element={<> <PrivateRoute path='/about/:profile_id'><About/></PrivateRoute></>}/>
                </Route>
                </Route>
                <Route path = '/' element={<Navbar/>}>
                <Route path = "/read/:blog_id" element={<PrivateRoute path='/read/:blog_id'><Readblog/></PrivateRoute>}/>
                <Route path = "/search/people" element={<><PrivateRoute path="/search/people"><People/></PrivateRoute></>}/>
                <Route path = "/search/blogs" element={<><PrivateRoute path="/search/blogs"><Searchposts/></PrivateRoute></>}/>
                <Route path = "/explore" element={<><PrivateRoute path="/explore"><Posts /></PrivateRoute></>}/>
                <Route path = "/home" element={<><PrivateRoute path="/home"><Followingspost/></PrivateRoute></>}/>
                <Route path = "/editprofile" element={<><PrivateRoute path="/editprofile"><Editprofile/></PrivateRoute></>}/>
                <Route path = "/addblog" element={<><PrivateRoute path="/addblog"><Addblog/></PrivateRoute></>}/>
              </Route>
              </Routes>
              
          </div>
          </div>
        </Router>
        
        
  )
}

export default App;