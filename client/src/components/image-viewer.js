import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import axios from 'axios';
import './image-viewer.css';

class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs:[]
    }
  }
  render() {    
    return (
      <div className='d-flex flex-column'>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

export default connect(mapStateToProps, {
})(ImageViewer);

