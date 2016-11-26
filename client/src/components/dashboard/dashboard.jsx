import React, { Component } from 'react'

// components
import JobsMap from '../map/map'

// containers
import VisibleSearch from '../../redux/containers/search'
import VisibleModals from '../../redux/containers/modals'
import VisibleNavbar from '../../redux/containers/navbar'

// toast
import Notifications, {notify} from 'react-notify-toast'

class Dashboard extends Component {

  constructor () {
    super()
    this.handleNewJob = this.handleNewJob.bind(this)
  }

  newJobCB () {
    this.props._uiActions.showNewJob()
  }

  handleNewJob () {
    this.props._uiActions.showNewJob()
  }

  render () {
    return (
      <div>
        <VisibleModals />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3 leftjob' style={{height: 100 + 'vh'}}>
              <VisibleNavbar />
              <VisibleSearch />
              {this.props.jobs.length > 0
                ? <div>{renderJobs(this.props.jobs, this)}</div>
                : <div className='text-md-center noresults'>No jobs found<br />Search above to try again..</div>}
            </div>
            <div className='col-md-9'>
              <div style={{height: 100 + 'vh'}}>
                <JobsMap
                  ref='map'
                  center={this.props.searchLoc}
                  jobs={this.props.jobs}
                  newJobCB={this.handleNewJob} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function renderJobs (jobs, component) {
  if (jobs.length > 0) {
    return jobs.map((job, index) => (
      <Job key={index} job={job} jobs={jobs} parent={component} />
        ))
  }
  else return []
}

const Job = ({job, parent, jobs}) => {
  return (
    <div id={job.id} className='card text-md-center jobresult'
      onMouseOver={() => parent.props._uiActions.changeLocation({
        lat: job.lat,
        lng: job.lng
      })}>
      <div className='card-block'>
        <blockquote className='card-blockquote'>
          <p>{job.description}</p>
          <footer >
            {job.address}
            <br />
            <br /><button onClick={() => parent.props._uiActions.showJob(job.id, jobs)} className='btn btn-primary'>{job.hourly_rate / 100 + '$/hr '}Details</button>
          </footer>
        </blockquote>
      </div>
    </div>
  )
}

export default Dashboard
