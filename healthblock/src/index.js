 
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
import GrantAccess from './doctorAcces'
import AddPrescription from './prescription'
import TestPage from './testpage'
import DoctorPage from './doctor' 
import UploadReportPage from './uploadReport'
import DoctorReports from './dreports'
import UploadPres from './uploadPres'
import PatientPrescriptions from './presforPat'
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/upload" component0={UploadPage} />
      <Route exact path="/reports" component={ReportsPage} />
      <Route exact path="/provider" component={ProviderPage} />
      <Route exact path="/covidreports" component={CovidReportsPage} />
      <Route exact path="/covidupload" component={CovidReportUploadPage} /> 
      <Route exact path="/grantaccess" component={GrantAccess} /> 
      <Route exact path="/addpres" component={AddPrescription} /> 
      <Route exact path="/test" component={TestPage} /> 
      <Route exact path="/doctor" component={DoctorPage} /> 
      <Route exact path="/uploadreport" component={UploadReportPage} />
      <Route exact path="/dreports" component={DoctorReports} />
      <Route exact path="/uploadpres" component={UploadPres} />
      <Route exact path="/patpres" component={PatientPrescriptions} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
reportWebVitals();
