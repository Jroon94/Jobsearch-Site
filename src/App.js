import React, {Component} from 'react';


const RECRUITER = 'recruiter';
const CANDIDATE = 'candidate';
const OPEN = 'Open';
const TAKEN = 'Taken';

const JobCard = ({title, location, description, date, status, style}) => {
  return (
    <div className="card" style={{...style}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h3>{title}</h3>
        <p style={{color: '#555', marginLeft: 8}}>{date}</p>
      </div>
      <p style={{color: '#555', fontSize: 20}}>{location}</p>
      <p>{description}</p>
      <p style={{color: status === OPEN ? 'green' : status === TAKEN ? 'red' : '#555'}}>{status}</p>
    </div>
  );
};

class RecruiterTab extends Component {
  state = {
    title: '',
    location: '',
    description: '',
    date: '',
    status: '',
  };

  reset = () => {
    this.setState({
      title: '',
      location: '',
      description: '',
      date: '',
      status: '',
    })
  }

  onSubmit = () => {
    alert("Your job has been posted!");
  }

  onTitleNull = () => {
    alert("Please add a job title before posting.");
  }

  render() {
    return (
      <form>
        <h2>Post a job!</h2>
        <div style={{display: 'flex', marginTop: 8}}>
          <div>
            <h4>Job Title:</h4>
            <h4>Job Location:</h4>
            <h4>Job Description:</h4>
            <h4>Date:</h4>
            <h4>Job Status:</h4>
          </div>
          <div style={{marginLeft: 8}}>
            <input 
            
                onChange={e => this.setState({title: e.target.value})} 
                value={this.state.title} />
            <input 
                onChange={e => this.setState({location: e.target.value})} 
                value={this.state.location} />
            <input 
                onChange={e => this.setState({description: e.target.value})} 
                value={this.state.description} />
            <input 
                type='date'
                onChange={e => this.setState({date: e.target.value})} 
                value={this.state.date} />
            <select 
                onChange={e => this.setState({status: e.target.value})}
                value={this.state.value}
                >
                <option></option>
                <option value={OPEN}>{OPEN}</option>
                <option value={TAKEN}>{TAKEN}</option>
            </select>
          </div>          
          
          <div style={{marginLeft:32}}>
            <h4>Preview:</h4>
            <JobCard 
                title={this.state.title}
                location={this.state.location}
                description={this.state.description}
                date={this.state.date}
                status={this.state.status}
                style={{marginTop: 8}} />
          </div>
        </div>        

        <button type='submit' className='button' onClick={(e) => {
          e.preventDefault();
          if (!this.state.title) {
            this.onTitleNull();
            return;
          }
          this.props.postJob(this.state);
          this.reset();
          this.onSubmit();
        }}>Post!</button>
      </form>
    );
  }
}

class CandidateTab extends Component {
  render() {
    if (this.props.jobs && this.props.jobs.length === 0) return <div>No jobs available at the moment!</div>;
    return this.props.jobs.map((job, i) => <JobCard key={i} {...job} style={{marginTop: 16}} />);
  }
}


class App extends Component {
  state = {
    jobs: [],
    tab: undefined
  };

  render() {
    return (
      <div className="App">
        <h1>I am a...</h1>
        <div style={{alignItems: 'center', display: 'flex', marginBottom: 16}}>
          <button onClick={() => this.setState({tab: RECRUITER})}><h2>Recruiter</h2></button>
          &nbsp;
          <h1>/</h1>
          &nbsp;
          <button onClick={() => this.setState({tab: CANDIDATE})}><h2>Candidate</h2></button>
        </div>
        {this.renderTab()}
      </div>
    );
  }

  renderTab() {
    switch (this.state.tab) {
      case RECRUITER:
        return <RecruiterTab postJob={this.postJob} />;
      case CANDIDATE:
        return <CandidateTab jobs={this.state.jobs} />;
      default:
        return;
    }
  }  

  postJob = job => {
    const newJobs = this.state.jobs.slice();
    newJobs.push(job);
    this.setState({jobs: newJobs});
  }
}

export default App;
