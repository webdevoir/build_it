import React, { Component } from 'react'

// services
import _jobService from '../../network/jobs'
import _authService from '../../network/auth'
import { Router, Route, hashHistory, browserHistory} from 'react-router'

// components
import NavBar from '../navbar/navbar'
import SearchBox from './search'
import JobsMap from '../map/map'

// modals
import NewJobModal from '../modals/newjob'
import LoginModal from '../modals/login-only'
import LoginSignupModal from '../modals/login-signup'
import FinishProfileModal from '../modals/finish-profile-guard'
import JobModal from '../modals/jobdetails'

// toast
import Notifications, {notify} from 'react-notify-toast'

class Dashboard extends Component {

  constructor () {
    super()
    this.state = {
      jobs: [],
      center: {
        lat: 42.3708967,
        lng: -71.236024399
      },
      selectedJob: undefined,
      loggedIn: _authService.loggedIn()
    }
    this.getJob = this.getJob.bind(this)
    this.showJobCB = this.showJobCB.bind(this)
    this.loginCB = this.loginCB.bind(this)
  }

  loginCB (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  }

  handleSearch (coords, status, searchComponent) {
    if (status) {
      this.setState({
        center: coords
      })
      _jobService.getJobs(coords)
        .then((res) => {
          this.setState({
            jobs: res
          })
          searchComponent.setState({
            loading: false
          })
        })
    } else {
      notify.show('Search Failed, Invalid Address :(', 'error', 2000)
    }
  }

  markerClickedCB (marker) {
    
  }

  showJobCB (jobInfoElement) {
    var $ = window.$
    var jobId = jobInfoElement.id
    this.setState({
      selectedJob: this.getJob(Number(jobId))
    })
    $('#jobModal').modal('show')
  }

  navigate (data) {
    var $ = window.$
    switch (data) {
      case 'logout':
        _authService.logout()
        this.loginCB(false)
        notify.show('Successfully logged out.', 'success', 2000)
        break
      case 'login':
        browserHistory.push('/')
        $('#signupModal').modal('show')
        break
      case 'dashboard':
        browserHistory.push('/dashboard')
        break
      case 'profile':
        $('#profileModal').modal('show')
        break
    }
  }

  newJobCB () {
    var $ = window.$
    if (_authService.loggedIn()) {
      _authService.check(function (finished) {
        if (finished) {
          $('#newJobModal').modal('show')
        } else {
          $('#profileModal').modal('show')
        }
      })
    } else {
      $('#signupModal').modal('show')
    }
  }

  focusJob (jobId) {
    for (let job in this.state.jobs) {
      var j = this.state.jobs[job]
      if (j.id === jobId) {
        this.setState({
          center: {
            lat: j.lat,
            lng: j.lng
          }
        })
      }
    }
  }

  getJob (jobId) {
    for (let job in this.state.jobs) {
      var j = this.state.jobs[job]
      if (jobId === j.id) {
        return j
      }
    }
    return null
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3 leftjob' style={{height: 100 + 'vh'}}>
            <NavBar loggedIn={this.state.loggedIn} navigateFunc={this.navigate.bind(this)} />
            <SearchBox searchFunc={this.handleSearch.bind(this)} />
            {this.state.jobs.length > 0
              ? <div>{renderJobs(this.state.jobs, this)}</div>
              : <div className='text-md-center noresults'>No jobs found<br />Search above to try again..</div>}
          </div>
          <div className='col-md-9'>
            <div style={{height: 100 + 'vh'}}>
              <JobsMap
                center={this.state.center}
                jobs={this.state.jobs}
                markerCB={this.markerClickedCB.bind(this)}
                newJobCB={this.newJobCB.bind(this)}
                showJobCB={this.showJobCB.bind(this)} />
            </div>
            <JobModal
              selectedJob={this.state.selectedJob} />
            <NewJobModal />
            <LoginModal />
            <LoginSignupModal loginCB={this.loginCB.bind(this)} />
            <FinishProfileModal />
          </div>
        </div>
      </div>
    )
  }
}

function renderJobs (jobs, component) {
  if (jobs.length > 0) {
    return jobs.map((job, index) => (
      <Job key={index} job={job} parent={component} />
        ))
  }
  else return []
}

const Job = ({job, parent}) => {
  return (
    <div id={job.id} className='card text-md-center' onMouseOver={() => parent.focusJob(job.id)}>
      <div className='card-header'>
        {job.title}
      </div>
      <div className='card-block'>
        <blockquote className='card-blockquote'>
          <p>{job.description}</p>
          <footer >
            {job.address}
            <br />
            {job.hourly_rate / 100 + '$/hr'}<button className='btn btn-primary'>Details</button>
          </footer>
        </blockquote>
      </div>
    </div>
  )
}

export default Dashboard
