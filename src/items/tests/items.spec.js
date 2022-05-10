const { itemMapper } = require('../items');

describe('items', () => {
  describe('when invoke itemsMapper', () => {
    it('should create an empty array when record does not have tag', () => {
      const input = {
        name: 'test',
      };

      const expected = {
        name: 'test',
        tags: [],
      };

      const actual = itemMapper(input);

      expect(actual).toStrictEqual(expected);
    });

    it('should create a correct array when record has tag', () => {
      const input = {
        name: 'test',
        tags: 'abc|xyz|123',
      };

      const expected = {
        name: 'test',
        tags: ['abc', 'xyz', '123'],
      };

      const actual = itemMapper(input);

      expect(actual).toStrictEqual(expected);
    });
  });
});
