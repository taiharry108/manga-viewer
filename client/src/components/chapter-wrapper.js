import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import './chapter-wrapper.css'

class ChapterWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log(this.props.chapterData);
    const chapterDiv = this.props.chapterData.map(chapterData => {
      return  <Col key={chapterData.href}>
                {chapterData.vol}
              </Col>
    })

    return (
      <Container className='chapter-wrapper'>
        <Row>
          {chapterDiv}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    chapterData: state.api.chapterData
  }
};

export default connect(mapStateToProps, {
})(ChapterWrapper);

