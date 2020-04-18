import styled from 'styled-components';

export const LabelsStyle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 20px;
  align-items: baseline;
  padding: 20px;
  > span {
    margin-right: 10px;
  }
  > input {
    flex-grow: 1;
  }
`;

export const MenuStyle = styled.menu`
  margin: 0;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const SidesStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const SideStyle = styled.div`
  flex-grow: 1;
  padding: 20px;
  min-width: 350px;
  textarea {
    width: 100%;
  }
  img {
    height: 100px;
  }
`;