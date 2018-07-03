import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import axios from 'axios';
import './image-viewer.css';

class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const ImgDiv = this.props.imgsData.map((imgData) => {
          return  <div key={imgData.id}>
                    <img src={"data:image/jpeg;base64," + imgData.data} />
                  </div>
        })
    return (
      <div className='d-flex flex-column'>
        {ImgDiv}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    imgs: state.api.imgs,
    referer: state.api.referer,
    imgsData: state.api.imgsData
  }
};

export default connect(mapStateToProps, {
})(ImageViewer);

