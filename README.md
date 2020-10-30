# jest-gwt
A small library to help Jest support given-when-then style testing without a
bunch of overhead

### 1.x Deprecation
I used `@jest/globals` in `jest-gwt` in order to ensure the `test` and
`expect` variables were imported properly, and that caused `jest@24.x`
projects to be incompatible. The 1.x branch therefore has been reverted to
require only `jest@24`, and has removed the usage of `@jest/globals`. Moving
forward, the 2.x branch will have a peer dependency on `jest@26` and above.

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