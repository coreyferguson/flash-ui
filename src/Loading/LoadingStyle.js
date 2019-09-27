
import _ from 'styled-components';
import config from 'config';

const domain = config.assets.domain;

export default function styled(component) {
  return _(component)`
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;

    > .img {
      display: block;
      width: 100%;
      height: 100%;
      @media screen and (max-width: 799px) {
        background-image: url('${domain}/loading_medium.png');
        background-size: auto 30%;
      }
      @media screen and (min-width: 800px) {
        background-image: url('${domain}/loading_large.png');
        background-size: auto 50%;
      }
      background-repeat: no-repeat;
      background-position: 50% 50%;
      animation: spin 20s linear infinite;
      @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
    }
  `;
}
