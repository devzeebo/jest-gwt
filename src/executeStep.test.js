/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import executeStep from './executeStep';
import testContext from './gwt';

const timeout = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
describe('execute step', () => {
  testContext('works with non-async functions', {
    given: {
      context,
      NO_async_functions,
    },
    when: {
      executing_step,
    },
    then: {
      functions_execute_in_order,
    },
  });

  testContext('works with async functions', {
    given: {
      context,
      ALL_async_functions,
    },
    when: {
      executing_step,
    },
    then: {
      functions_execute_in_order,
    },
  });

  testContext('works with mixed async and sync functions', {
    given: {
      context,
      MIXED_functions,
    },
    when: {
      executing_step,
    },
    then: {
      functions_execute_in_order,
    },
  });

  testContext('uses same context for all contexts', {
    given: {
      context,
      NO_async_functions,
    },
    when: {
      executing_step,
    },
    then: {
      context_is_bound_to_functions,
    },
  });
});

//#region constants
const makeFunc = (order, executions) => function () {
  executions.push({
    order,
    context: this,
  });
};
const makeAsyncFunc = (order, ms, executions) => async function () {
  await timeout(ms);
  executions.push({
    order,
    context: this,
  });
};
//#endregion

//#region given
function context() {
  this.context = {};
}
function NO_async_functions() {
  const executions = [];

  this.funcs = [
    makeFunc(1, executions),
    makeFunc(2, executions),
    makeFunc(3, executions),
  ];
  this.executions = executions;
}
function ALL_async_functions() {
  const executions = [];

  this.funcs = [
    makeAsyncFunc(1, 30, executions),
    makeAsyncFunc(2, 10, executions),
    makeAsyncFunc(3, 20, executions),
  ];
  this.executions = executions;
}
function MIXED_functions() {
  const executions = [];

  this.funcs = [
    makeFunc(1, executions),
    makeAsyncFunc(2, 10, executions),
    makeFunc(3, executions),
  ];
  this.executions = executions;
}
//#endregion

//#region whens
async function executing_step() {
  await executeStep(this.context)(this.funcs);
}
//#endregion

//#region thens
function functions_execute_in_order() {
  expect(this.executions.length).toBe(3);
  expect(this.executions[0].order).toBeLessThan(this.executions[1].order);
  expect(this.executions[1].order).toBeLessThan(this.executions[2].order);
}
function context_is_bound_to_functions() {
  expect(this.executions.length).toBe(3);
  expect(this.executions[0].context).toBe(this.context);
  expect(this.executions[1].context).toBe(this.context);
  expect(this.executions[2].context).toBe(this.context);
}
//#endregion
