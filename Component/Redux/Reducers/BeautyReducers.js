import * as types from './../ActionTypes';

const initialState = {
    loading: false,
    beauty: [],
    imageURL: 'https://ws1.sinaimg.cn/large/610dc034ly1fgllsthvu1j20u011in1p.jpg'
}

export default function beautyReducers(state = initialState, action) {
    switch (action.type) {
        case types.RECEIVE_BEAUTY_LIST:
            console.log('收到消息');
            return Object.assign({}, state, {
				loading: true,
				beauty: action.beauty
			});
        case types.BACKIMAGE_URL:
            return Object.assign({}, state, {
				imageURL:action.imageURL
			});
        default:
            return state;
    }
}