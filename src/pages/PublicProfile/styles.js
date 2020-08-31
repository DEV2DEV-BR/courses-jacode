import { Container, Tabs, Chip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LeftBar = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  height: 100vh;
  align-items: center;
  justify-content: flex-start;
  width: 28%;
  background-color: #f7f2f2;

  h5 {
    text-align: center;
  }
  p {
    color: #b2adad;
  }
  hr {
    width: 100%;
    border-top: 1px solid #45c 0.3;
  }
  ul {
    width: 100%;
    list-style: none;
    padding: 0px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: 180px;
  height: 180px;
  margin-bottom: 15px;
  background-color: #d5d5d5;
  border-width: 5px;
  border-style: solid;
  border-color: #45c;
`;

export const SpaceBar = styled.div`
  height: 30px;

  @media (max-width: 450px) {
    height: 0px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 10px;

  @media (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
    padding: 0px;
  }
`;

export const StyledContentTop = styled.div`
  width: 100%;
`;

export const StyledTabs = styled(Tabs)`
  width: 100%;
  margin: 0px;
`;

export const StyledBanner = styled.img`
  width: 100%;
  margin: 0px;
`;

export const StyledChip = styled(Chip)`
  margin: 10px;
`;