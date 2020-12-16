import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import { CtxProvider } from "./hooks/context"
import 'antd/dist/antd.css';

ReactDOM.render(
    <CtxProvider>
    <Router />
    </CtxProvider>
    ,document.getElementById('root')
    );

serviceWorker.unregister();
