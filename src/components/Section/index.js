import React from 'react';
import Carousel from './Carousel'
import AlbumCard from './AlbumCard'
import { connect } from 'react-redux';
import { getAlbumInfo } from '../../reducer'
import { withRouter } from 'react-router-dom'

import './_list-section.css';

const albumIDs = [850576570, 1099843198, 1291910244, 269842381, 594061854, 1311877697, 1009593832]

class Section extends React.Component {

  componentDidMount() {
    albumIDs.forEach(el => this.props.requestInfo(el))
  }

  render() {
    const { albumData, history, match: { params: { albumID } } } = this.props
    const detail = albumID && albumData.find(el => el.collectionId === parseInt(albumID, 10))
    return (
      <section>
        {detail ? <AlbumCard detail {...detail} onClickCard={loc => this.props.history.push(`/${loc}`)} />
          : [<h2 key={1}>William Wherry's Favorite Albums</h2>, <Carousel key={2} albumData={albumData} history={history} />]}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  albumData: state.albumData
})

const mapDispatchToProps = dispatch => ({
  requestInfo: id => dispatch(getAlbumInfo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Section))