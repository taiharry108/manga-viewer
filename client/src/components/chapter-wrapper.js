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
    const chapterDiv = Object.keys(this.props.chapterData).map((type) => {
      let data = this.props.chapterData[type];
      const dataCol = data.map(d => {
        return  <Col xs='3' key={d.href}>
                  {d.vol}
                </Col>
      })
      return  <Row key={type}>
                {dataCol}
              </Row>
      
    })

    return (
      <Container className='chapter-wrapper'>
        {chapterDiv}
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

