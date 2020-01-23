import reduce from 'lodash/fp/reduce';

const executeStep = (context) => (funcs) => reduce(
  (previous, func) => previous.then(() => func.bind(context)()),
  Promise.resolve(),
)(funcs);
export default executeStep;
