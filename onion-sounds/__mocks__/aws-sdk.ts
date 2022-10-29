// we can import this mock response and change it now per test
export const awsSdkGetPromiseResponse = jest
  .fn()
  .mockReturnValue(Promise.resolve({ Item: {} }));

// we can import this mock response and change it now per test
export const awsSdkPutPromiseResponse = jest.fn().mockReturnValue(
  Promise.resolve({
    ConsumedCapacity: 1,
    Attributes: {},
    ItemCollectionMetrics: {},
  })
);

// we can import this mock response and change it now per test
export const awsSdkPutEventPromiseResponse = jest.fn().mockReturnValue(
  Promise.resolve({
    Entries: [],
  })
);

const getFn = jest
  .fn()
  .mockImplementation(() => ({ promise: awsSdkGetPromiseResponse }));

const putFn = jest
  .fn()
  .mockImplementation(() => ({ promise: awsSdkPutPromiseResponse }));

const putEventsFn = jest
  .fn()
  .mockImplementation(() => ({ promise: awsSdkPutEventPromiseResponse }));

class DocumentClient {
  get = getFn;
  put = putFn;
}

export const DynamoDB = {
  DocumentClient,
};

export class EventBridge {
  putEvents = putEventsFn;
}
