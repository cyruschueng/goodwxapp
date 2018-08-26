define("js/config.js", ($sanitize, dataAndEvents, self) => {
    Object.defineProperty(self, "__esModule", {
        value: true
    });
    self.EVENT = self.USEMMPAYBASE = self.USEWANGZHEBASE = self.SUBVERSION = self.VERSION = self.REPORTERTIMEOUT = self.loader = self.FRUSTUMSIZE = self.BLOCK = self.AUDIO = self.CAMERA = self.WAVE = self.GAME = self.PARTICLE = self.BOTTLE = self.COLORS = void 0;
    const TextureLoader = (b => {
        if (b && b.__esModule) {
            return b;
        }
        const c = {};
        if (null != b) {
            let e;
            for (e in b) {
                if (Object.prototype.hasOwnProperty.call(b, e)) {
                    c[e] = b[e];
                }
            }
        }
        return c.default = b, c;
    })($sanitize("./lib/three"));
    const parent = (self.COLORS = {
        red: 13387325,
        pureRed: 16711680,
        white: 14209233,
        brown: 5845806,
        pink: 15964855,
        brownDark: 2300175,
        blue: 40951,
        yellow: 16760320,
        pureWhite: 16777215,
        orange: 16231020,
        orangeDark: 16747520,
        black: 0,
        cream: 16119285,
        green: 2924391,
        lightBlue: 13758190,
        cyan: 9692366,
        yellowBrown: 16764811,
        purple: 9083606
    }, self.BOTTLE = {
        headRadius: 0.945,
        bodyWidth: 2.34,
        bodyDepth: 2.34,
        bodyHeight: 3.2,
        reduction: 0.005,
        minScale: 0.5,
        velocityYIncrement: 15,
        velocityY: 135,
        velocityZIncrement: 70
    });
    const settings = (self.PARTICLE = {
        radius: 0.3,
        detail: 2
    }, self.GAME = {
        BOTTOMBOUND: -55,
        TOPBOUND: 41,
        gravity: 720,
        touchmoveTolerance: 20,
        LEFTBOUND: -140,
        topTrackZ: -30,
        rightBound: 90,
        HEIGHT: window.innerHeight || 736,
        WIDTH: window.innerWidth || 414,
        canShadow: true
    });
    self.WAVE = {
        innerRadius: 2.2,
        outerRadius: 3,
        thetaSeg: 25
    };
    self.CAMERA = {
        fov: 60
    };
    self.AUDIO = {
        success: "res/success.mp3",
        perfect: "res/perfect.mp3",
        scale_loop: "res/scale_loop.mp3",
        scale_intro: "res/scale_intro.mp3",
        restart: "res/start.mp3",
        fall: "res/fall.mp3",
        fall_2: "res/fall_2.mp3",
        combo1: "res/combo1.mp3",
        combo2: "res/combo2.mp3",
        combo3: "res/combo3.mp3",
        combo4: "res/combo4.mp3",
        combo5: "res/combo5.mp3",
        combo6: "res/combo6.mp3",
        combo7: "res/combo7.mp3",
        combo8: "res/combo8.mp3",
        icon: "res/icon.mp3",
        pop: "res/pop.mp3",
        sing: "res/sing.mp3",
        store: "res/store.mp3",
        water: "res/water.mp3",
        pay: "res/wechat_pay.mp3",
        luban: "res/luban.mp3",
        relax: "res/relax.mp3"
    };
    self.BLOCK = {
        radius: 5,
        width: 10,
        minRadiusScale: 0.8,
        maxRadiusScale: 1,
        height: 5.5,
        radiusSegments: [4, 50],
        floatHeight: 0,
        minDistance: 1,
        maxDistance: 17,
        minScale: parent.minScale,
        reduction: parent.reduction,
        moveDownVelocity: 0.07,
        fullHeight: 5.5 / 21 * 40
    };
    /** @type {number} */
    self.FRUSTUMSIZE = settings.HEIGHT / settings.WIDTH / 736 * 414 * 60;
    self.loader = new TextureLoader.TextureLoader;
    /** @type {number} */
    self.REPORTERTIMEOUT = 60001;
    /** @type {number} */
    self.VERSION = 3;
    /** @type {string} */
    self.SUBVERSION = "3.1.1";
    /** @type {number} */
    self.USEWANGZHEBASE = 1;
    /** @type {number} */
    self.USEMMPAYBASE = 1;
    self.EVENT = {
        RELAYCREATEROOM: "relayCreateRoom",
        JOINRELAYROOM: "JOINRELAYROOM",
        PEOPLECOME: "PEOPLECOME",
        PEOPLEOUT: "PEOPLEOUT",
        RELAYSTART: "RELAYSTART",
        NOWPLAYERJUMP: "NOWPLAYERJUMP",
        CHECKUSER: "CHECKUSER",
        RELAYCHECKUSER: "RELAYCHECKUSER",
        RUNGAME: "RUNGAME",
        ENDGAME: "ENDGAME",
        PLAYERDIED: "PLAYERDIED",
        NOWPLAYEROVER: "NOWPLAYEROVER",
        RECEIVEMINICODE: "RECEIVEMINICODE",
        GOSTARTPAGE: "GOSTARTPAGE",
        GOTOSINGLESTARTPAGE: "GOTOSINGLESTARTPAGE",
        REPLAYAGAIN: "REPLAYAGAIN",
        SYNCMSGSEQ: "SYNCMSGSEQ",
        RELAYMODEDESTROY: "RELAYMODEDESTROY",
        SYNCSCENE: "SYNCSCENE",
        WATCHRELAY: "WATCHRELAY",
        CHECK_GAME: "CHECK_GAME",
        SEND_CHECK_GAME: "SEND_CHECK_GAME",
        PROGRESSOVER: "PROGRESSOVER",
        CHANGEGAMELEVEL: "CHANGEGAMELEVEL",
        RECEIVEGAMELEVELCHANGE: "RECEIVEGAMELEVELCHANGE",
        SHOW_RELAY_GUIDE: "SHOW_RELAY_GUIDE",
        SKIP_RELAY_GUIDE: "SKIP_RELAY_GUIDE",
        CREATE_RELAY_ROOM_FAIL: "CREATE_RELAY_ROOM_FAIL",
        RP_JOIN_RELAY_ROOM_AGAIN: "RP_JOIN_RELAY_ROOM_AGAIN",
        RP_JOIN_RELAY_ROOM: "RP_JOIN_RELAY_ROOM",
        RP_RELAY_START: "RP_RELAY_START",
        ORDERRUNGAME: "ORDERRUNGAME",
        RP_RELAY_GAME_END: "RP_RELAY_GAME_END",
        GETRELAYQR: "GETRELAYQR",
        GETRELAYCHECKUSERERROR: "GETRELAYCHECKUSERERROR",
        INITRESPONSE: "INITRESPONSE",
        TRIGGER_EGG: "TRIGGER_EGG"
    };
});