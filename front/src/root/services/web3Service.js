import { ethers } from 'ethers';

import tokenAbi from 'abis/fantiumToken';

import NETWORK_CONFIG from './networksConfiguration';

export default class Web3Service {
	async switchToFantiumChain() {
		const chainId = NETWORK_CONFIG[process.env.CHAIN_NAME].chainId;
		
		try {
			if (process.env.CHAIN_NAME === 'GANACHE') {
				await window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [{
						chainId,
						chainName: 'Fantium',
						rpcUrls: ['http://localhost:8545'],
						nativeCurrency: {
							name: 'ETH',
							symbol: 'ETH',
							decimals: 18,
						},
						blockExplorerUrls: null,
					}],
				});
			}
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId }],
			});
		} catch {
			return false;
		}
		return true;
	}

	async signMessage(msg) {
		try {
			await window.ethereum.send('eth_requestAccounts');
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const signature = await signer.signMessage(msg);
			const address = await signer.getAddress();
			return [signature, address];
		} catch (error) {
			console.log('Error while signing: ', error);
			return [error];
		}
	}

	getNftContract() {
		const provider = new ethers.providers.JsonRpcProvider(process.env.CHAIN_ENDPOINT);
		return new ethers.Contract(process.env.TOKEN_ADDRESS, tokenAbi, provider.getSigner());
	}


	async getConnectedNftContract() {
		try {
			await this.switchToFantiumChain();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			return new ethers.Contract(process.env.TOKEN_ADDRESS, tokenAbi, provider.getSigner());
		} catch(err) {
			return null;
		}
	}

	isValidAddress(address) {
		try{
			return ethers.utils.getAddress(address);
		} catch(err) {
			return false;
		}
	}
}