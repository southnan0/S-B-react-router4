// 入口文件
import {Route,HashRouter  as  Router,} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHashHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'react-router-redux';

import configureStore from './store/configureStore';
import { fromJS } from 'immutable';
import 'antd/dist/antd.less';
import App from './modules';

const initialState = window.__INITIAL_STATE__;
if(initialState) {
    Object.keys(initialState).forEach(key => {
        initialState[key] = fromJS(initialState[key])
    })
}
const store = configureStore(initialState);
const history = createHashHistory();

ReactDOM.render(
    <div>
        <Provider store={ store }>
            <ConnectedRouter history={history}>
                <Router>
                    <div>
                        <Route path="/" component={App} />
                        <Route path="/404" component={App} />
                    </div>
                </Router>
            </ConnectedRouter>
        </Provider>

    </div>
, document.getElementById('app'));