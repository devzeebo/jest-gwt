# jest-gwt
A small library to help Jest support given-when-then style testing without a
bunch of overhead

## Compatibility Chart

| jest-gwt Version | Jest Version |
| ---------------- | ------------ |
|       1.x        |  24.x, 25.x  |
|       2.x        |  26.x, 27.x  |
|       3.x        |    > 26.x    |

## Usage

1. Install the package
    ```bash
    npm i --save-dev jest-gwt
    ```
2. In your test files, import `test`
    ```js
    import test from 'jest-gwt';
    ```
3. Write a test!
    ```js
    describe('test context', () => {
      test('has no expected errors', {
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
    });
    ```

## Disabling a test
Sometimes you want a test to be disabled in code. Jest offers this functionality with
the `xtest` method, and we've duplicated this logic, but with strong typing so you can
disable your gwt style tests.

```js
import test, { xtest } from 'jest-gwt';

describe('test context', () => {
  test('this test will run', {
    then: {
      CANARY,
    },
  });

  xtest('this test will NOT run', {
    when: {
      oops_we_broke_this,
    },
  });
});
```

## withAspect

`withAspect` wraps up jest's `beforeEach` and `afterEach` to allow preparing and
cleaning up the context before running tests.

```js
withAspect(
  // this is the beforeEach. Do your prep work here
  function(this: Context) {
  },
  // this is the afterEach. It is OPTIONAL. If you need to do clean up of
  // external resources you allocated in the beforeEach, do it here
  function(this: Context) {
  }
)
```

The `afterEach` has access to whatever values you put on the Context in the
`beforeEach`. It does NOT have access to the values put on the Context during
the specific test.


## Detailed Usage

Please refer to [gwt-runner](https://github.com/devzeebo/gwt-runner) for
detailed usage on how to write tests and clauses.