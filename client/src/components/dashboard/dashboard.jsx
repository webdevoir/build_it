import React, { Component } from 'react'
import { Link } from 'react-router'
import NavBar from '../navbar/navbar'
import _jobService from '../../network/jobs'
import SearchBox from './search'
// import {GoogleMap,Marker,InfoWindow} from 'react-google-maps'
import JobsMap from '../map/map'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      jobs: [],
      markers: [],
      center: {
        lat: 42.3708967,
        lng: -71.236024399
      }
    }
  }
  componentDidMount () {

  }
  handleSearch (coords) {
    this.setState({
      center: coords
    })
    _jobService.getJobs(coords)
      .then((res) => {
        console.log(res)
        this.setState({
          jobs: res
        })
      })
  }
  resultsToMarkers () {

  }
  render () {
    const jobs = renderJobs(this.state.jobs)
    return (
      <div>
        <SearchBox searchFunc={this.handleSearch.bind(this)} />
        Search to find jobs..
        {jobs}
        <div style={{height: 500 + 'px'}}>
          <JobsMap center={this.state.center} jobs={this.state.jobs} />
        </div>
      </div>
    )
  }
}

function renderJobs (jobs) {
  if (jobs.length > 0) {
    return jobs.map((job, index) => (
      <Job key={index} job={job} />
  )) } else {
    return []
  }
}

const Job = ({job}) => {
  return (
    <job>
      <p>{job.title}</p>
    </job>
    )
}

export default Dashboard
