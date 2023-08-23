import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Nav from '../../components/Nav';
import styled from 'styled-components'
import Row from '../../components/Row';
import requests from '../../api/request';

const MainPage = () => {
  return (
    <div className="App">
      <Container>
        <Nav/>
        <Banner/>
        <Category/>
        <Row title="새로 개봉한 영화" id="TN" fetchUrl={requests.fetchTrending}/>
        <Row title="TOP 영화" id="TR" fetchUrl={requests.fetchTopRated}/>
        <Row title="액션 영화" id="AM" fetchUrl={requests.fetchActionMovies}/>
        <Row title="코미디 영화" id="CM" fetchUrl={requests.fetchComedyMovies}/>
        <Row title="다큐멘터리 영화" id="DM" fetchUrl={requests.fetchDocumentaries}/>
        <Row title="공포 영화" id="HM" fetchUrl={requests.fetchHorrorMovies}/>
        <Row title="로맨스 영화" id="RM" fetchUrl={requests.fetchRomanceMovies}/>
      </Container>
    </div>
  );
}

export default MainPage;

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