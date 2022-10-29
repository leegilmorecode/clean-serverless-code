import * as AWS from 'aws-sdk';

import { CustomerAccountProps } from '@models/types';
import { PutEventsRequestEntry } from 'aws-sdk/clients/eventbridge';
import { config } from '@config/config';

const eventBridge = new AWS.EventBridge();

// this is a secondary adapter which will publish the event to eventbridge
// domain --> use case --> (adapter)
export async function publishCustomerAccountEvent(
  customerAccount: CustomerAccountProps,
  detailType: string,
  source: string
): Promise<void> {
  const eventBus = config.get('eventBus');

  const createEvent: PutEventsRequestEntry = {
    Detail: JSON.stringify({ ...customerAccount }),
    DetailType: detailType,
    EventBusName: eventBus,
    Source: source,
  };

  const subscriptionEvent: AWS.EventBridge.PutEventsRequest = {
    Entries: [createEvent],
  };

  await eventBridge.putEvents(subscriptionEvent).promise();
}
