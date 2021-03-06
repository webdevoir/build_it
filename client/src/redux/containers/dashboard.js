import { connect } from 'react-redux'
import { getJobs } from '../actions/jobs'
import { hoverChangeSearchLocationAction, showNewJob, showJob } from '../actions/UI'
import Dashboard from '../../components/dashboard/dashboard'

const mapStateToProps = (state, ownProps) => {
  return {
    jobs: state.jobs,
    token: state.token,
    buildItId: state.buildItId,
    errors: state.errors,
    profileComplete: state.profileComplete,
    profile: state.profile,
    searchLoc: state.searchLoc,
    contract: state.contract
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _jobActions: {
      getJobs: (coords, distance) => {
        dispatch(getJobs(coords, distance))
      }
    },
    _uiActions: {
      changeLocation: (coords) => {
        dispatch(hoverChangeSearchLocationAction(coords))
      },
      showNewJob: () => {
        dispatch(showNewJob())
      },
      showJob: (id, jobs) => {
        dispatch(showJob(id, jobs))
      }
    }
  }
}

const VisibleDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default VisibleDashboard
