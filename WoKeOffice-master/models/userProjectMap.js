const AV = require("../utils/av-live-query-weapp-min");

class UserProjectMap extends AV.Objcet {
    get project() { return this.get('project') }
    set project(value) { this.set('project', value) }
    
    get user() { return this.get('user') }
    set user(value) { this.set('user', value) }

    get role() { return this.get('role') }
    set role(value) { this.set('role', value) }
}

AV.Object.register(UserProjectMap, 'UserProjectMap');
module.exports = UserProjectMap;