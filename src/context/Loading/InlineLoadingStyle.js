
import _ from 'styled-components';
import config from 'config';

const domain = config.assets.domain;

export default function styled(component) {
  return _(component)`
    display: inline-block;
    overflow: hidden;
    min-width: 75px;
    min-height: 75px;
    margin-top: 0;
    margin-bottom: 0;

    > .img {
      display: block;
      width: 100%;
      height: 100%;
      background-image: url('${domain}/loading_small.png');
      background-repeat: no-repeat;
      background-position: 50% 50%;
      animation: spin 1s linear infinite;
      @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
    }
  `;
}
