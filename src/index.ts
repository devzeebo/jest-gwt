import gwtRunner, { TestContext } from 'gwt-runner';
import {
  test as jestTest,
  beforeEach as jestBeforeEach,
  afterEach as jestAfterEach,
} from '@jest/globals';
import withAspectBuilder from './withAspect';

export default gwtRunner(jestTest);
export { TestContext };

export const withAspect = withAspectBuilder(jestBeforeEach, jestAfterEach);
