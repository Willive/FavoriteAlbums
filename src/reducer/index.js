import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'

const nullAlbum = { artistName: "", collectionName: "", releaseDate: "????", artworkUrl100: "", collectionViewUrl:"", collectionPrice:"" }
const initialState = { albumData: [] }

export const albumInfoRequested = createAction('ALBUM_INFO_REQUESTED')
export const albumInfoReceived = createAction('ALBUM_INFO_RECEIVED')

export default handleActions({
  [albumInfoReceived]: (state, { payload }) => ({
    ...state,
    albumData: [...state.albumData, payload]
  })
}
  , initialState)

export function getAlbumInfo(payload) {
  return function (dispatch) {
    dispatch(albumInfoRequested())
    return axios.get(`https://itunes.apple.com/lookup?id=${payload}`).then(
      data => {
        const { data: { results } } = data
        const { artistName, collectionName, releaseDate, artworkUrl100, collectionId, collectionViewUrl,
          collectionPrice } = results && results.length ? results[0] : { albumData: nullAlbum }
        return dispatch(albumInfoReceived({ artistName, collectionName, releaseDate, artworkUrl100, collectionId, 
          collectionViewUrl, collectionPrice }))
      }
    );
  };
}
