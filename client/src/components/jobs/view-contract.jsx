import React, { Component } from 'react'

class Contract extends Component {
  constructor () {
    super()
    this.state = {
      selectedJob: undefined,
      contract: undefined
    }
  }

  render () {
    return (
      <div>
        {this.state.contract
        ? <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header'><h4>{this.state.selectedJob.title}</h4></div>
                <div className='card-block'>
                  <div className='row'>
                    <div className='col-md-3 profileimg'>
                      <img className='img-circle' src={'https://builditreact.s3.amazonaws.com/uploads/user/avatar/' + this.state.selectedJob.user_id + '/image.png'} />
                    </div>
                    <div className='col-md-9'>
                      <p className='card-text'>{this.state.selectedJob.description}</p>
                    </div>
                  </div>
                  <hr />
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><i className='fa fa-map-marker fa-3x' aria-hidden='true' /><span className='details-li'>{this.state.selectedJob.address}</span></li>
                    <li className='list-group-item'><i className='fa fa-money fa-3x' aria-hidden='true' /><span className='details-li'>{this.state.selectedJob.hourly_rate / 100 + '$/hr'}</span></li>
                  </ul>
                  <div className='alert alert-success text-md-center'>
                    Proposal
                    <hr />
                    {this.state.contract.proposal}
                    <hr />
                  </div>
                  {this.state.contract.accepted
                    ? <div className='alert alert-success text-md-center' role='alert'>
                      <strong>Your proposal has been accepted! Check your jobs dashboard</strong>
                    </div>
                    : <div className='alert alert-warning text-md-center' role='alert'>
                      <strong>Pending<br />Your proposal has been sent but is waiting to be accepted or denied by this jobs owner.</strong>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
      </div>
    )
  }
}
export default Contract
