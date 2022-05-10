const knex = require('knex');
const { getItemsQuery, getItemByIdQuery } = require('../items.queries');
const { getTracker, MockClient } = require('knex-mock-client');

describe('items.queries', () => {
  let mockDb;
  let tracker;
  let expected;

  beforeEach(() => {
    mockDb = knex({ client: MockClient });
    tracker = getTracker();
  });

  afterEach(() => {
    tracker.reset();
  });

  describe('when invoke getItemsQuery', () => {
    beforeEach(() => {
      tracker.on.select('ITEMS').response([
        { id: 1, name: 'item1', tags: 'abc|123' },
        { id: 2, name: 'item2', tags: 'xyz|123' },
      ]);
    });

    it('should return the mock data', async () => {
      expected = [
        { id: 1, name: 'item1', tags: ['abc', '123'] },
        { id: 2, name: 'item2', tags: ['xyz', '123'] },
      ];

      const actual = await getItemsQuery({}, mockDb);

      expect(actual).toStrictEqual(expected);
    });

    it('should order with the given input', async () => {
      // eslint-disable-next-line no-useless-escape
      expected = `order by \"name\" ASC`;

      await getItemsQuery({ orderBy: { name: 'ASC' } }, mockDb);

      const actual = tracker.history.select[0].sql;

      expect(actual).toContain(expected);
    });
  });

  describe('when invoke getItemByIdQuery', () => {
    beforeEach(() => {
      tracker.on.select('ITEMS').response([{ name: 'test', tags: 'abc|123' }]);
    });

    it('should return the mock data', async () => {
      expected = { name: 'test', tags: ['abc', '123'] };

      const actual = await getItemByIdQuery({ id: 1 }, mockDb);

      expect(actual).toStrictEqual(expected);
    });

    it('should query with the given input', async () => {
      expected = Date.now();

      await getItemByIdQuery({ id: expected }, mockDb);

      const actual = tracker.history.select[0].bindings[0];

      expect(actual).toStrictEqual(expected);
    });
  });
});
