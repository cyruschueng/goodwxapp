const AV = require("../utils/av-live-query-weapp-min");

class UserTeamMap extends AV.Objcet {
    get team() { return this.get('team') }
    set team(value) { this.set('team', value) }
    
    get user() { return this.get('user') }
    set user(value) { this.set('user', value) }

    get role() { return this.get('role') }
    set role(value) { this.set('role', value) }
}

AV.Object.register(UserTeamMap, 'UserTeamMap');
module.exports = UserTeamMap;