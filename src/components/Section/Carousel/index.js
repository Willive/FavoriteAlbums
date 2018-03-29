import React from 'react';
import AlbumCard from '../AlbumCard'
import './_carousel.css';

const scrollSpeed = 10
const leftButton = "<<"
const rightButton = ">>"
const cardWidth = 248
const scrollDuration = 200

export default class Carousel extends React.Component {
  constructor() {
    super()
    this.scrollNode = null
    this.state = { position: 0 }
  }

  scroller(direction) {
    const { scrollNode, props: { albumData }, state: { position } } = this

    if (direction === "<<" && position) {
      scrollToPosition(scrollNode, cardWidth * (position - 1), scrollDuration)
      this.setState({ position: position - 1 })
      return
    }

    if (direction === ">>" && position < albumData.length - 1) {
      scrollToPosition(scrollNode, cardWidth * (position + 1), scrollDuration)
      this.setState({ position: position + 1 })
      return
    }
    return
  }

  render() {
    const { albumData } = this.props
    return (
      <div className="Carousel">
        <button className="Carousel-left" onClick={() => this.scroller(leftButton)}>
          {leftButton}
        </button>
        <div ref={scrollNode => this.scrollNode = scrollNode} className="Carousel-cards">
          {albumData.map((el, i) => <AlbumCard {...el} onClickCard={id=>this.props.history.push(`/${id}`)} key={i} />)}
        </div>
        <button className="Carousel-right" onClick={() => this.scroller(rightButton)}>
          {rightButton}
        </button>
      </div>
    )
  }
}

const scrollToPosition = (element, to, duration) => {
  if (duration <= 0) return

  const difference = to - element.scrollLeft
  const perTick = difference / duration * scrollSpeed

  setTimeout(() => {
    element.scrollLeft = element.scrollLeft + perTick
    if (element.scrollLeft === to) return
    scrollToPosition(element, to, duration - scrollSpeed)
  }, scrollSpeed)
}