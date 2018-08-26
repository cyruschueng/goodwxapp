const AV = require("../utils/av-live-query-weapp-min");

class Project extends AV.Objcet {
    get projectName() { return this.get('projectName') }
    set projectName(value) { this.set('projectName', value) }
    
    get team() { return this.get('team') }
    set team(value) { this.set('team', value) }

    get visibility() { return this.get('visibility') }
    set visibility(value) { this.set('visibility', value) }

    get startTime() { return this.get('startTime') }
    set startTime(value) { this.set('startTime', value) }

    get endTime() { return this.get('endTime') }
    set endTime(value) { this.set('endTime', value) }

    get founder() { return this.get('founder') }
    set founder(value) { this.set('founder', value) }

    get peopleNumber() { return this.get('peopleNumber') }
    set peopleNumber(value) { this.set('peopleNumber', value) }

    get todoNumber() { return this.get('todoNumber') }
    set todoNumber(value) { this.set('todoNumber', value) }
}

AV.Object.register(Project, 'Project');
module.exports = Project;