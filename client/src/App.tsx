import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

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

import Auth from './components/Auth'

// import {GET_ALL_BLOGS} from './gqlQueries/queries/Explorequery'
// import { useQuery } from '@apollo/client';
import Signup from './components/Signup';
// import Rootpage from './components/Rootpage';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import HomePosts from './components/HomePosts';
const Readblog = React.lazy(() => import('./components/Readblog'));





function App() {



  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3001/graphql",
  });





  return (
    <ApolloProvider client={client}>
      <Auth>
          <Router>
          <div>
          <div>
              {/* <Userhome/> */}
              <Routes>
              <Route path='/' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              
              <Route path = '/' element={<Navbar/>}>
                <Route path = "profile" element={<RequireAuth> <Userhome/> </RequireAuth>}>
                  <Route path = ":profile_id" element={<RequireAuth> <> <div className='col-start-2 col-span-6 grid grid-cols-8'> <div className='col-start-2 col-span-6 flex flex-col justify-center items-center'> <HomePosts/> </div> </div> </> </RequireAuth>}/>
                  <Route path = "about/:profile_id" element={<RequireAuth> <> <div className='col-start-2 col-span-6 grid grid-cols-8'> <About/> </div> </> </RequireAuth>}/>
                </Route>
                <Route path = "/read/:blog_id" element={<RequireAuth> <React.Suspense fallback=''> <Readblog/> </React.Suspense> </RequireAuth>}/>
                <Route path = "/search/people" element={<RequireAuth> <> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col'><People/></div> </div>  </> </RequireAuth>}/>
                <Route path = "/search/blogs" element={<RequireAuth> <> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col'><Searchposts/></div> </div>  </> </RequireAuth>}/>
                <Route path = "/explore" element={<RequireAuth> <> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col mt-6'><Posts /></div> </div>  </> </RequireAuth>}/>
                <Route path = "/home" element={<RequireAuth> <> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col mt-6'><Followingspost/></div> </div>  </> </RequireAuth>}/>
                <Route path = "/editprofile" element={<RequireAuth> <> <div className='grid grid-cols-8 '> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col my-8'><Editprofile/></div> </div>  </> </RequireAuth>}/>
                <Route path = "/addblog" element={<RequireAuth> <> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col py-8 h-full'><Addblog/></div> </div>  </> </RequireAuth>}/>
              </Route>
              {/* <Main/> */}
              </Routes>
          </div>
          </div>
        </Router>
      </Auth>
        
    </ApolloProvider>
    
    
  );
}

export default App;
