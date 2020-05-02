import takeQueue from './takeQueue';

describe('takeQueue', () => {
    test('actionType passed to takeEvery', () => {
        const gen = takeQueue({ actionType: 'ACTION_TYPE', actionSaga: function*() {} });
        const takeEverySaga = gen.next();
        expect(takeEverySaga.value.type).toBe('FORK');
        expect(takeEverySaga.value.payload.args[0]).toEqual('ACTION_TYPE');
    });

    test('process items in queue', () => {
        const actionSaga = jest.fn().mockImplementation(function*() {});
        const takeQueueGenerator = takeQueue({ actionType: 'ACTION_TYPE', actionSaga });
        const takeEveryCall = takeQueueGenerator.next();
        const addToQueue = takeEveryCall.value.payload.args[1];
        const takeFromQueueGenerator = takeQueueGenerator.next().value;
        addToQueue({ payload: 'payload value 1' }).next();
        addToQueue({ payload: 'payload value 2' }).next();
        addToQueue({ payload: 'payload value 3' }).next();
        takeFromQueueGenerator.next();
        const yieldActionSaga = () => takeFromQueueGenerator.next();
        for (let i=0; i<10; i++) yieldActionSaga();
        expect(actionSaga).toHaveBeenCalledTimes(3);
    });

    test('start and stop queue', () => {
        const actionSaga = jest.fn().mockImplementation(function*() {});
        const startQueue = jest.fn().mockImplementation(function*() {});
        const endQueue = jest.fn().mockImplementation(function*() {});
        const takeQueueGenerator = takeQueue({ actionType: 'ACTION_TYPE', actionSaga, startQueue, endQueue });
        const takeEveryCall = takeQueueGenerator.next();
        const addToQueue = takeEveryCall.value.payload.args[1];
        const takeFromQueueGenerator = takeQueueGenerator.next().value;
        addToQueue({ payload: 'payload value 1' }).next();
        addToQueue({ payload: 'payload value 2' }).next();
        takeFromQueueGenerator.next(); // yield take(actionType)
        takeFromQueueGenerator.next(); // yield startQueue
        takeFromQueueGenerator.next(); // yield actionSaga
        takeFromQueueGenerator.next(); // yield actionSaga
        takeFromQueueGenerator.next(); // yield endQueue
        expect(startQueue).toHaveBeenCalledTimes(1);
        expect(actionSaga).toHaveBeenCalledTimes(2);
        expect(endQueue).toHaveBeenCalledTimes(1);
    });

    test('start and stop queue multiple times', () => {
        const actionSaga = jest.fn().mockImplementation(function*() {});
        const startQueue = jest.fn().mockImplementation(function*() {});
        const endQueue = jest.fn().mockImplementation(function*() {});
        const takeQueueGenerator = takeQueue({ actionType: 'ACTION_TYPE', actionSaga, startQueue, endQueue });
        const takeEveryCall = takeQueueGenerator.next();
        const addToQueue = takeEveryCall.value.payload.args[1];
        const takeFromQueueGenerator = takeQueueGenerator.next().value;
        // process entire queue once
        addToQueue({ payload: 'payload value 1' }).next();
        takeFromQueueGenerator.next(); // yield take(actionType)
        takeFromQueueGenerator.next(); // yield startQueue
        takeFromQueueGenerator.next(); // yield actionSaga
        takeFromQueueGenerator.next(); // yield endQueue
        expect(startQueue).toHaveBeenCalledTimes(1);
        expect(actionSaga).toHaveBeenCalledTimes(1);
        expect(endQueue).toHaveBeenCalledTimes(1);
        // process entire queue again
        takeFromQueueGenerator.next(); // yield back to start: take(actionType)
        addToQueue({ payload: 'payload value 1' }).next();
        takeFromQueueGenerator.next(); // yield startQueue
        takeFromQueueGenerator.next(); // yield actionSaga
        takeFromQueueGenerator.next(); // yield endQueue
        expect(startQueue).toHaveBeenCalledTimes(2);
        expect(actionSaga).toHaveBeenCalledTimes(2);
        expect(endQueue).toHaveBeenCalledTimes(2);
    });

    test('error when processing item in queue', () => {
        const actionSaga = jest.fn().mockImplementation(function*() {});
        const errorSaga = jest.fn().mockImplementation(function*() {});
        const takeQueueGenerator = takeQueue({ actionType: 'ACTION_TYPE', actionSaga, errorSaga });
        const takeEveryCall = takeQueueGenerator.next();
        const addToQueue = takeEveryCall.value.payload.args[1];
        const takeFromQueueGenerator = takeQueueGenerator.next().value;
        addToQueue({ payload: 'payload value 1' }).next();
        addToQueue({ payload: 'payload value 2' }).next();
        addToQueue({ payload: 'payload value 3' }).next();
        takeFromQueueGenerator.next(); // yield take(actionType)
        takeFromQueueGenerator.next(); // yield actionSaga
        const sendErrorToQueue = takeFromQueueGenerator.next({ action: {}, error: {} }); // yield sendErrorToQueue
        const yieldErrorSaga = () => sendErrorToQueue.value.next();
        for (let i=0; i<10; i++) yieldErrorSaga();
        expect(actionSaga).toHaveBeenCalledTimes(1);
        expect(errorSaga).toHaveBeenCalledTimes(3);
    });
});