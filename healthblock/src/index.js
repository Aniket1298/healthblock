  
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import RegisterPage from './register'
import UploadPage from './upload'
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/upload" component={UploadPage} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))



reportWebVitals();
