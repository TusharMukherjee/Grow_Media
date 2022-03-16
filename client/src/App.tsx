import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom'

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
import { useQuery } from '@apollo/client';
import { FROM_COOKIE } from './gqlQueries/queries/Explorequery';
import {useDispatch} from 'react-redux'
import { logIn } from './features/UserSlice'
import Forlogsign from './Forlogsign';

type verifyjwtFunc = {
  verifyjwtFunc:{
     user_id: Number 
  }
}


function App() {

  const dispatchJwt = useDispatch();
  const [userwithcookie,setUserwithcookie] = useState<verifyjwtFunc>();

  const {data}=useQuery<verifyjwtFunc>(FROM_COOKIE,{onCompleted(data){
    setUserwithcookie(data);
    console.log(userwithcookie);
    console.log(data);
    dispatchJwt(logIn(data?.verifyjwtFunc))
  }});
  console.log("first");
  console.log(userwithcookie);
  console.log(data);
  // if(!userwithcookie){
  //   navigate('/login');
  // }
  useEffect(()=>{
    console.log("first")
  },[]);

  return (<>
          <Router>
          <div>
          <div>
              <Routes>
              {console.log("in cp")}
              <Route path='/' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              {(userwithcookie != undefined) && 
              (<>{console.log("in cp")}
                <Route path = '/' element={<Navbar/>}>
                <Route path = "profile" element={ <Userhome/>}>
                  <Route path = ":profile_id" element={<HomePosts/>}/>
                  <Route path = "about/:profile_id" element={<About/>}/>
                </Route>
                </Route>
                <Route path = '/' element={<Navbar/>}>
                <Route path = "/read/:blog_id" element={<Readblog/>}/>
                <Route path = "/search/people" element={<People/>}/>
                <Route path = "/search/blogs" element={<Searchposts/>}/>
                <Route path = "/explore" element={<Posts />}/>
                <Route path = "/home" element={<Followingspost/>}/>
                <Route path = "/editprofile" element={<Editprofile/>}/>
                <Route path = "/addblog" element={<Addblog/>}/>
              </Route>
              </> )
            }
            {/* {userwithcookie == undefined && <Navigate to='/login'/>} */}
              </Routes>
              
          </div>
          </div>
        </Router>
        
        </>
  );
}

export default App;