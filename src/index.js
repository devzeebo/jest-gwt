import gwtRunner, { TestContext } from 'gwt-runner';
import {
  test as jestTest,
  beforeEach as jestBeforeEach,
  afterEach as jestAfterEach,
  beforeAll as jestBeforeAll,
  afterAll as jestAfterAll,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@jest/globals';

const after = (jestFn) => (callback) => {
  jestFn(callback.bind(TestContext.context));
  TestContext.releaseContext();
};

const before = (jestFn) => (callback) => {
  TestContext.createContext();
  jestFn(callback.bind(TestContext.context));
};

export default gwtRunner(jestTest);
export { TestContext };
export const beforeEach = before(jestBeforeEach);
export const afterEach = after(jestAfterEach);
export const beforeAll = before(jestBeforeAll);
export const afterAll = after(jestAfterAll);
