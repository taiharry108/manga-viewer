import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button } from 'reactstrap';
import { getImgLinks, clearImages } from '../actions/apiActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleSidebar } from '../actions/uiActions';
import axios from 'axios';
import './chapter-sidebar.css'

class ChapterSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  chapOnClick = (chapURL) => {
    console.log(chapURL, 'is clicked')
    this.props.clearImages()
    this.props.getImgLinks(chapURL.replace('/',''))
  }

  render() {
    const chapterDiv = Object.keys(this.props.chapterData).map((type) => {
      let data = this.props.chapterData[type];
      const dataCol = data.map(d => {
        return  <Col xs='4' key={d.href} className='px-1'>
                  <Button color='warning' onClick={() => this.chapOnClick(d.href)} className='chap-wrap text-center border m-1 py-2 w-100'>{d.vol}</Button>
                </Col>
      })
      return  <Container key={type}>                
                <Row className='p-3 text-nowrap'><h2>{type}</h2></Row>
                <Row>
                  {dataCol}
                </Row>
              </Container>
      
    })

    const sidebarClass = 'sidebar' + (this.props.sidebarIsShown ? '' : ' in');

    return (
      <div className='sidebar-wrapper d-flex flex-row'>
        <div className={sidebarClass}>

          {chapterDiv}
        </div>
        <div className="icon-wrapper d-flex align-self-center align-items-center rounded-right text-right" onClick={this.props.toggleSidebar}>
          <div className='filler'></div>
          <FontAwesomeIcon className="sidebar-icon" icon={this.props.sidebarIsShown ? "chevron-left" : "chevron-right"}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chapterData: state.api.chapterData,
    sidebarIsShown: state.ui.sidebarIsShown
  }
};

export default connect(mapStateToProps, {
  getImgLinks,
  clearImages,
  toggleSidebar
})(ChapterSidebar);

