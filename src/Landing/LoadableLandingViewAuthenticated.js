
import Loadable from 'react-loadable';
import Loading from '../Loading';

const LoadableLandingViewAuthenticated = Loadable({
  loader: () => import(/* webpackChunkName: "LandingViewAuthenticated" */'./LandingViewAuthenticated'),
  loading: Loading,
});

export default LoadableLandingViewAuthenticated;
