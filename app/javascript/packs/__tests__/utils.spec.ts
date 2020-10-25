import { Utils } from '../utils/utils';

describe('Utils Module', () => {
  const utils = new Utils();

  test('It should return next week days', () => {
    const weeks = utils.getNextWeek();
    expect(weeks.length).toBe(7);
  });

  test('It should return prev week days', () => {
    const weeks = utils.getPrevWeek();
    expect(weeks.length).toBe(7);
  });

  test('It should return current week days', () => {
    const weeks = utils.getCurrentWeek();
    expect(weeks.length).toBe(7);
  });
});
