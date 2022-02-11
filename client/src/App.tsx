import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

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
import Readblog from './components/Readblog';


function App() {
  return (
    <Router>
      <div>
      <div>
        <Navbar/>
          {/* <Userhome/> */}
          <Routes>
          <Route path = "/read" element={<Readblog/>}/>
          <Route path = "/profile" element={<> <Userhome/> <div className='col-start-2 col-span-6 grid grid-cols-8'> <div className='col-start-2 col-span-6 flex flex-col justify-center items-center'> <Posts/> </div> </div> </>}/>
          <Route path = "/profile/about" element={<> <Userhome/> <div className='col-start-2 col-span-6 grid grid-cols-8'> <About/> </div> </>}/>
          <Route path = "/search/people" element={<> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col'><People/></div> </div>  </>}/>
          <Route path = "/search/blogs" element={<> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col'><Searchposts/></div> </div>  </>}/>
          <Route path = "/explore" element={<> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col'><Posts/></div> </div>  </>}/>
          <Route path = "/followingspost" element={<> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col mt-8'><Followingspost/></div> </div>  </>}/>
          <Route path = "/editprofile" element={<> <div className='grid grid-cols-8'> <Sidebar/> <div className='col-start-3 col-span-6 flex flex-col mt-8'><Editprofile/></div> </div>  </>}/>
          
          {/* <Main/> */}
          </Routes>
          </div>
        </div>
    </Router>
    
  );
}

export default App;
