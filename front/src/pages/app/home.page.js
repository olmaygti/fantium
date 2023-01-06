import React from 'react';

import { useSelector } from 'react-redux';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@material-ui/core/Button';


import { DataGrid } from '@mui/x-data-grid';


import Inject from 'root/inject';

import 'root/services';

import Collections from 'modules/collections';

export default Inject(['api'], function Home() {
	return <Collections/>;
});

