import context from 'root/context';

export default function Inject(deps, wrapped) {
	return function wrap(...args) {
		return wrapped.call(deps.reduce((dis, dep) => ({
			...dis,
			[dep]: context.getBean(dep),
		}), {}), ...args);
	};
}
