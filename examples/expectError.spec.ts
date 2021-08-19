import test from '../src';

describe('expect error', () => {
  test('should throw error', {
    given: {
      an_error_message,
    },
    when: {
      throwing_error,
    },
    then: {
      expect_error,
    },
  });
});

function an_error_message() {
  this.error_message = 'an error';
}
function throwing_error() {
  throw new Error(this.error_message);
}
function expect_error(error) {
  expect(error.message).toBe(this.error_message);
}
