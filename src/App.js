import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

const Layout = () => {
  return(
    <div>
      <Nav />

      <Outlet />
    </div>
  )
}

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LoginPage />}></Route>
          <Route path='main' element={<MainPage />}></Route>
          <Route path=':movieId' element={<DetailPage />}></Route>
          <Route path='search' element={<DetailPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;