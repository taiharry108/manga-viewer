import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import ImageViewer from './image-viewer';
import ChapterSidebar from './chapter-sidebar';
import MangaSearchBar from './manga-searchbar';
import { allowGetImage, stopGetImage, getNewImageData } from '../actions/apiActions';
import axios from 'axios';
import './app-wrapper.css';


class AppWrapper extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      textContent:'',
      imgsData: [],
    }

    this.loopWithDelay = this.loopWithDelay.bind(this);
    
  }

  loopWithDelay = (arr, delay, func, args) => {
    let ele = arr.shift();
    func(ele, args);
    console.log('going to set a timeout before getting another one')
    setTimeout(() => {
      console.log(this.props.shouldStopGettingImgs);
      if (arr.length !== 0 && !this.props.shouldStopGettingImgs[args.r]) {
        this.loopWithDelay(arr, delay, func, args)
      }
    }, delay);
      
  }


  componentWillReceiveProps(nextProps) {    
    if (this.props.imgs.length === 0 && nextProps.imgs.length !== 0) {
      const imgs = [...nextProps.imgs];
      const args = {
        r: nextProps.referer,
        url: `${SERVER_URL}manga/api/getImg`,
        f: this.props.getNewImageData
      }
      this.props.allowGetImage(nextProps.referer);
      this.loopWithDelay(imgs, 1000, (ele, {r, url, f}) => {
        const data = {
          imgURL: ele,
          r: r
        }
        axios.post(url, data).then((res) => {
          console.log(r);
          f(res.data);
        });
      }, args)
    }
  }

  
  render() {
    return (
      <Container className='app-wrapper'>
        <MangaSearchBar/>
        <ChapterSidebar/>
        <ImageViewer/>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    imgs: state.api.imgs,
    referer: state.api.referer,
    imgsData: state.api.imgsData,
    shouldStopGettingImgs: state.api.shouldStopGettingImgs
  }
};

export default connect(mapStateToProps, {
  getNewImageData,
  allowGetImage
})(AppWrapper);

