import React from 'react';
import ReactDOM from 'react-dom';
import Blog from './components/Blog';
import { requireAuth } from './utils/AuthService';
import Callback from './utils/Callback';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={Blog}/>
        <Route path="/special" component={Blog} onEnter={requireAuth} />
      </Router>
    </div>
  )
}

ReactDOM.render(<Blog />, document.getElementById('root'));
registerServiceWorker();
