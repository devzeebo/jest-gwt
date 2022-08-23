import test from '../src';

import { set, get } from './scenario';

describe('scenario style', () => {
  test('is singleton', {
    given: {},
    scenario: [{
      when: {
        setting_value,
      },
      then: {
        value_is_set,
      },
    }, {
      then_when: {
        attempting_to_set_value,
      },
      then: {
        value_is_FIRST_VALUE,
      },
    }],
  });
});

type Context = {
  value: Symbol,

  result: Symbol,
};

function setting_value(this: Context) {
  set(Symbol.for('first'));
}

function value_is_set(this: Context) {
  expect(get()).toBe(Symbol.for('first'));
}

function attempting_to_set_value(this: Context) {
  set(Symbol.for('second'));
}

function value_is_FIRST_VALUE(this: Context) {
  expect(get()).toBe(Symbol.for('first'));
}
