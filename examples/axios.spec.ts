/* eslint-disable no-console */
import axios from 'axios';
import { mocked } from 'jest-mock';
import { expect } from '@jest/globals';
import test, { withAspect } from '../src';
import validateEmailAddress from './axios';

jest.mock('axios');
const mocked_axios = mocked(axios, true);

describe('the validate email address api', () => {
  test('returns true for valid email addresses', {
    given: {
      valid_email_address,
    },
    when: {
      validating_email_address,
    },
    then: {
      email_address_is_valid,
    },
  });

  test('extracts error for invalid email address', {
    given: {
      INVALID_email_address,
    },
    when: {
      validating_email_address,
    },
    then: {
      expect_error: email_address_is_INVALID,
    },
  });

  test('extracts error from network exception', {
    given: {
      network_failure,
    },
    when: {
      validating_email_address,
    },
    then: {
      expect_error: network_failed,
    },
  });

  withAspect(
    function (this: Context) {
      jest.clearAllMocks();

      console.log('context before the test: ', this);

      this.bearer_token = 'some-token';
    },
    function (this: Context) {
      console.log('context does not have specific test things after the test:', this);
    },
  );
});

type Context = {
  result: boolean,
  bearer_token: string,
  email: string,
};

function valid_email_address(this: Context) {
  this.email = 'valid@email.com';

  mocked_axios.post.mockResolvedValue({
    data: { success: true },
  });
}

function INVALID_email_address(this: Context) {
  this.email = 'invalid';

  mocked_axios.post.mockResolvedValue({
    data: {
      success: false,
      error: 'error message from server',
    },
  });
}

function network_failure() {
  mocked_axios.post.mockRejectedValue({
    message: 'network failed',
    response: {
      status: 500,
    },
  });
}

async function validating_email_address(this: Context) {
  this.result = await validateEmailAddress(
    this.email,
    this.bearer_token,
  );
}

function email_address_is_valid(this: Context) {
  expect(this.result).toBe(true);
}

function email_address_is_INVALID(this: Context, error: Error) {
  expect(error).toBe('error message from server');
}

function network_failed(this: Context, error: Error) {
  expect(error).toBe('network failed');
}
