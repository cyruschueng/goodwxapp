define("js/control/queryCtrl.js", (dataAndEvents, deepDataAndEvents, obj) => {
    /**
     * @param {?} dataAndEvents
     * @param {Function} obj
     * @return {undefined}
     */
    function keys(dataAndEvents, obj) {
        if (!(dataAndEvents instanceof obj)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    Object.defineProperty(obj, "__esModule", {
        value: true
    });
    const HOP = (() => {
        /**
         * @param {Function} object
         * @param {Array} d
         * @return {undefined}
         */
        function defineProperty(object, d) {
            /** @type {number} */
            let i = 0;
            for (; i < d.length; i++) {
                const desc = d[i];
                desc.enumerable = desc.enumerable || false;
                /** @type {boolean} */
                desc.configurable = true;
                if ("value" in desc) {
                    /** @type {boolean} */
                    desc.writable = true;
                }
                Object.defineProperty(object, desc.key, desc);
            }
        }
        return (x, current, a) => (current && defineProperty(x.prototype, current), a && defineProperty(x, a), x);
    })();
    const value = (() => {
        /**
         * @param {?} attrs
         * @return {undefined}
         */
        function save(attrs) {
            keys(this, save);
            this.game = attrs;
            this.model = this.game.gameModel;
            this.gameCtrl = this.game.gameCtrl;
            this.gameView = this.game.gameView;
        }
        return HOP(save, [{
            key: "identifyMode",
            /**
             * @param {Object} req
             * @return {undefined}
             */
            value(req) {
                if (req.query && req.query.hasOwnProperty("mode")) {
                    switch (req.query.mode) {
                        case "groupShare":
                            if (req.shareTicket) {
                                this.model.setMode("groupShare");
                            } else {
                                this.gameCtrl.identifyModeErr("\u83b7\u53d6\u7fa4\u4fe1\u606f\u5931\u8d25");
                                this.model.setMode("single");
                            }
                            break;
                        case "battle":
                            if (req.query.pkId) {
                                this.model.setMode("battle");
                            } else {
                                this.gameCtrl.identifyModeErr("\u83b7\u53d6PK\u4fe1\u606f\u5931\u8d25");
                                this.model.setMode("single");
                            }
                            break;
                        case "observe":
                            if (req.query.gameId) {
                                this.model.setMode("observe");
                            } else {
                                this.gameCtrl.identifyModeErr("\u83b7\u53d6\u56f4\u89c2\u4fe1\u606f\u5931\u8d25");
                                this.model.setMode("single");
                            }
                            break;
                        case "relay":
                            if (req.query.room_id && (req.query.router_id && req.query.version)) {
                                this.model.setMode("relay");
                            } else {
                                this.model.setMode("single");
                            }
                            break;
                        default:
                            this.model.setMode("single");
                    }
                } else {
                    this.model.setMode("single");
                }
            }
        }]), save;
    })();
    obj.default = value;
});