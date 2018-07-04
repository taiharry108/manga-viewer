import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  ButtonGroup } from 'reactstrap';
import { getImgLinks, clearImages } from '../actions/apiActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleSidebar } from '../actions/uiActions';
import axios from 'axios';
import './chapter-sidebar.css'

class ChapterSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentType: null
    }
  }

  chapOnClick = (chapURL) => {
    console.log(chapURL, 'is clicked')
    this.props.clearImages()
    this.props.getImgLinks(chapURL.replace('/',''))
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(this.props.chapterData).length === 0 && Object.keys(nextProps.chapterData).length !== 0) {
      const type = Object.keys(nextProps.chapterData)[0]
      console.log('setting current type to ', type)
      this.setState({currentType : type});
    }
  }

  render() {

    const ChapterDiv = () => {
      if (this.state.currentType === null)
        return <Col></Col>
      let data = this.props.chapterData[this.state.currentType];      
      const dataCol = data.map(d => {
        return  <Col xs='4' key={d.href} className='px-1'>
                  <Button color='warning' onClick={() => this.chapOnClick(d.href)} className='chap-wrap text-center border m-1 py-2 w-100'>{d.vol}</Button>
                </Col>
      })
      return  <Container>
                <Row className='m-0'>
                  {dataCol}
                </Row>
              </Container>
    }

    const chapterPickerDiv = Object.keys(this.props.chapterData).map(type => <Button onClick={() => this.setState({currentType: type})}key={type}>{type}</Button>)

    const sidebarClass = 'sidebar d-flex flex-column' + (this.props.sidebarIsShown ? '' : ' in');

    return (
      <div className='sidebar-wrapper d-flex flex-row'>
        <div className={sidebarClass}>
          <div className='align-self-center my-4'>
            <ButtonGroup>
              {chapterPickerDiv}
            </ButtonGroup>
          </div>

          <ChapterDiv/>
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

