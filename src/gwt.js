/* eslint-disable jest/expect-expect,jest/no-export */
import flow from 'lodash/fp/flow';
import values from 'lodash/fp/values';
import merge from 'lodash/fp/merge';
import pick from 'lodash/fp/pick';
import omit from 'lodash/fp/omit';
import executeStep from './executeStep';

export const unboundTestContext = (testFunc) => (name, gwtDefinition) => {
  const gwt = flow(
    pick(['given', 'when', 'then']),
    merge({
      given: {},
      when: {},
      then: {},
    }),
  )(gwtDefinition);

  return testFunc(name, async () => {
    const context = {};
    const executeGwtStep = flow(
      values,
      executeStep(context),
    );

    await executeGwtStep(gwt.given);

    try {
      await executeGwtStep(gwt.when);

      if (gwt.then.expect_error) {
        throw new Error('Expected error to be thrown, but no error was thrown');
      }
    } catch (e) {
      if (!gwt.then.expect_error) {
        throw e;
      }
      await gwt.then.expect_error.bind(context)(e);
    }

    await flow(
      omit(['expect_error']),
      executeGwtStep,
    )(gwt.then);
  });
};
export default unboundTestContext(test);
