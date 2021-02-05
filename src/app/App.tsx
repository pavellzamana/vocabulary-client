import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Navbar } from '@/components/Navbar/Navbar';
import { Home } from '@/pages/Home/Home';
import { Authorization } from '@/features/Authorization/Authorization';
import { Registration } from '@/features/Authorization/Registration';

import styles from './app.less';

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className={styles.container}>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Authorization} />
          <Route path='/signin' component={Registration} />
        </Switch>
      </div>
    </HashRouter>
  );
}
