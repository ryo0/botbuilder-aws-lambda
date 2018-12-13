'use strict';

function lambda(adapter, bot) {
    const handler = (event, context, callback) => {
        const body = JSON.parse(event.body);
        const reqWrapper = {
            body,
            headers: event.headers,
        };
        let statusCode;
        const resWrapper = {
            status: (code) => {
                statusCode = code;
            },
            send: (body) => {
                callback(null, {statusCode, body});
            },
            end: () => {
                callback(null, { statusCode });
            },
        };

        adapter.processActivity(reqWrapper, resWrapper, async (context) => {
            await bot.onTurn(context);
        });
    };
    return handler;
}

module.exports = lambda;