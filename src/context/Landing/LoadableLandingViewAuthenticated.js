
import Loadable from 'react-loadable';
import Interim from '../Interim';

const LoadableLandingViewAuthenticated = Loadable({
  loader: () => import(/* webpackChunkName: "LandingViewAuthenticated" */'./LandingViewAuthenticated'),
  loading: Interim,
});

export default LoadableLandingViewAuthenticated;
