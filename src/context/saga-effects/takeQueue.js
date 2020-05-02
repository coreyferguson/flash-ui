
import { take, takeEvery } from 'redux-saga/effects';

/**
 * An effect to handle actions in a non-blocking queue.
 * If an event is being executed when another event is fired, the second event is added to a queue.
 * Action handlers will be fired in sequence.
 *
 * @param {string} options.actionType the redux action type to watch
 * @param {function} options.actionSaga a generator function executed when processing a single action
 * @param {function} options.errorSaga a generator function executed when processing an error
 * @param {function} [options.startQueue] a generator function executed when a queue is started
 * @param {function} [options.endQueue] a generator function executed when a queue is finished
 */
export default function* takeQueue({ actionType, actionSaga, errorSaga, startQueue, endQueue }) {
    let queue = [];

    function* addToQueue(action) {
        queue.push(action);
    }

    function* takeFromQueue() {
        while (true) {
            yield take(actionType);
            if (startQueue) yield startQueue();
            while (queue.length > 0) {
                let action = queue[0];
                const error = yield actionSaga(action);
                if (!error) queue.shift();
                else yield sendErrorToQueue(error);
            }
            if (endQueue) yield endQueue();
        }
    }

    function* sendErrorToQueue(error) {
        while (queue.length > 0) {
            const action = queue.pop();
            yield errorSaga({ action, error });
        }
    }

    yield takeEvery(actionType, addToQueue);
    yield takeFromQueue();
}

