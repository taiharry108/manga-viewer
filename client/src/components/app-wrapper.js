import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Input, Form } from 'reactstrap';
import ImageViewer from './image-viewer';
import {getImgLinks, getNewImageData } from '../actions/apiActions';
import axios from 'axios';
import './app-wrapper.css';

class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      textContent:'',
      imgsData: []
    }
    
  }



  componentWillReceiveProps(nextProps) {    
    if (this.props.imgs.length !== nextProps.imgs.length) {
      const imgs = [...nextProps.imgs];
      const doSomething = (n) => {
        let imgLink = n.shift()
        console.log(imgLink)
        axios.post("http://localhost:3000/manga/api/getImg", {
          imgURL: imgLink,
          r: this.props.referer
        }).then((res) => {
          this.props.getNewImageData(res.data);

        })
        setTimeout(() => {
          if (n.length !== 0)
            doSomething(n)
        }, 1000);
        
      }
      doSomething(imgs);
    }
  }

  onInput(e) {
    this.setState({
      textContent: e.target.value
    });    
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('going to submit', this.state.textContent);
    this.props.getImgLinks(this.state.textContent);
  }
  render() {
    const imgDiv = this.props.imgsData.map((imgData) => {
      return <img src={"data:image/jpeg;base64," + imgData} />
    })
    return (
      <Container className='app-wrapper'>
        <Form onSubmit={this.onSubmit}>
          <Input className='chapter my-2' onInput={this.onInput}/>
        </Form>
        {imgDiv}
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
  getImgLinks,
  getNewImageData
})(AppWrapper);

