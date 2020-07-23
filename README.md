# jest-gwt
A small library to help Jest support given-when-then style testing without a bunch of overhead

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

## Detailed Usage

Please refer to [gwt-runner](https://github.com/devzeebo/gwt-runner) for
detailed usage on how to write tests and clauses.