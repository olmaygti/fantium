import context from 'root/context';

import Web3Service from './web3Service';
import Api from './api';

context.registerBean(new Web3Service(), 'web3Service');
context.registerBean(Api, 'api');
