const AV = require("../utils/av-live-query-weapp-min");

class Todo extends AV.Object {
    get content() { return this.get('content') }
    set content(value) { this.set('content', value) }
    
    get description() { return this.get('description') }
    set description(value) { return this.set('description', value) }
    
    get startTime() { return this.get('startTime') }
    set startTime(value) { this.set('startTime', value) }

    get endTime() { return this.get('endTime') }
    set endTime(value) { this.set('endTime', value) }

    get file() { return this.get('file') }
    set file(value) { this.set('file', value) }

    get done() { return this.get('done') }
    set done(value) { this.set('done', value) }

    get dependent() { return this.get('dependent') }
    set dependent(value) { this.set('dependent', value) }
}

AV.Object.register(Todo, 'Todo');
module.exports = Todo;
