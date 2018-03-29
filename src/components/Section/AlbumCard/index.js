import React from 'react';
import './_card.css';
export default function AlbumCard(props) {
  const detail = props.detail ? '_detail' : ''
  return (
    <div className={`wrapper${detail}`}>
      {props.detail && <h5 onClick={() => props.onClickCard('')} className="back"> Back</h5>}
      <div onClick={() => props.onClickCard(props.collectionId)} className={`Card${detail}`}>
        <h2 className="Card-artist">{props.artistName}</h2>
        <img src={props.artworkUrl100} className="Card-artwork" alt="Not Availabe" />
        <h3 className="Card-album">{props.collectionName}</h3>
        <h4 className="Card-date">{props.releaseDate.slice(0, 4)}</h4>
        {props.detail && <h4>{`$${props.collectionPrice}`}</h4>}
        {props.detail && <a href={props.collectionViewUrl}>Buy it on iTunes</a>}
      </div>
    </div >
  )
}