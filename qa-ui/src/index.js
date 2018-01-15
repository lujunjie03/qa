import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/index';
import registerServiceWorker from './registerServiceWorker';
import 'moment/locale/zh-cn';
import moment from 'moment';

moment.locale('zh-cn');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
