import test from '../src';
import axios from 'axios';
import validateEmailAddress from './axios';
import { expect } from '@jest/globals';

jest.mock('axios');

describe('the validate email address api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    }
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
  })
});

function valid_email_address() {
  this.mock_email = 'valid@email.com';

  axios.post.mockResolvedValue({
    data: { success: true }
  });
}

function INVALID_email_address() {
  this.mock_email = 'invalid';

  axios.post.mockResolvedValue({
    data: {
      success: false,
      error: 'error message from server',
    },
  });
}

function network_failure() {
  axios.post.mockRejectedValue({
    message: 'network failed',
    response: {
      status: 500,
    },
  });
}

async function validating_email_address() {
  this.result = await validateEmailAddress(this.mock_email);
}

function email_address_is_valid() {
  expect(this.result).toBe(true);
}

function email_address_is_INVALID(error) {
  expect(error).toBe('error message from server');
}

function network_failed(error) {
  expect(error).toBe('network failed');
}