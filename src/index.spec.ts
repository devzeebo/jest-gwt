import test, { xtest } from './index';

describe('jest-gwt', () => {
  test('xtest does NOT invoke methods', {
    given: {
      a_given_function,
      a_when_function,
      a_then_function,
    },
    when: {
      executing_an_xtest,
    },
    then: {
      given_NOT_called,
      when_NOT_called,
      then_NOT_called,
    },
  });

  test('TestContext is exported', {
    when: {
      importing_module,
    },
    then: {
      module_exports_TestContext,
    },
  });
});

type Context = {
  given: jest.Mock<any>,
  when: jest.Mock<any>,
  then: jest.Mock<any>,

  module: any,
};

function a_given_function(this: Context) {
  this.given = jest.fn();
}

function a_when_function(this: Context) {
  this.when = jest.fn();
}

function a_then_function(this: Context) {
  this.then = jest.fn();
}

function executing_an_xtest(this: Context) {
  xtest('name', {
    given: {
      fn: this.given,
    },
    when: {
      fn: this.when,
    },
    then: {
      fn: this.then,
    },
  });
}

async function importing_module(this: Context) {
  this.module = await import('./index');
}

function given_NOT_called(this: Context) {
  expect(this.given).not.toHaveBeenCalled();
}

function when_NOT_called(this: Context) {
  expect(this.when).not.toHaveBeenCalled();
}

function then_NOT_called(this: Context) {
  expect(this.then).not.toHaveBeenCalled();
}

function module_exports_TestContext(this: Context) {
  expect(this.module.TestContext).toBeDefined();
}
