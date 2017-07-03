import * as types from './../ActionTypes';

export function fetchBeautyGirlData() {
    let page = Math.floor(Math.random() * 19 + 1);
    return dispatch => {
      let URL = `http://gank.io/api/data/福利/12/${page}`;
		console.log(URL);
        fetch(URL).then(response => response.json())
        .then(responseData => {
        console.log(responseData);
            dispatch(receiveBeautyList(responseData));
      }).catch((error) => {
            console.log('error');
        }).done();
	}
}

function receiveBeautyList(beautifyData) {
    return {
        type: types.RECEIVE_BEAUTY_LIST,
        loading: true,
        beauty: beautifyData.results,
    }
}
