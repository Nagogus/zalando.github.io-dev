import React from 'react';
import _ from 'lodash';
import FilterBar from './FilterBar.jsx';
import RepositoryList from './RepositoryList.jsx';
import RepoStore from '../../stores/RepoStore.js';
import SectionHeading from '../section-heading/SectionHeading.jsx';
import api from '../../utils/Api';
import languagesUtil from '../../utils/LanguagesUtil';

class FilterableRepositoryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      languages: [],
      repositories: RepoStore.getRepos()
    };
    this.handleUserInput = this.handleUserInput.bind(this);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RepoStore.addChangeListener(this.onChange);
    api.getRepos().then(function (repos) {
      this.setState({languages: languagesUtil.guessLanguages(repos)});
    }.bind(this));
  }

  onChange() {
    this.setState({
      repositories: RepoStore.getRepos()
    });
  }

  handleUserInput(filter) {
    let newRepoList;
    if (filter === 'all') {
      newRepoList = RepoStore.getRepos();
    } else {
      newRepoList = _.filter(RepoStore.getRepos(), {'primaryLanguage': filter});
    }
    this.setState({
      filter: filter,
      repositories: newRepoList
    });
  }

  render() {
    return (
      <div className='container repos'>
          <SectionHeading text="Repositories" />
          <FilterBar
            languages={this.state.languages}
            filter={this.state.filter}
            onUserInput={this.handleUserInput}
            />
          <RepositoryList
            repositories={this.state.repositories}
            filter={this.state.filter}
            />
      </div>
    );
  }
}

export default FilterableRepositoryList;
