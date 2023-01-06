const CTX = {};

export default {
	registerBean(bean, beanName) {
		CTX[beanName] = bean;
	},
	getBean(beanName) {
		return CTX[beanName];
	},
};
