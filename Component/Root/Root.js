import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './../Redux/Store/Store';

import App from './App';

class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
        <App />
      </Provider>
		)
	}
}

export default Root;
