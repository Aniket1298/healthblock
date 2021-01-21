  
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import RegisterPage from './register'
import UploadPage from './upload'
import ReportsPage from './reports'
import ProviderPage from './provider'
import CovidReportUploadPage from './covidReportUpload'
import CovidReportsPage from './covidreports'
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/upload" component={UploadPage} />
      <Route exact path="/reports" component={ReportsPage} />
      <Route exact path="/provider" component={ProviderPage} />
      <Route exact path="/covidreports" component={CovidReportsPage} />
      <Route exact path="/covidupload" component={CovidReportUploadPage} /> 
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))



reportWebVitals();
