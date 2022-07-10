import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Userhome from './components/Userhome';
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
import { useDispatch } from 'react-redux'
import { logIn, mobiledis } from './features/UserSlice'
import PrivateRoute from './PrivateRoute';

type verifyjwtFunc = {
  verifyjwtFunc:{
     user_id: number 
  }
}


function App() {

  const dispatchJwt = useDispatch();

  const [callLazy,{data, loading}]=useLazyQuery<verifyjwtFunc>(FROM_COOKIE);

  useEffect(()=>{
    callLazy();
    if(data){
      dispatchJwt(logIn(data?.verifyjwtFunc))
    }
    (window.innerWidth < 640)? dispatchJwt(mobiledis(true)):dispatchJwt(mobiledis(false))

  },[data,callLazy,dispatchJwt])

    // window.addEventListener("load", () => {
    //   hasNetwork(navigator.onLine);
    //   console.log(navigator.onLine,"4848");
  
    //   window.addEventListener("online", () => {
    //     // Set hasNetwork to online when they change to online.
    //     hasNetwork(true);
    //   });
  
    //   window.addEventListener("offline", () => {
    //     // Set hasNetwork to offline when they change to offline.
    //     hasNetwork(false);
    //   });
    // });

  // function hasNetwork(online:boolean) {
  //   window.onload = () =>{
  //   const element = document.querySelector(".status");
  //   // Update the DOM to reflect the current status
  //   if (!navigator.onLine) {
  //     // element?.classList.remove("online");
  //     // element?.classList.add("offline");
  //     element!.textContent = "Offline";
  //     console.log(navigator.onLine);
  //   }
  //   else{
  //     element!.textContent = "online";
  //     console.log(navigator.onLine);
  //   }
  // }
  // }

  return ( loading ? <div className='bg-teal-500 w-screen h-screen grid place-items-center'><div className=' h-32 w-32 border-white rounded-full border-t-[1rem] border-[1rem] border-t-teal-900 animate-spin ' ></div></div>:
          <Router>
              <Routes>
              <Route path='/' element={ <Signup/> }/>
              <Route path='/login' element={<Login/>}/>
                <Route path = '/' element={<><Navbar/></>}>
                  <Route path = "profile" element={ <Userhome/>}>
                    <Route path = ":profile_id" element={<> <PrivateRoute path='/profile/:profile_id'><HomePosts/></PrivateRoute> </>}/>
                    <Route path = "about/:profile_id" element={<> <PrivateRoute path='/about/:profile_id'><About/></PrivateRoute></>}/>
                  </Route>
                <Route path = "/read/:blog_id" element={<PrivateRoute path='/read/:blog_id'><Readblog/></PrivateRoute>}/></Route>
                <Route path = '/' element={<><Navbar/> <div className=' status text-center bg-red-600 text-white'></div></>}>
                  <Route path = "/search/people/:searchquery" element={<><PrivateRoute path="/search/people"><People/></PrivateRoute></>}/>
                  <Route path = "/search/blogs/:searchquery" element={<><PrivateRoute path="/search/blogs"><Searchposts/></PrivateRoute></>}/>
                  <Route path = "/explore" element={<><PrivateRoute path="/explore"><Posts /></PrivateRoute></>}/>
                  <Route path = "/home" element={<><PrivateRoute path="/home"><Followingspost/></PrivateRoute></>}/>
                  <Route path = "/editprofile" element={<><PrivateRoute path="/editprofile"><Editprofile/></PrivateRoute></>}/>
                  <Route path = "/addblog" element={<><PrivateRoute path="/addblog"><Addblog/></PrivateRoute></>}/>
                </Route>
              </Routes>
        </Router>
        
        
  )
}

export default App;