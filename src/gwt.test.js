/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import testContext, { unboundTestContext } from './gwt';

describe('test context', () => {
  testContext('with no errors', {
    given: {
      mock_jest_test_function,
      test_case,
    },
    when: {
      executing_test_case,
    },
    then: {
      all_GIVENS_called,
      all_WHENS_called,
      all_THENS_called,
      expect_error_NOT_called,
    },
  });

  testContext('with errors', {
    given: {
      mock_jest_test_function,
      test_case_WITH_ERROR_in_WHEN,
    },
    when: {
      executing_test_case,
    },
    then: {
      expect_error_CALLED,
    },
  });
});

//#region givens
function mock_jest_test_function() {
  this.mock_jest_func = async (_, func) => func();
}
function test_case() {
  const executions = [];

  this.gwt_definition = {
    given: {
      something() { executions.push('something'); },
      something_else() { executions.push('something_else'); },
    },
    when: {
      something_happens() { executions.push('something_happens'); },
      something_else_happens() { executions.push('something_else_happens'); },
    },
    then: {
      assert_something() { executions.push('assert_something'); },
      assert_something_else() { executions.push('assert_something_else'); },
      expect_error() { executions.push('expect_error'); },
    },
  };

  this.executions = executions;
}
function test_case_WITH_ERROR_in_WHEN() {
  const executions = [];

  this.gwt_definition = {
    when: {
      oops() { throw new Error(); },
    },
    then: {
      expect_error() { executions.push('expect_error'); },
    },
  };

  this.executions = executions;
}
//#endregion

//#region whens
async function executing_test_case() {
  await unboundTestContext(this.mock_jest_func)('test case', this.gwt_definition);
}
//#endregion

//#region thens
function all_GIVENS_called() {
  expect(this.executions).toEqual(expect.arrayContaining(['something', 'something_else']));
}
function all_WHENS_called() {
  expect(this.executions).toEqual(expect.arrayContaining(['something_happens', 'something_else_happens']));
}
function all_THENS_called() {
  expect(this.executions).toEqual(expect.arrayContaining(['assert_something', 'assert_something_else']));
}
function expect_error_NOT_called() {
  expect(this.executions).not.toEqual(expect.arrayContaining(['expect_error']));
}
function expect_error_CALLED() {
  expect(this.executions).toEqual(expect.arrayContaining(['expect_error']));
}
//#endregion
