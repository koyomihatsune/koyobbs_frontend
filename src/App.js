import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './_components/auth/Login'
import Background from './_components/background/Background';
import Register from './_components/auth/Register';

function App() {
  return (
    <div>
      <div className="App" style={{position: 'relative',
                zIndex: '1'}} >
            <h1>Boring Bulletin Site</h1>
            <h2>Trang Tin tức Nhạt nhẽo</h2>
            <h2>ボリング・ブレーチン・サイト</h2>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Routes>
      </div>
      <Background style={{position: 'relative',
                zIndex: '2'}}/>
    </div>
    
  );
}

function Home() {
  return (
    <>
      <main>
        <p>Bạn không thể làm được. Tôi tin tưởng vào bạn.</p>
      </main>
      <nav>
        <Link to="/login">Login</Link>
      </nav>  
    </>
  );
}


export default App;
