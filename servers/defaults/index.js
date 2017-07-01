import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore, applyMiddleware, compose} from 'redux';
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';
import {createLocation } from 'history/LocationUtils';
import createMemoryHistory from 'history/createMemoryHistory';

import { Provider } from 'react-redux';
import rootReducer from '../../app/reducers';
import middleware from '../../app/middleware';
import {StaticRouter,Switch,RedirectWithStatus,Route} from 'react-router';
import App from '../../app/modules';

export default (req, res)=> {
    const history = createMemoryHistory();
    const location = createLocation(req.url);
    //todo  异常情况处理
    // if (err) {
    //     return res.status(500).send(err.message)
    // }
    //
    // if (!renderProps) {
    //     return res.status(404).send('not found')
    // }

    const store = compose(
        applyMiddleware.apply(this, middleware)
    )(createStore)(rootReducer);
    const context = {};

    // render the component to string
    const initialView = renderToString(
        <Provider store={ store }>
            <ConnectedRouter history={history}>
                <StaticRouter location={req.url} context={context}>
                    <Route path="/" component={App}/>
                </StaticRouter>
            </ConnectedRouter>
        </Provider>
    );

    console.info(context)

    const initialState = store.getState();

    const assets = require('../../stats.json');

    res.render('index', {
        html: initialView,
        assets,
        initialState
    })
}