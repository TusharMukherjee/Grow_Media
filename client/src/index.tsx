import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import MainSearch from './components/searchComponents/MainSearch';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Navbar/>
      <div className='grid grid-cols-8'>
        <Sidebar/>
        <MainSearch/>
        {/* <Main/> */}
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
