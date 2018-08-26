const AV = require("../utils/av-live-query-weapp-min");

class Schedule extends AV.Object {
    get title() { return this.get('title') }
    set title(value) { return this.set('title', value) }

    get content() { return this.get('content') }
    set content(value) { this.set('content', value) }

    get repeat() { return this.get('repeat') }
    set repeat(value) { this.set('repeat', value) }

    get user() { return this.get('user') }
    set user(value) { this.set('user', value) }

    get dependent() { return this.get('dependent') }
    set dependent(value) { this.set('dependent', value) }
}

AV.Object.register(Schedule, 'Schedule');
module.exports = Schedule;