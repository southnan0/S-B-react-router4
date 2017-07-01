import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import Home from '../modules/home';
import ChatRoom from '../modules/chatRoom';
import  Test from '../modules/test';
import '../main.less';

const App = ({match})=> {

    return (
        <div className="main-body">
            <div className="whole-cnt">
                <Redirect exact from={match.url} to={`${match.url}home`} />
                <Route path={`${match.url}home`} component={Home}/>
                <Route path={`${match.url}chatRoom`} component={ChatRoom}/>
                <Route path={`${match.url}test`} component={Test}/>
            </div>
        </div>
    )
};

export default App