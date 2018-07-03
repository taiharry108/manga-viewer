import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import ImageViewer from './image-viewer';
import ChapterWrapper from './chapter-wrapper';
import MangaSearchBar from './manga-searchbar';
import { getNewImageData } from '../actions/apiActions';
import axios from 'axios';
import { loopWithDelay } from '../utils';
import './app-wrapper.css';


class AppWrapper extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      textContent:'',
      imgsData: []
    }
    
  }

  componentWillReceiveProps(nextProps) {    
    if (this.props.imgs.length !== nextProps.imgs.length) {
      const imgs = [...nextProps.imgs];
      const args = {
        r: nextProps.referer,
        url: "http://localhost:3000/manga/api/getImg",
        f: this.props.getNewImageData
      }
      loopWithDelay(imgs, 1000, (ele, {r, url, f}) => {
        const data = {
          imgURL: ele,
          r: r
        }
        axios.post(url, data).then((res) => f(res.data));
      }, args)
    }
  }

  
  render() {
    return (
      <Container className='app-wrapper'>
        <MangaSearchBar/>
        <ChapterWrapper/>
        <ImageViewer/>
      </Container>
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
  getNewImageData
})(AppWrapper);

