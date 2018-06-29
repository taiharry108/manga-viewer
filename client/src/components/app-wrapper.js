import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Input, Form } from 'reactstrap';
import ImageViewer from './image-viewer';
import {getImgLinks} from '../actions/apiActions'
import './app-wrapper.css';

class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      textContent:''
    }
    
  }



  componentWillReceiveProps(nextProps) {    
    if (this.props.imgs.length !== nextProps.imgs.length) {
      console.log(this.props.imgs);
      const doSomething = (n) => {
        console.log(n.shift());
        setTimeout(() => {
          if (n.length !== 0)
            doSomething(n)
        }, 1000);
        
      }
      doSomething([...nextProps.imgs]);
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
    return (
      <Container className='app-wrapper'>
        <Form onSubmit={this.onSubmit}>
          <Input className='chapter my-2' onInput={this.onInput}/>
        </Form>
        <ImageViewer/>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    imgs: state.api.imgs
  }
};

export default connect(mapStateToProps, {
  getImgLinks
})(AppWrapper);

