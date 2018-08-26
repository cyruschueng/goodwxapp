const AV = require("../utils/av-live-query-weapp-min");

class Team extends AV.Objcet {
    get teamName() { return this.get('teamName') }
    set teamName(value) { this.set('teamName', value) }
    
    get founder() { return this.get('founder') }
    set founder(value) { this.set('founder', value) }

    get peopleNumber() { return this.get('peopleNumber') }
    set peopleNumber(value) { this.set('peopleNumber', value) }

    get projectNumber() { return this.get('projectNumber') }
    set projectNumber(value) { this.set('projectNumber', value) }
}

AV.Object.register(Team, 'Team');
module.exports = Team;
