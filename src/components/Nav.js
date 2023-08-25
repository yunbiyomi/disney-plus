import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

const Nav = () => {
  const initialUserData = localStorage.getItem('userData') ?
  JSON.parse(localStorage.getItem('userData')) : {};

  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState(initialUserData);
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        if(pathname === '/')
          navigate('/main');
      }
      else
        navigate('/');
    })
  }, [auth, navigate, pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[])

  const handleScroll = () => {
    window.scrollY > 50 ? setShow(true) : setShow(false);
  }


  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      setUserData(result.user);
      localStorage.setItem('userData', JSON.stringify(result.user));
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUserData({});
      navigate('/');
    })
    .catch((error) => {console.log(error);
    })
  }

  return (
    <NavWrapper className={show ? "show" : ""}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}></img>
      </Logo>
      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : 
        <>
          <Input 
            value={searchValue}
            onChange={handleChange}
            className='nav_input' 
            type='text' 
            placeholder='영화를 검색해주세요.'/>
          <SignOut onClick={handleLogOut}>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span>SignOut</span>
            </DropDown>
          </SignOut>
        </>
      }
    </NavWrapper>
  )
}

export default Nav;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;

  &.show {
    background-color: #090b13;
  }
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, .6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all .2s ease 0s;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, .582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;

  &:focus {
    border: 1px solid white;
    outline: none;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;