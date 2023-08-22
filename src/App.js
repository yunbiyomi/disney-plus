import './App.css';
import Banner from './components/Banner';
import Category from './components/Category';
import Nav from './components/Nav';
import styled from 'styled-components'

function App() {
  return (
    <div className="App">
      <Container>
        <Nav/>
        <Banner/>
        <Category/>
      </Container>
    </div>
  );
}

export default App;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-y: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &::after {
    background: url('/images/home-background.png') center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;