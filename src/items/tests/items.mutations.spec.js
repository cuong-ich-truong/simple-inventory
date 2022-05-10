const knex = require('knex');
const { getTracker, MockClient } = require('knex-mock-client');
const { sendEventMessage } = require('../../services/message-producer.service');
const { addItemMutation } = require('../items.mutations');

jest.mock('../../services/message-producer.service', () => {
  return {
    __esModule: true,
    sendEventMessage: jest.fn(),
  };
});
describe('items.mutations', () => {
  let mockDb;
  let tracker;
  let expected;

  beforeEach(() => {
    mockDb = knex({ client: MockClient });
    tracker = getTracker();
  });

  afterEach(() => {
    tracker.reset();
    jest.clearAllMocks();
  });

  describe('when invoke addItemMutation', () => {
    beforeEach(() => {
      expected = Date.now();
      tracker.on.insert('ITEMS').response([expected]);
    });

    it('should return the expected Id', async () => {
      const actual = await addItemMutation({}, mockDb);

      expect(actual).toBe(expected);
    });

    it('should insert the input object', async () => {
      expected = {
        name: 'item1',
        price: 123,
        tags: ['abc', '123'],
      };

      await addItemMutation(expected, mockDb);

      const actual = {
        name: tracker.history.insert[0].bindings[0],
        price: tracker.history.insert[0].bindings[1],
        tags: tracker.history.insert[0].bindings[2],
      };

      expect(actual).toStrictEqual({ ...expected, tags: 'abc|123' });
    });

    it('should send an event message', async () => {
      await addItemMutation({}, mockDb);

      expect(sendEventMessage.mock.calls.length).toBe(1);
    });

    it('should send a message with correct event and args', async () => {
      await addItemMutation({}, mockDb);

      expect(sendEventMessage.mock.calls[0][0]).toStrictEqual({
        event: 'ItemAdded',
        args: { id: expected },
      });
    });
  });
});
