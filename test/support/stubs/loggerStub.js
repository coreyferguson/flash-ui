
class LoggerStub {

  tid(tid) {}

  info(message, props) {}

  error(message, props) {}

  startTimer(name, tid) {
    return new TimerStub();
  }

}

class TimerStub {
  stop(success) {}
}

module.exports = new LoggerStub();
