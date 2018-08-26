var roominfo = cc._Class.extend({
    extends : cc.Object,

    ctor : function() {
    },

    parse : function(params, isMatch) {
        this.mRoomId = params.id;
        this.mMixId = parseInt(params.mixId);
        this.mIsMatch = isMatch;
    },

    isMatch : function() {
        return this.mIsMatch;
    },
});

var roomsinfo = cc._Class.extend({
    ctor : function() {
        this.mRooms= [];
        this.mRoomSearchCache = {};
    },

    getRoomById : function(roomId) {
        if (this.mRoomSearchCache[roomId]) {
            return this.mRoomSearchCache[roomId];
        }

        for (var i = 0; i < this.mRooms.length; i++) {
            var room = this.mRooms[i];
            if (room.mRoomId == roomId) {
                this.mRoomSearchCache[roomId] = room;
                return room;
            }
        }
    },

    parseHallInfoMsg : function(params) {
        var rooms = [];

        params.forEach(function(session) {
            session.rooms.forEach(function(info) {
                var room = new roominfo();
                room.parse(info, session.match);
                rooms.push(room);
            });
        });

        this.mRooms = rooms;
    },

    topMatch : function() {
        for (var i = 0; i < this.mRooms.length; i++) {
            var room = this.mRooms[i];
            if (room.isMatch()) {
                return room;
            }
        }
    },

    isMatch : function(roomId) {
        var room = this.getRoomById(roomId);
        if (room) {
            return room.isMatch();
        }
    },
});

module.exports = roomsinfo;
