# botbuilder-aws-lambda

Deploy your Microsoft Bot as an AWS Lambda function.

SampleCode in TypeScript

```ts
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityTypes, BotFrameworkAdapter, TurnContext } from 'botbuilder';
import * as lambda from 'botbuilder-aws-lambda';

const adapter = new BotFrameworkAdapter({
    appId: process.env.appID,
    appPassword: process.env.appPassword,
});

export class MyBot {
    /**
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     *
     * @param {TurnContext} context on turn context object.
     */
    public onTurn = async (turnContext: TurnContext) => {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (turnContext.activity.type === ActivityTypes.Message) {
            await turnContext.sendActivity(`You said '${ turnContext.activity.text }'`);
        } else {
            // Generic handler for all other activity types.
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }
}

exports.MyBot = MyBot;
const bot = new MyBot();

exports.handler = lambda(adapter, bot);

```

## LICENSE

Apache 2.0