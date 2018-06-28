import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import axios from 'axios';
import './image-viewer.css';

class ImageViewer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const referer = 'https://www.manhuaren.com/m626522'
    const imgURL = 'https://manhua1032-61-244-111-20.cdndm5.com/11/10684/626522/1_5593.png?cid=626522&key=85570a48c0f0e746b8baff2ae39575e6&type=1'
    console.log(this.downloadImg(imgURL, referer))
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

