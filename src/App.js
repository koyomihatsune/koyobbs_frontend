import './App.css';
import * as React from 'react';
import { Routes, Route, useNavigate, Redirect, Navigate} from "react-router-dom";
import { Pivot, PivotItem } from '@fluentui/react';
import { Button, Menu, MenuTrigger, MenuPopover,MenuItem, MenuList, MenuButton} from "@fluentui/react-components";

import Login from './_components/auth/Login'
import Background from './_components/background/Background';
import Register from './_components/auth/Register';
import Test from './_components/Test'
import Profile from './_components/pages/Profile';
import AllPost from './_components/pages/AllPost';
import Post from './_components/post/Post';
import NavigationBar from './_components/NavigationBar';
import { AuthContext } from './_contexts/AuthProvider';
import { useContext } from 'react';
import EditPost from './_components/pages/EditPost';
import CreatePost from './_components/pages/CreatePost';

const getTabId = (itemKey) => {
  return `ShapeColorPivot_${itemKey}`;
};

function App() {
  const {setAuth, setIsLogin, isLogin, auth} = useContext(AuthContext)

  return (
    <div>
      <div className="App" style={{position: 'relative',
                zIndex: '1', justifyContent: "center"}} >
            <h1>Bulletin Board System</h1>
            <h2>Trang Tin tức</h2>
          
            <div >
              <div style={{maxWidth:"1000px",marginLeft: "auto", marginRight: "auto"}}>
              <NavigationBar/>
              <Routes>
                <Route path="/" element={<AllPost />} />
                <Route path="me" element={<Profile />} />
                {!isLogin && <>
                  <Route path="login" element={ <Login />}/>
                  <Route path="register" element={<Register />} />
                </>}
                <Route path="post/:postID" element={<Post/>} />
               
                <Route path="test" element={<Test />} />
                {isLogin && <>
                  <Route path="new" element={<CreatePost/>} />
                  <Route path="post/:postID/edit" element={<EditPost/>} />
                </>
                }
                <Route path="*" element={<Navigate to="/" replace />} />
                
              </Routes>
              </div>
            </div>   
            <div style={{padding:150}}>
                Made by @koyomihatsune
            </div>
      </div>
      <Background style={{position: 'relative',
                zIndex: '2'}}/>
    </div>
    
  );
}


export default App;
