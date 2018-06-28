import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import ImageViewer from './image-viewer';
import './app-wrapper.css';

class AppWrapper extends Component {
  render() {
    return (
      <Container className='app-wrapper'>
        <ImageViewer/>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

export default connect(mapStateToProps, {
})(AppWrapper);

