import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getImgLinks, getSuggestionFromBackend, clearSugg } from '../actions/apiActions';
import { Form } from 'reactstrap';
import Autosuggest from 'react-autosuggest';

const theme = {
  container: {
    position: 'relative'
  },
  input: {
    width: '100%',
    height: 30,
    padding: '0.375rem 0.75rem',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    border: '0.5px solid #ced4da',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    margin: '0.5rem 0 0'
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    border: '0.5px solid #ced4da',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.title;
}

function renderSuggestion(suggestion) {
  return (    
    <div>
      <span>{suggestion.title}</span>
      <span>({suggestion.chapter})</span>
    </div>
  );
}

class MangaSearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      value: '',
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('going to submit', this.state.textContent);
    this.props.getImgLinks(this.state.value);
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.props.getSuggestionFromBackend(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.clearSugg();
  };

  render() {
    const { value } = this.state;
    const suggestions = this.props.suggestions
    const inputProps = {
      placeholder: "Type manga name",
      value,
      onChange: this.onChange
    };
    return (
      <Form onSubmit={this.onSubmit}>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={theme}
        />
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    suggestions: state.api.suggestions,
  }
};

export default connect(mapStateToProps, {
  getImgLinks,
  getSuggestionFromBackend,
  clearSugg,
})(MangaSearchBar);

