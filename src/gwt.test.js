/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import { noop, toLower } from 'lodash/fp';
import test, { unboundTestContext } from './gwt';

describe('test context', () => {
  test('no errors', {
    given: {
      mock_jest_test_function,
      GOOD_test_case,
    },
    when: {
      executing_test_case,
    },
    then: {
      all_GIVENS_called,
      all_WHENS_called,
      all_THENS_called,
    },
  });

  test('properly handled errors', {
    given: {
      mock_jest_test_function,
      ERROR_test_case_WITH_expect_error,
    },
    when: {
      executing_test_case,
    },
    then: {
      expect_error_CALLED,
    },
  });

  test('expected error but no error thrown', {
    given: {
      mock_jest_test_function,
      GOOD_test_case_WITH_expect_error,
    },
    when: {
      executing_test_case,
    },
    then: {
      expect_error: error_containing('expected error to be thrown, but no error was thrown'),
    },
  });

  test('unexpected error', {
    given: {
      mock_jest_test_function,
      ERROR_test_case_WITHOUT_expect_error,
    },
    when: {
      executing_test_case,
    },
    then: {
      expect_error: error_containing('oops!'),
    },
  });
});

//#region givens
function mock_jest_test_function() {
  this.mock_jest_func = async (_, func) => func();
}
function GOOD_test_case() {
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
    },
  };

  this.executions = executions;
}
function ERROR_test_case_WITH_expect_error() {
  const executions = [];

  this.gwt_definition = {
    when: {
      oops() { throw new Error('Oops!'); },
    },
    then: {
      expect_error() { executions.push('expect_error'); },
    },
  };

  this.executions = executions;
}
function ERROR_test_case_WITHOUT_expect_error() {
  this.gwt_definition = {
    when: {
      oops() { throw new Error('Oops!'); },
    },
    then: {
    },
  };
}
function GOOD_test_case_WITH_expect_error() {
  this.gwt_definition = {
    then: {
      expect_error: noop,
    },
  };
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
function expect_error_CALLED() {
  expect(this.executions).toEqual(expect.arrayContaining(['expect_error']));
}
function error_containing(message) {
  return function (e) {
    expect(toLower(e.message)).toEqual(expect.stringMatching(toLower(message)));
  };
}
//#endregion
