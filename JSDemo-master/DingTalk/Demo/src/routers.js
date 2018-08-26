import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-keeper'

import PageHome from 'pages/home';
import PageSbtn from 'pages/sbtn';
import PageTwo from 'pages/pagetwo';
import PageNav from 'pages/home/nav';
import PageDisplay from 'pages/home/display';
import PageEntry from 'pages/home/entry';

import PageDetailOne from 'pages/detailone';
import PageXxx from 'pages/home/nav/xxx';

const rootRoute =
    <HashRouter>
        <div>
            {/* <PageSbtn.route /> */}
            <Route component={PageHome.route} path='/' />
            <Route component={PageEntry.route} path='/home/entry' />
            <Route component={PageDisplay.route} path='/home/display' />
            <Route component={PageNav.route} path='/home/nav' />
            <Route component={PageXxx.route} path='/home/nav/xxx' />

            <Route component={PageSbtn.route} path='/sbtn' />
            <Route component={PageTwo.route} path='/pagetwo' />
            <Route component={PageDetailOne.route} path='/detailone' />
        </div>
    </HashRouter>

ReactDOM.render(rootRoute, document.getElementById('App'));
