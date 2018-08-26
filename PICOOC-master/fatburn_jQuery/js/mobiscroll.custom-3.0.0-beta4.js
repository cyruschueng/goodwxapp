(function(ab, q) {
    "function" === typeof define && define.amd ? define(["jquery"], q) : "object" === typeof exports ? module.exports = q(require("jquery")) : ab.mobiscroll = q(ab.jQuery)
})(this, function(ab) {
    var q = q || {};
    (function(j, c, b) {
        function e(a) {
            for (var c in a)
                if (n[a[c]] !== b) return !0;
            return !1
        }

        function a(a, c, d) {
            var e = a;
            if ("object" === typeof c) return a.each(function() {
                p[this.id] && p[this.id].destroy();
                new q.classes[c.component || "Scroller"](this, c)
            });
            "string" === typeof c && a.each(function() {
                var a;
                if ((a = p[this.id]) && a[c])
                    if (a =
                        a[c].apply(this, Array.prototype.slice.call(d, 1)), a !== b) return e = a, !1
            });
            return e
        }

        function d(a) {
            if (h.tapped && !a.tap && !("TEXTAREA" == a.target.nodeName && "mousedown" == a.type)) return a.stopPropagation(), a.preventDefault(), !1
        }
        var h, i = "undefined" == typeof ab ? q.$ : ab,
            M = +new Date,
            p = {},
            o = i.extend,
            n = c.createElement("modernizr").style,
            j = e(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]),
            l = e(["flex", "msFlex", "WebkitBoxDirection"]),
            L = function() {
                var a = ["Webkit", "Moz", "O",
                        "ms"
                    ],
                    b;
                for (b in a)
                    if (e([a[b] + "Transform"])) return "-" + a[b].toLowerCase() + "-";
                return ""
            }(),
            D = L.replace(/^\-/, "").replace(/\-$/, "").replace("moz", "Moz");
        h = q = {
            $: i,
            version: "3.0.0-beta4beta4",
            util: {
                prefix: L,
                jsPrefix: D,
                has3d: j,
                hasFlex: l,
                isOldAndroid: /android [1-3]/i.test(navigator.userAgent),
                preventClick: function() {
                    h.tapped++;
                    setTimeout(function() {
                        h.tapped--
                    }, 500)
                },
                testTouch: function(a, b) {
                    if ("touchstart" == a.type) i(b).attr("data-touch", "1");
                    else if (i(b).attr("data-touch")) return i(b).removeAttr("data-touch"), !1;
                    return !0
                },
                objectToArray: function(a) {
                    var b = [],
                        c;
                    for (c in a) b.push(a[c]);
                    return b
                },
                arrayToObject: function(a) {
                    var b = {},
                        c;
                    if (a)
                        for (c = 0; c < a.length; c++) b[a[c]] = a[c];
                    return b
                },
                isNumeric: function(a) {
                    return 0 <= a - parseFloat(a)
                },
                isString: function(a) {
                    return "string" === typeof a
                },
                getCoord: function(a, b, c) {
                    var d = a.originalEvent || a,
                        b = (c ? "page" : "client") + b;
                    return d.targetTouches && d.targetTouches[0] ? d.targetTouches[0][b] : d.changedTouches && d.changedTouches[0] ? d.changedTouches[0][b] : a[b]
                },
                getPosition: function(a, c) {
                    var d =
                        getComputedStyle(a[0]),
                        e;
                    i.each(["t", "webkitT", "MozT", "OT", "msT"], function(a, c) {
                        if (d[c + "ransform"] !== b) return e = d[c + "ransform"], !1
                    });
                    e = e.split(")")[0].split(", ");
                    return c ? e[13] || e[5] : e[12] || e[4]
                },
                constrain: function(a, b, c) {
                    return Math.max(b, Math.min(a, c))
                },
                vibrate: function(a) {
                    "vibrate" in navigator && navigator.vibrate(a || 50)
                }
            },
            tapped: 0,
            autoTheme: "mobiscroll",
            presets: {
                scroller: {},
                numpad: {},
                listview: {},
                menustrip: {}
            },
            themes: {
                form: {},
                frame: {},
                listview: {},
                menustrip: {},
                progress: {}
            },
            i18n: {},
            instances: p,
            classes: {},
            components: {},
            settings: {},
            setDefaults: function(a) {
                o(this.settings, a)
            },
            presetShort: function(c, d, e) {
                h[c] = function(a, l) {
                    var g, k, n = {},
                        o = l || {};
                    i.extend(o, {
                        preset: !1 === e ? b : c
                    });
                    i(a).each(function() {
                        p[this.id] && p[this.id].destroy();
                        g = new h.classes[d || "Scroller"](this, o);
                        n[this.id] = g
                    });
                    k = Object.keys(n);
                    return 1 == k.length ? n[k[0]] : n
                };
                this.components[c] = function(h) {
                    return a(this, o(h, {
                        component: d,
                        preset: !1 === e ? b : c
                    }), arguments)
                }
            }
        };
        i.mobiscroll = q;
        i.fn.mobiscroll = function(b) {
            o(this, q.components);
            return a(this, b,
                arguments)
        };
        q.classes.Base = function(a, b) {
            var c, d, e, h, k, l, n = q,
                j = n.util,
                s = j.getCoord,
                f = this;
            f.settings = {};
            f._presetLoad = function() {};
            f._init = function(s) {
                for (var i in f.settings) delete f.settings[i];
                e = f.settings;
                o(b, s);
                f._hasDef && (l = n.settings);
                o(e, f._defaults, l, b);
                if (f._hasTheme) {
                    k = e.theme;
                    if ("auto" == k || !k) k = n.autoTheme;
                    "default" == k && (k = "mobiscroll");
                    b.theme = k;
                    h = n.themes[f._class] ? n.themes[f._class][k] : {}
                }
                f._hasLang && (c = n.i18n[e.lang]);
                f._hasTheme && f.trigger("onThemeLoad", {
                    lang: c,
                    settings: b
                });
                o(e, h,
                    c, l, b);
                if (f._hasPreset && (f._presetLoad(e), d = n.presets[f._class][e.preset])) d = d.call(a, f), o(e, d, b)
            };
            f._destroy = function() {
                f && (f.trigger("onDestroy", []), delete p[a.id], f = null)
            };
            f.tap = function(a, b, c) {
                function d(a) {
                    n || (c && a.preventDefault(), n = this, l = s(a, "X"), i = s(a, "Y"), A = !1)
                }

                function h(a) {
                    if (n && !A && 9 < Math.abs(s(a, "X") - l) || 9 < Math.abs(s(a, "Y") - i)) A = !0
                }

                function g(a) {
                    n && (A || (a.preventDefault(), b.call(n, a, f)), n = !1, j.preventClick())
                }

                function k() {
                    n = !1
                }
                var l, i, n, A;
                if (e.tap) a.on("touchstart.mbsc", d).on("touchcancel.mbsc",
                    k).on("touchmove.mbsc", h).on("touchend.mbsc", g);
                a.on("click.mbsc", function(a) {
                    a.preventDefault();
                    b.call(this, a, f)
                })
            };
            f.trigger = function(c, e) {
                var k;
                i.each([l, h, d, b], function(b, d) {
                    d && d[c] && (k = d[c].call(a, e || {}, f))
                });
                return k
            };
            f.option = function(a, b) {
                var c = {};
                "object" === typeof a ? c = a : c[a] = b;
                f.init(c)
            };
            f.getInst = function() {
                return f
            };
            b = b || {};
            i(a).addClass("mbsc-comp");
            a.id || (a.id = "mobiscroll" + ++M);
            p[a.id] = f
        };
        c.addEventListener && i.each(["mouseover", "mousedown", "mouseup", "click"], function(a, b) {
            c.addEventListener(b,
                d, !0)
        })
    })(window, document);
    q.i18n.hu = {
        setText: "OK",
        cancelText: "M\u00e9gse",
        clearText: "T\u00f6rl\u00e9s",
        selectedText: "{count} kiv\u00e1lasztva",
        dateFormat: "yy.mm.dd.",
        dayNames: "Vas\u00e1rnap,H\u00e9tf\u0151,Kedd,Szerda,Cs\u00fct\u00f6rt\u00f6k,P\u00e9ntek,Szombat".split(","),
        dayNamesShort: "Va,H\u00e9,Ke,Sze,Cs\u00fc,P\u00e9,Szo".split(","),
        dayNamesMin: "V,H,K,Sz,Cs,P,Sz".split(","),
        dayText: "Nap",
        delimiter: ".",
        hourText: "\u00d3ra",
        minuteText: "Perc",
        monthNames: "Janu\u00e1r,Febru\u00e1r,M\u00e1rcius,\u00c1prilis,M\u00e1jus,J\u00fanius,J\u00falius,Augusztus,Szeptember,Okt\u00f3ber,November,December".split(","),
        monthNamesShort: "Jan,Feb,M\u00e1r,\u00c1pr,M\u00e1j,J\u00fan,J\u00fal,Aug,Szep,Okt,Nov,Dec".split(","),
        monthText: "H\u00f3nap",
        secText: "M\u00e1sodperc",
        timeFormat: "H:ii",
        yearText: "\u00c9v",
        nowText: "Most",
        pmText: "de",
        amText: "du",
        firstDay: 1,
        dateText: "D\u00e1tum",
        timeText: "Id\u0151",
        calendarText: "Napt\u00e1r",
        todayText: "Ma",
        prevMonthText: "El\u0151z\u0151 h\u00f3nap",
        nextMonthText: "K\u00f6vetkez\u0151 h\u00f3nap",
        prevYearText: "El\u0151z\u0151 \u00e9v",
        nextYearText: "K\u00f6vetkez\u0151 \u00e9v",
        closeText: "Bez\u00e1r",
        eventText: "esem\u00e9ny",
        eventsText: "esem\u00e9ny",
        fromText: "Eleje",
        toText: "V\u00e9ge",
        wholeText: "Eg\u00e9sz",
        fractionText: "T\u00f6rt",
        unitText: "Egys\u00e9g",
        labels: "\u00c9v,H\u00f3nap,Nap,\u00d3ra,Perc,M\u00e1sodperc,".split(","),
        labelsShort: "\u00c9v,H\u00f3.,Nap,\u00d3ra,Perc,Mp.,".split(","),
        startText: "Ind\u00edt",
        stopText: "Meg\u00e1ll\u00edt",
        resetText: "Vissza\u00e1ll\u00edt",
        lapText: "Lap",
        hideText: "Elrejt",
        backText: "Vissza",
        undoText: "Visszavon",
        offText: "Ki",
        onText: "Be",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.de = {
        setText: "OK",
        cancelText: "Abbrechen",
        clearText: "L\u00f6schen",
        selectedText: "{count} ausgew\u00e4hlt",
        dateFormat: "dd.mm.yy",
        dayNames: "Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag".split(","),
        dayNamesShort: "So,Mo,Di,Mi,Do,Fr,Sa".split(","),
        dayNamesMin: "S,M,D,M,D,F,S".split(","),
        dayText: "Tag",
        delimiter: ".",
        hourText: "Stunde",
        minuteText: "Minuten",
        monthNames: "Januar,Februar,M\u00e4rz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember".split(","),
        monthNamesShort: "Jan,Feb,M\u00e4r,Apr,Mai,Jun,Jul,Aug,Sep,Okt,Nov,Dez".split(","),
        monthText: "Monat",
        secText: "Sekunden",
        timeFormat: "HH:ii",
        yearText: "Jahr",
        nowText: "Jetzt",
        pmText: "nachm.",
        amText: "vorm.",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Zeit",
        calendarText: "Kalender",
        closeText: "Schlie\u00dfen",
        fromText: "Von",
        toText: "Um",
        wholeText: "Ganze Zahl",
        fractionText: "Bruchzahl",
        unitText: "Ma\u00dfeinheit",
        labels: "Jahre,Monate,Tage,Stunden,Minuten,Sekunden,".split(","),
        labelsShort: "Jahr.,Mon.,Tag.,Std.,Min.,Sek.,".split(","),
        startText: "Starten",
        stopText: "Stoppen",
        resetText: "Zur\u00fccksetzen",
        lapText: "Lap",
        hideText: "Ausblenden",
        backText: "Zur\u00fcck",
        undoText: "R\u00fcckg\u00e4ngig machen",
        offText: "Aus",
        onText: "Ein",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.es = {
        setText: "Aceptar",
        cancelText: "Cancelar",
        clearText: "Borrar",
        selectedText: "{count} seleccionado",
        selectedPluralText: "{count} seleccionados",
        dateFormat: "dd/mm/yy",
        dayNames: "Domingo,Lunes,Martes,Mi&#xE9;rcoles,Jueves,Viernes,S&#xE1;bado".split(","),
        dayNamesShort: "Do,Lu,Ma,Mi,Ju,Vi,S&#xE1;".split(","),
        dayNamesMin: "D,L,M,M,J,V,S".split(","),
        dayText: "D&#237;a",
        hourText: "Horas",
        minuteText: "Minutos",
        monthNames: "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre".split(","),
        monthNamesShort: "Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic".split(","),
        monthText: "Mes",
        secText: "Segundos",
        timeFormat: "HH:ii",
        yearText: "A&ntilde;o",
        nowText: "Ahora",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Fecha",
        timeText: "Tiempo",
        calendarText: "Calendario",
        closeText: "Cerrar",
        fromText: "Iniciar",
        toText: "Final",
        wholeText: "Entero",
        fractionText: "Fracci\u00f3n",
        unitText: "Unidad",
        labels: "A\u00f1os,Meses,D\u00edas,Horas,Minutos,Segundos,".split(","),
        labelsShort: "A\u00f1o,Mes,D\u00eda,Hora,Min,Seg,".split(","),
        startText: "Iniciar",
        stopText: "Det\u00e9ngase",
        resetText: "Reinicializar",
        lapText: "Lap",
        hideText: "Esconder",
        backText: "Volver",
        undoText: "Deshacer",
        offText: "No",
        onText: "S\u00ed",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.fr = {
        setText: "Terminer",
        cancelText: "Annuler",
        clearText: "Effacer",
        selectedText: "{count} s\u00e9lectionn\u00e9",
        selectedPluralText: "{count} s\u00e9lectionn\u00e9s",
        dateFormat: "dd/mm/yy",
        dayNames: "&#68;imanche,Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi".split(","),
        dayNamesShort: "&#68;im.,Lun.,Mar.,Mer.,Jeu.,Ven.,Sam.".split(","),
        dayNamesMin: "&#68;,L,M,M,J,V,S".split(","),
        dayText: "Jour",
        monthText: "Mois",
        monthNames: "Janvier,F\u00e9vrier,Mars,Avril,Mai,Juin,Juillet,Ao\u00fbt,Septembre,Octobre,Novembre,D\u00e9cembre".split(","),
        monthNamesShort: "Janv.,F\u00e9vr.,Mars,Avril,Mai,Juin,Juil.,Ao\u00fbt,Sept.,Oct.,Nov.,D\u00e9c.".split(","),
        hourText: "Heures",
        minuteText: "Minutes",
        secText: "Secondes",
        timeFormat: "HH:ii",
        yearText: "Ann\u00e9e",
        nowText: "Maintenant",
        pmText: "apr\u00e8s-midi",
        amText: "avant-midi",
        firstDay: 1,
        dateText: "Date",
        timeText: "Heure",
        calendarText: "Calendrier",
        closeText: "Fermer",
        fromText: "D\u00e9marrer",
        toText: "Fin",
        wholeText: "Entier",
        fractionText: "Fraction",
        unitText: "Unit\u00e9",
        labels: "Ans,Mois,Jours,Heures,Minutes,Secondes,".split(","),
        labelsShort: "Ans,Mois,Jours,Hrs,Min,Sec,".split(","),
        startText: "D\u00e9marrer",
        stopText: "Arr\u00eater",
        resetText: "R\u00e9initialiser",
        lapText: "Lap",
        hideText: "Cachez",
        backText: "Arri\u00e8re",
        undoText: "D\u00e9faire",
        offText: "Non",
        onText: "Oui",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.it = {
        setText: "OK",
        cancelText: "Annulla",
        clearText: "Chiarire",
        selectedText: "{count} selezionato",
        selectedPluralText: "{count} selezionati",
        dateFormat: "dd/mm/yy",
        dayNames: "Domenica,Luned\u00ec,Merted\u00ec,Mercoled\u00ec,Gioved\u00ec,Venerd\u00ec,Sabato".split(","),
        dayNamesShort: "Do,Lu,Ma,Me,Gi,Ve,Sa".split(","),
        dayNamesMin: "D,L,M,M,G,V,S".split(","),
        dayText: "Giorno",
        hourText: "Ore",
        minuteText: "Minuti",
        monthNames: "Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre".split(","),
        monthNamesShort: "Gen,Feb,Mar,Apr,Mag,Giu,Lug,Ago,Set,Ott,Nov,Dic".split(","),
        monthText: "Mese",
        secText: "Secondi",
        timeFormat: "HH:ii",
        yearText: "Anno",
        nowText: "Ora",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Data",
        timeText: "Volta",
        calendarText: "Calendario",
        closeText: "Chiudere",
        fromText: "Inizio",
        toText: "Fine",
        wholeText: "Intero",
        fractionText: "Frazione",
        unitText: "Unit\u00e0",
        labels: "Anni,Mesi,Giorni,Ore,Minuti,Secondi,".split(","),
        labelsShort: "Anni,Mesi,Gio,Ore,Min,Sec,".split(","),
        startText: "Inizio",
        stopText: "Arresto",
        resetText: "Ripristina",
        lapText: "Lap",
        hideText: "Nascondi",
        backText: "Indietro",
        undoText: "Annulla",
        offText: "Via",
        onText: "Su",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.no = {
        setText: "OK",
        cancelText: "Avbryt",
        clearText: "T\u00f8mme",
        selectedText: "{count} valgt",
        dateFormat: "dd.mm.yy",
        dayNames: "S\u00f8ndag,Mandag,Tirsdag,Onsdag,Torsdag,Fredag,L\u00f8rdag".split(","),
        dayNamesShort: "S\u00f8,Ma,Ti,On,To,Fr,L\u00f8".split(","),
        dayNamesMin: "S,M,T,O,T,F,L".split(","),
        dayText: "Dag",
        delimiter: ".",
        hourText: "Time",
        minuteText: "Minutt",
        monthNames: "Januar,Februar,Mars,April,Mai,Juni,Juli,August,September,Oktober,November,Desember".split(","),
        monthNamesShort: "Jan,Feb,Mar,Apr,Mai,Jun,Jul,Aug,Sep,Okt,Nov,Des".split(","),
        monthText: "M\u00e5ned",
        secText: "Sekund",
        timeFormat: "HH:ii",
        yearText: "\u00c5r",
        nowText: "N\u00e5",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Dato",
        timeText: "Tid",
        calendarText: "Kalender",
        closeText: "Lukk",
        fromText: "Start",
        toText: "End",
        wholeText: "Hele",
        fractionText: "Fraksjon",
        unitText: "Enhet",
        labels: "\u00c5r,M\u00e5neder,Dager,Timer,Minutter,Sekunder,".split(","),
        labelsShort: "\u00c5r,M\u00e5n,Dag,Time,Min,Sek,".split(","),
        startText: "Start",
        stopText: "Stopp",
        resetText: "Tilbakestille",
        lapText: "Runde",
        hideText: "Skjul",
        backText: "Tilbake",
        undoText: "Angre",
        offText: "Av",
        onText: "P\u00e5",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n["pt-BR"] = {
        setText: "Selecionar",
        cancelText: "Cancelar",
        clearText: "Claro",
        selectedText: "{count} selecionado",
        selectedPluralText: "{count} selecionados",
        dateFormat: "dd/mm/yy",
        dayNames: "Domingo,Segunda-feira,Ter\u00e7a-feira,Quarta-feira,Quinta-feira,Sexta-feira,S\u00e1bado".split(","),
        dayNamesShort: "Dom,Seg,Ter,Qua,Qui,Sex,S\u00e1b".split(","),
        dayNamesMin: "D,S,T,Q,Q,S,S".split(","),
        dayText: "Dia",
        hourText: "Hora",
        minuteText: "Minutos",
        monthNames: "Janeiro,Fevereiro,Mar\u00e7o,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro".split(","),
        monthNamesShort: "Jan,Fev,Mar,Abr,Mai,Jun,Jul,Ago,Set,Out,Nov,Dez".split(","),
        monthText: "M\u00eas",
        secText: "Segundo",
        timeFormat: "HH:ii",
        yearText: "Ano",
        nowText: "Agora",
        pmText: "da tarde",
        amText: "da manh\u00e3",
        dateText: "Data",
        timeText: "Tempo",
        calendarText: "Calend\u00e1rio",
        closeText: "Fechar",
        fromText: "In&iacute;cio",
        toText: "Fim",
        wholeText: "Inteiro",
        fractionText: "Fra\u00e7\u00e3o",
        unitText: "Unidade",
        labels: "Anos,Meses,Dias,Horas,Minutos,Segundos,".split(","),
        labelsShort: "Ano,M&ecirc;s,Dia,Hora,Min,Seg,".split(","),
        startText: "Come\u00e7ar",
        stopText: "Pare",
        resetText: "Reinicializar",
        lapText: "Lap",
        hideText: "Esconder",
        backText: "De volta",
        undoText: "Desfazer",
        offText: "Desl",
        onText: "Lig",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.zh = {
        setText: "\u786e\u5b9a",
        cancelText: "\u53d6\u6d88",
        clearText: "\u660e\u786e",
        selectedText: "{count} \u9009",
        dateFormat: "yy/mm/dd",
        dayNames: "\u5468\u65e5,\u5468\u4e00,\u5468\u4e8c,\u5468\u4e09,\u5468\u56db,\u5468\u4e94,\u5468\u516d".split(","),
        dayNamesShort: "\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),
        dayNamesMin: "\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),
        dayText: "\u65e5",
        hourText: "\u65f6",
        minuteText: "\u5206",
        monthNames: "1\u6708,2\u6708,3\u6708,4\u6708,5\u6708,6\u6708,7\u6708,8\u6708,9\u6708,10\u6708,11\u6708,12\u6708".split(","),
        monthNamesShort: "\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d,\u4e03,\u516b,\u4e5d,\u5341,\u5341\u4e00,\u5341\u4e8c".split(","),
        monthText: "\u6708",
        secText: "\u79d2",
        timeFormat: "HH:ii",
        yearText: "\u5e74",
        nowText: "\u5f53\u524d",
        pmText: "\u4e0b\u5348",
        amText: "\u4e0a\u5348",
        dateText: "\u65e5",
        timeText: "\u65f6\u95f4",
        calendarText: "\u65e5\u5386",
        closeText: "\u5173\u95ed",
        fromText: "\u5f00\u59cb\u65f6\u95f4",
        toText: "\u7ed3\u675f\u65f6\u95f4",
        wholeText: "\u5408\u8ba1",
        fractionText: "\u5206\u6570",
        unitText: "\u5355\u4f4d",
        labels: "\u5e74,\u6708,\u65e5,\u5c0f\u65f6,\u5206\u949f,\u79d2,".split(","),
        labelsShort: "\u5e74,\u6708,\u65e5,\u70b9,\u5206,\u79d2,".split(","),
        startText: "\u5f00\u59cb",
        stopText: "\u505c\u6b62",
        resetText: "\u91cd\u7f6e",
        lapText: "\u5708",
        hideText: "\u9690\u85cf",
        backText: "\u80cc\u90e8",
        undoText: "\u590d\u539f",
        offText: "\u5173\u95ed",
        onText: "\u5f00\u542f",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.nl = {
        setText: "Instellen",
        cancelText: "Annuleren",
        clearText: "Duidelijk",
        selectedText: "{count} gekozen",
        dateFormat: "dd-mm-yy",
        dayNames: "zondag,maandag,Dinsdag,Woensdag,Donderdag,Vrijdag,Zaterdag".split(","),
        dayNamesShort: "zo,ma,di,wo,do,vr,za".split(","),
        dayNamesMin: "z,m,d,w,d,v,z".split(","),
        dayText: "Dag",
        hourText: "Uur",
        minuteText: "Minuten",
        monthNames: "januari,februari,maart,april,mei,juni,juli,augustus,september,oktober,november,december".split(","),
        monthNamesShort: "jan,feb,mrt,apr,mei,jun,jul,aug,sep,okt,nov,dec".split(","),
        monthText: "Maand",
        secText: "Seconden",
        timeFormat: "HH:ii",
        yearText: "Jaar",
        nowText: "Nu",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Tijd",
        calendarText: "Kalender",
        closeText: "Sluiten",
        fromText: "Start",
        toText: "Einde",
        wholeText: "geheel",
        fractionText: "fractie",
        unitText: "eenheid",
        labels: "Jaren,Maanden,Dagen,Uren,Minuten,Seconden,".split(","),
        labelsShort: "j,m,d,u,min,sec,".split(","),
        startText: "Start",
        stopText: "Stop",
        resetText: "Reset",
        lapText: "Ronde",
        hideText: "Verbergen",
        backText: "Terug",
        undoText: "Onged. maken",
        offText: "Uit",
        onText: "Aan",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.tr = {
        setText: "Se\u00e7",
        cancelText: "\u0130ptal",
        clearText: "Temizleyin",
        selectedText: "{count} se\u00e7ilmi\u015f",
        dateFormat: "dd.mm.yy",
        dayNames: "Pazar,Pazartesi,Sal\u0131,\u00c7ar\u015famba,Per\u015fembe,Cuma,Cumartesi".split(","),
        dayNamesShort: "Paz,Pzt,Sal,\u00c7ar,Per,Cum,Cmt".split(","),
        dayNamesMin: "P,P,S,\u00c7,P,C,C".split(","),
        dayText: "G\u00fcn",
        delimiter: ".",
        hourText: "Saat",
        minuteText: "Dakika",
        monthNames: "Ocak,\u015eubat,Mart,Nisan,May\u0131s,Haziran,Temmuz,A\u011fustos,Eyl\u00fcl,Ekim,Kas\u0131m,Aral\u0131k".split(","),
        monthNamesShort: "Oca,\u015eub,Mar,Nis,May,Haz,Tem,A\u011fu,Eyl,Eki,Kas,Ara".split(","),
        monthText: "Ay",
        secText: "Saniye",
        timeFormat: "HH:ii",
        yearText: "Y\u0131l",
        nowText: "\u015eimdi",
        pmText: "ak\u015fam",
        amText: "sabah",
        firstDay: 1,
        dateText: "Tarih",
        timeText: "Zaman",
        calendarText: "Takvim",
        closeText: "Kapatmak",
        fromText: "Ba\u015fla",
        toText: "Son",
        wholeText: "Tam",
        fractionText: "Kesir",
        unitText: "Birim",
        labels: "Y\u0131l,Ay,G\u00fcn,Saat,Dakika,Saniye,".split(","),
        labelsShort: "Y\u0131l,Ay,G\u00fcn,Sa,Dak,Sn,".split(","),
        startText: "Ba\u015fla",
        stopText: "Durdur",
        resetText: "S\u0131f\u0131rla",
        lapText: "Tur",
        hideText: "Gizle",
        backText: "Geri",
        undoText: "Geri Al",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: "."
    };
    q.i18n.ja = {
        setText: "\u30bb\u30c3\u30c8",
        cancelText: "\u30ad\u30e3\u30f3\u30bb\u30eb",
        clearText: "\u30af\u30ea\u30a2",
        selectedText: "{count} \u9078\u629e",
        dateFormat: "yy\u5e74mm\u6708dd\u65e5",
        dayNames: "\u65e5,\u6708,\u706b,\u6c34,\u6728,\u91d1,\u571f".split(","),
        dayNamesShort: "\u65e5,\u6708,\u706b,\u6c34,\u6728,\u91d1,\u571f".split(","),
        dayNamesMin: "\u65e5,\u6708,\u706b,\u6c34,\u6728,\u91d1,\u571f".split(","),
        dayText: "\u65e5",
        hourText: "\u6642",
        minuteText: "\u5206",
        monthNames: "1\u6708,2\u6708,3\u6708,4\u6708,5\u6708,6\u6708,7\u6708,8\u6708,9\u6708,10\u6708,11\u6708,12\u6708".split(","),
        monthNamesShort: "1\u6708,2\u6708,3\u6708,4\u6708,5\u6708,6\u6708,7\u6708,8\u6708,9\u6708,10\u6708,11\u6708,12\u6708".split(","),
        monthText: "\u6708",
        secText: "\u79d2",
        timeFormat: "HH:ii",
        yearText: "\u5e74",
        nowText: "\u4eca",
        pmText: "\u5348\u5f8c",
        amText: "\u5348\u524d",
        yearSuffix: "\u5e74",
        monthSuffix: "\u6708",
        daySuffix: "\u65e5",
        dateText: "\u65e5\u4ed8",
        timeText: "\u6642\u9593",
        calendarText: "\u30ab\u30ec\u30f3\u30c0\u30fc",
        closeText: "\u30af\u30ed\u30fc\u30ba",
        fromText: "\u958b\u59cb",
        toText: "\u7d42\u308f\u308a",
        wholeText: "\u5168\u6570",
        fractionText: "\u5206\u6570",
        unitText: "\u5358\u4f4d",
        labels: "\u5e74\u9593,\u6708\u9593,\u65e5\u9593,\u6642\u9593,\u5206,\u79d2,".split(","),
        labelsShort: "\u5e74\u9593,\u6708\u9593,\u65e5\u9593,\u6642\u9593,\u5206,\u79d2,".split(","),
        startText: "\u958b\u59cb",
        stopText: "\u505c\u6b62",
        resetText: "\u30ea\u30bb\u30c3\u30c8",
        lapText: "\u30e9\u30c3\u30d7",
        hideText: "\u96a0\u3059",
        backText: "\u30d0\u30c3\u30af",
        undoText: "\u30a2\u30f3\u30c9\u30a5"
    };
    q.i18n["pt-PT"] = {
        setText: "Seleccionar",
        cancelText: "Cancelar",
        clearText: "Claro",
        selectedText: "{count} selecionado",
        selectedPluralText: "{count} selecionados",
        dateFormat: "dd-mm-yy",
        dayNames: "Domingo,Segunda-feira,Ter\u00e7a-feira,Quarta-feira,Quinta-feira,Sexta-feira,S&aacute;bado".split(","),
        dayNamesShort: "Dom,Seg,Ter,Qua,Qui,Sex,S&aacute;b".split(","),
        dayNamesMin: "D,S,T,Q,Q,S,S".split(","),
        dayText: "Dia",
        hourText: "Horas",
        minuteText: "Minutos",
        monthNames: "Janeiro,Fevereiro,Mar&ccedil;o,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro".split(","),
        monthNamesShort: "Jan,Fev,Mar,Abr,Mai,Jun,Jul,Ago,Set,Out,Nov,Dez".split(","),
        monthText: "M&ecirc;s",
        secText: "Segundo",
        timeFormat: "HH:ii",
        yearText: "Ano",
        nowText: "Actualizar",
        pmText: "da tarde",
        amText: "da manh\u00e3",
        firstDay: 1,
        dateText: "Data",
        timeText: "Tempo",
        calendarText: "Calend&aacute;rio",
        closeText: "Fechar",
        fromText: "In&iacute;cio",
        toText: "Fim",
        wholeText: "Inteiro",
        fractionText: "Frac&ccedil;&atilde;o",
        unitText: "Unidade",
        labels: "Anos,Meses,Dias,Horas,Minutos,Segundos,".split(","),
        labelsShort: "Ano,M&ecirc;s,Dia,Hora,Min,Seg,".split(","),
        startText: "Come&ccedil;ar",
        stopText: "Parar",
        resetText: "Reinicializar",
        lapText: "Lap",
        hideText: "Esconder",
        backText: "De volta",
        undoText: "Anular",
        offText: "Desl",
        onText: "Lig",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.sv = {
        setText: "OK",
        cancelText: "Avbryt",
        clearText: "Klara",
        selectedText: "{count} vald",
        dateFormat: "yy-mm-dd",
        dayNames: "S\u00f6ndag,M\u00e5ndag,Tisdag,Onsdag,Torsdag,Fredag,L\u00f6rdag".split(","),
        dayNamesShort: "S\u00f6,M\u00e5,Ti,On,To,Fr,L\u00f6".split(","),
        dayNamesMin: "S,M,T,O,T,F,L".split(","),
        dayText: "Dag",
        hourText: "Timme",
        minuteText: "Minut",
        monthNames: "Januari,Februari,Mars,April,Maj,Juni,Juli,Augusti,September,Oktober,November,December".split(","),
        monthNamesShort: "Jan,Feb,Mar,Apr,Maj,Jun,Jul,Aug,Sep,Okt,Nov,Dec".split(","),
        monthText: "M\u00e5nad",
        secText: "Sekund",
        timeFormat: "HH:ii",
        yearText: "\u00c5r",
        nowText: "Nu",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Tid",
        calendarText: "Kalender",
        closeText: "St\u00e4ng",
        fromText: "Start",
        toText: "Slut",
        wholeText: "Hela",
        fractionText: "Br\u00e5k",
        unitText: "Enhet",
        labels: "\u00c5r,M\u00e5nader,Dagar,Timmar,Minuter,Sekunder,".split(","),
        labelsShort: "\u00c5r,M\u00e5n,Dag,Tim,Min,Sek,".split(","),
        startText: "Start",
        stopText: "Stopp",
        resetText: "\u00c5terst\u00e4ll",
        lapText: "Varv",
        hideText: "D\u00f6lj",
        backText: "Tillbaka",
        undoText: "\u00c5ngra",
        offText: "Av",
        onText: "P\u00e5"
    };
    q.i18n["en-GB"] = q.i18n["en-UK"] = {
        dateFormat: "dd/mm/yy",
        timeFormat: "HH:ii"
    };
    q.i18n.cs = {
        setText: "Zadej",
        cancelText: "Storno",
        clearText: "Vymazat",
        selectedText: "Ozna\u010den\u00fd: {count}",
        dateFormat: "dd.mm.yy",
        dayNames: "Ned\u011ble,Pond\u011bl\u00ed,\u00dater\u00fd,St\u0159eda,\u010ctvrtek,P\u00e1tek,Sobota".split(","),
        dayNamesShort: "Ne,Po,\u00dat,St,\u010ct,P\u00e1,So".split(","),
        dayNamesMin: "N,P,\u00da,S,\u010c,P,S".split(","),
        dayText: "Den",
        hourText: "Hodiny",
        minuteText: "Minuty",
        monthNames: "Leden,\u00danor,B\u0159ezen,Duben,Kv\u011bten,\u010cerven,\u010cervenec,Srpen,Z\u00e1\u0159\u00ed,\u0158\u00edjen,Listopad,Prosinec".split(","),
        monthNamesShort: "Led,\u00dano,B\u0159e,Dub,Kv\u011b,\u010cer,\u010cvc,Spr,Z\u00e1\u0159,\u0158\u00edj,Lis,Pro".split(","),
        monthText: "M\u011bs\u00edc",
        secText: "Sekundy",
        timeFormat: "HH:ii",
        yearText: "Rok",
        nowText: "Te\u010f",
        amText: "am",
        pmText: "pm",
        firstDay: 1,
        dateText: "Datum",
        timeText: "\u010cas",
        calendarText: "Kalend\u00e1\u0159",
        closeText: "Zav\u0159\u00edt",
        fromText: "Za\u010d\u00e1tek",
        toText: "Konec",
        wholeText: "Cel\u00fd",
        fractionText: "\u010c\u00e1st",
        unitText: "Jednotka",
        labels: "Roky,M\u011bs\u00edce,Dny,Hodiny,Minuty,Sekundy,".split(","),
        labelsShort: "Rok,M\u011bs,Dny,Hod,Min,Sec,".split(","),
        startText: "Start",
        stopText: "Stop",
        resetText: "Resetovat",
        lapText: "Etapa",
        hideText: "Schovat",
        backText: "Zp\u011bt",
        undoText: "Rozlepit",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.sk = {
        setText: "Zadaj",
        cancelText: "Zru\u0161i\u0165",
        clearText: "Vymaza\u0165",
        selectedText: "Ozna\u010den\u00fd: {count}",
        dateFormat: "d.m.yy",
        dayNames: "Nede\u013ea,Pondelok,Utorok,Streda,\u0160tvrtok,Piatok,Sobota".split(","),
        dayNamesShort: "Ne,Po,Ut,St,\u0160t,Pi,So".split(","),
        dayNamesMin: "N,P,U,S,\u0160,P,S".split(","),
        dayText: "\u010ee\u0148",
        hourText: "Hodiny",
        minuteText: "Min\u00faty",
        monthNames: "Janu\u00e1r,Febru\u00e1r,Marec,Apr\u00edl,M\u00e1j,J\u00fan,J\u00fal,August,September,Okt\u00f3ber,November,December".split(","),
        monthNamesShort: "Jan,Feb,Mar,Apr,M\u00e1j,J\u00fan,J\u00fal,Aug,Sep,Okt,Nov,Dec".split(","),
        monthText: "Mesiac",
        secText: "Sekundy",
        timeFormat: "H:ii",
        yearText: "Rok",
        nowText: "Teraz",
        amText: "am",
        pmText: "pm",
        firstDay: 1,
        dateText: "Datum",
        timeText: "\u010cas",
        calendarText: "Kalend\u00e1r",
        closeText: "Zavrie\u0165",
        fromText: "Za\u010diatok",
        toText: "Koniec",
        wholeText: "Cel\u00fd",
        fractionText: "\u010cas\u0165",
        unitText: "Jednotka",
        labels: "Roky,Mesiace,Dni,Hodiny,Min\u00faty,Sekundy,".split(","),
        labelsShort: "Rok,Mes,Dni,Hod,Min,Sec,".split(","),
        startText: "Start",
        stopText: "Stop",
        resetText: "Resetova\u0165",
        lapText: "Etapa",
        hideText: "Schova\u0165",
        backText: "Sp\u00e4\u0165",
        undoText: "Sp\u00e4\u0165",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.ro = {
        setText: "Setare",
        cancelText: "Anulare",
        clearText: "\u015etergere",
        selectedText: "{count} selectat",
        selectedPluralText: "{count} selectate",
        dateFormat: "dd.mm.yy",
        dayNames: "Duminic\u0103,Luni,Mar\u021bi,Miercuri,Joi,Vineri,S\u00e2mb\u0103t\u0103".split(","),
        dayNamesShort: "Du,Lu,Ma,Mi,Jo,Vi,S\u00e2".split(","),
        dayNamesMin: "D,L,M,M,J,V,S".split(","),
        dayText: " Ziua",
        delimiter: ".",
        hourText: " Ore ",
        minuteText: "Minute",
        monthNames: "Ianuarie,Februarie,Martie,Aprilie,Mai,Iunie,Iulie,August,Septembrie,Octombrie,Noiembrie,Decembrie".split(","),
        monthNamesShort: "Ian.,Feb.,Mar.,Apr.,Mai,Iun.,Iul.,Aug.,Sept.,Oct.,Nov.,Dec.".split(","),
        monthText: "Luna",
        secText: "Secunde",
        timeFormat: "HH:ii",
        yearText: "Anul",
        nowText: "Acum",
        amText: "am",
        pmText: "pm",
        firstDay: 1,
        dateText: "Data",
        timeText: "Ora",
        calendarText: "Calendar",
        closeText: "\u00cenchidere",
        fromText: "Start",
        toText: "Final",
        wholeText: "Complet",
        fractionText: "Par\u0163ial",
        unitText: "Unitate",
        labels: "Ani,Luni,Zile,Ore,Minute,Secunde,".split(","),
        labelsShort: "Ani,Luni,Zile,Ore,Min.,Sec.,".split(","),
        startText: "Start",
        stopText: "Stop",
        resetText: "Resetare",
        lapText: "Tur\u0103",
        hideText: "Ascundere",
        backText: "\u00cenapoi",
        undoText: "Anula\u0163i",
        offText: "Nu",
        onText: "Da",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.pl = {
        setText: "Zestaw",
        cancelText: "Anuluj",
        clearText: "Oczy\u015bci\u0107",
        selectedText: "Wyb\u00f3r: {count}",
        dateFormat: "yy-mm-dd",
        dayNames: "Niedziela,Poniedzia\u0142ek,Wtorek,\u015aroda,Czwartek,Pi\u0105tek,Sobota".split(","),
        dayNamesShort: "Niedz.,Pon.,Wt.,\u015ar.,Czw.,Pt.,Sob.".split(","),
        dayNamesMin: "N,P,W,\u015a,C,P,S".split(","),
        dayText: "Dzie\u0144",
        hourText: "Godziny",
        minuteText: "Minuty",
        monthNames: "Stycze\u0144,Luty,Marzec,Kwiecie\u0144,Maj,Czerwiec,Lipiec,Sierpie\u0144,Wrzesie\u0144,Pa\u017adziernik,Listopad,Grudzie\u0144".split(","),
        monthNamesShort: "Sty,Lut,Mar,Kwi,Maj,Cze,Lip,Sie,Wrz,Pa\u017a,Lis,Gru".split(","),
        monthText: "Miesi\u0105c",
        secText: "Sekundy",
        timeFormat: "HH:ii",
        yearText: "Rok",
        nowText: "Teraz",
        amText: "rano",
        pmText: "po po\u0142udniu",
        firstDay: 1,
        dateText: "Data",
        timeText: "Czas",
        calendarText: "Kalendarz",
        closeText: "Zako\u0144czenie",
        fromText: "Rozpocz\u0119cie",
        toText: "Koniec",
        wholeText: "Ca\u0142y",
        fractionText: "U\u0142amek",
        unitText: "Jednostka",
        labels: "Lata,Miesi\u0105c,Dni,Godziny,Minuty,Sekundy,".split(","),
        labelsShort: "R,M,Dz,Godz,Min,Sek,".split(","),
        startText: "Rozpocz\u0119cie",
        stopText: "Zatrzyma\u0107",
        resetText: "Zresetowa\u0107",
        lapText: "Zak\u0142adka",
        hideText: "Ukry\u0107",
        backText: "Z powrotem",
        undoText: "Cofnij",
        offText: "Wy\u0142",
        onText: "W\u0142",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n["ru-UA"] = {
        setText: "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c",
        cancelText: "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c",
        clearText: "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044cr",
        selectedText: "{count} \u0412\u0456\u0431\u0440\u0430\u0442\u044c",
        dateFormat: "dd.mm.yy",
        dayNames: "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435,\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a,\u0432\u0442\u043e\u0440\u043d\u0438\u043a,\u0441\u0440\u0435\u0434\u0430,\u0447\u0435\u0442\u0432\u0435\u0440\u0433,\u043f\u044f\u0442\u043d\u0438\u0446\u0430,\u0441\u0443\u0431\u0431\u043e\u0442\u0430".split(","),
        dayNamesShort: "\u0432\u0441,\u043f\u043d,\u0432\u0442,\u0441\u0440,\u0447\u0442,\u043f\u0442,\u0441\u0431".split(","),
        dayNamesMin: "\u0432,\u043f,\u0432,\u0441,\u0447,\u043f,\u0441".split(","),
        dayText: "\u0414\u0435\u043d\u044c",
        delimiter: ".",
        hourText: "\u0427\u0430\u0441\u044b",
        minuteText: "\u041c\u0438\u043d\u0443\u0442\u044b",
        monthNames: "\u042f\u043d\u0432\u0430\u0440\u044c,\u0424\u0435\u0432\u0440\u0430\u043b\u044c,\u041c\u0430\u0440\u0442,\u0410\u043f\u0440\u0435\u043b\u044c,\u041c\u0430\u0439,\u0418\u044e\u043d\u044c,\u0418\u044e\u043b\u044c,\u0410\u0432\u0433\u0443\u0441\u0442,\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c,\u041e\u043a\u0442\u044f\u0431\u0440\u044c,\u041d\u043e\u044f\u0431\u0440\u044c,\u0414\u0435\u043a\u0430\u0431\u0440\u044c".split(","),
        monthNamesShort: "\u042f\u043d\u0432.,\u0424\u0435\u0432\u0440.,\u041c\u0430\u0440\u0442,\u0410\u043f\u0440.,\u041c\u0430\u0439,\u0418\u044e\u043d\u044c,\u0418\u044e\u043b\u044c,\u0410\u0432\u0433.,\u0421\u0435\u043d\u0442.,\u041e\u043a\u0442.,\u041d\u043e\u044f\u0431.,\u0414\u0435\u043a.".split(","),
        monthText: "\u041c\u0435\u0441\u044f\u0446\u044b",
        secText: "\u0421\u0438\u043a\u0443\u043d\u0434\u044b",
        timeFormat: "HH:ii",
        yearText: "\u0413\u043e\u0434",
        nowText: "\u0421\u0435\u0439\u0447\u0430\u0441",
        amText: "\u0414\u043e \u043f\u043e\u043b\u0443\u0434\u043d\u044f",
        pmText: "\u041f\u043e\u0441\u043b\u0435 \u043f\u043e\u043b\u0443\u0434\u043d\u044f",
        firstDay: 1,
        dateText: "\u0414\u0430\u0442\u0430",
        timeText: "\u0412\u0440\u0435\u043c\u044f",
        calendarText: "\u041a\u0430\u043b\u0435\u043d\u0434\u0430\u0440\u044c",
        closeText: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c",
        fromText: "\u041d\u0430\u0447\u0430\u043b\u043e",
        toText: "\u041a\u043e\u043d\u0435\u0446",
        wholeText: "\u0412\u0435\u0441\u044c",
        fractionText: "\u0427\u0430\u0441\u0442\u044c",
        unitText: "\u0415\u0434\u0438\u043d\u0438\u0446\u0430",
        labels: "\u0413\u043e\u0434\u044b, \u041c\u0435\u0441\u044f\u0446\u044b , \u0414\u043d\u0438 , \u0427\u0430\u0441\u044b , \u041c\u0438\u043d\u0443\u0442\u044b , \u0421\u0435\u043a\u0443\u043d\u0434\u044b,".split(","),
        labelsShort: "\u0413\u043e\u0434,\u041c\u0435\u0441.,\u0414\u043d.,\u0427.,\u041c\u0438\u043d.,\u0421\u0435\u043a.,".split(","),
        startText: "\u0421\u0442\u0430\u0440\u0442",
        stopText: "\u0421\u0442\u043e\u043f",
        resetText: " \u0421\u0431\u0440\u043e\u0441 ",
        lapText: " \u042d\u0442\u0430\u043f ",
        hideText: " \u0421\u043a\u0440\u044b\u0442\u044c ",
        backText: "\u043d\u0430\u0437\u0430\u0434",
        undoText: "\u0430\u043d\u043d\u0443\u043b\u0438\u0440\u043e\u0432\u0430\u0442\u044c",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    (function() {
        var j = {
            gDaysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            jDaysInMonth: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
            jalaliToGregorian: function(c, b, e) {
                for (var c = parseInt(c), b = parseInt(b), e = parseInt(e), c = c - 979, b = b - 1, a = e - 1, c = 365 * c + 8 * parseInt(c / 33) + parseInt((c %
                        33 + 3) / 4), e = 0; e < b; ++e) c += j.jDaysInMonth[e];
                b = c + a + 79;
                c = 1600 + 400 * parseInt(b / 146097);
                b %= 146097;
                a = !0;
                36525 <= b && (b--, c += 100 * parseInt(b / 36524), b %= 36524, 365 <= b ? b++ : a = !1);
                c += 4 * parseInt(b / 1461);
                b %= 1461;
                366 <= b && (a = !1, b--, c += parseInt(b / 365), b %= 365);
                for (e = 0; b >= j.gDaysInMonth[e] + (1 == e && a); e++) b -= j.gDaysInMonth[e] + (1 == e && a);
                return [c, e + 1, b + 1]
            },
            checkDate: function(c, b, e) {
                return !(0 > c || 32767 < c || 1 > b || 12 < b || 1 > e || e > j.jDaysInMonth[b - 1] + (12 == b && 0 === (c - 979) % 33 % 4))
            },
            gregorianToJalali: function(c, b, e) {
                for (var c = parseInt(c), b =
                        parseInt(b), e = parseInt(e), c = c - 1600, b = b - 1, a = e - 1, d = 365 * c + parseInt((c + 3) / 4) - parseInt((c + 99) / 100) + parseInt((c + 399) / 400), e = 0; e < b; ++e) d += j.gDaysInMonth[e];
                1 < b && (0 === c % 4 && 0 !== c % 100 || 0 === c % 400) && ++d;
                c = d + a - 79;
                e = parseInt(c / 12053);
                c %= 12053;
                b = 979 + 33 * e + 4 * parseInt(c / 1461);
                c %= 1461;
                366 <= c && (b += parseInt((c - 1) / 365), c = (c - 1) % 365);
                for (e = 0; 11 > e && c >= j.jDaysInMonth[e]; ++e) c -= j.jDaysInMonth[e];
                return [b, e + 1, c + 1]
            }
        };
        q.i18n.fa = {
            setText: "\u062a\u0627\u064a\u064a\u062f",
            cancelText: "\u0627\u0646\u0635\u0631\u0627\u0641",
            clearText: "\u0648\u0627\u0636\u062d ",
            selectedText: "{count} \u0645\u0646\u062a\u062e\u0628",
            dateFormat: "yy/mm/dd",
            dayNames: "\u064a\u06a9\u0634\u0646\u0628\u0647,\u062f\u0648\u0634\u0646\u0628\u0647,\u0633\u0647\u200c\u0634\u0646\u0628\u0647,\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647,\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647,\u062c\u0645\u0639\u0647,\u0634\u0646\u0628\u0647".split(","),
            dayNamesShort: "\u06cc,\u062f,\u0633,\u0686,\u067e,\u062c,\u0634".split(","),
            dayNamesMin: "\u06cc,\u062f,\u0633,\u0686,\u067e,\u062c,\u0634".split(","),
            dayText: "\u0631\u0648\u0632",
            hourText: "\u0633\u0627\u0639\u062a",
            minuteText: "\u062f\u0642\u064a\u0642\u0647",
            monthNames: "\u0641\u0631\u0648\u0631\u062f\u064a\u0646,\u0627\u0631\u062f\u064a\u0628\u0647\u0634\u062a,\u062e\u0631\u062f\u0627\u062f,\u062a\u064a\u0631,\u0645\u0631\u062f\u0627\u062f,\u0634\u0647\u0631\u064a\u0648\u0631,\u0645\u0647\u0631,\u0622\u0628\u0627\u0646,\u0622\u0630\u0631,\u062f\u06cc,\u0628\u0647\u0645\u0646,\u0627\u0633\u0641\u0646\u062f".split(","),
            monthNamesShort: "\u0641\u0631\u0648\u0631\u062f\u064a\u0646,\u0627\u0631\u062f\u064a\u0628\u0647\u0634\u062a,\u062e\u0631\u062f\u0627\u062f,\u062a\u064a\u0631,\u0645\u0631\u062f\u0627\u062f,\u0634\u0647\u0631\u064a\u0648\u0631,\u0645\u0647\u0631,\u0622\u0628\u0627\u0646,\u0622\u0630\u0631,\u062f\u06cc,\u0628\u0647\u0645\u0646,\u0627\u0633\u0641\u0646\u062f".split(","),
            monthText: "\u0645\u0627\u0647",
            secText: "\u062b\u0627\u0646\u064a\u0647",
            timeFormat: "HH:ii",
            yearText: "\u0633\u0627\u0644",
            nowText: "\u0627\u06a9\u0646\u0648\u0646",
            amText: "\u0628",
            pmText: "\u0635",
            getYear: function(c) {
                return j.gregorianToJalali(c.getFullYear(), c.getMonth() + 1, c.getDate())[0]
            },
            getMonth: function(c) {
                return --j.gregorianToJalali(c.getFullYear(), c.getMonth() + 1, c.getDate())[1]
            },
            getDay: function(c) {
                return j.gregorianToJalali(c.getFullYear(), c.getMonth() + 1, c.getDate())[2]
            },
            getDate: function(c, b,
                e, a, d, h, i) {
                0 > b && (c += Math.floor(b / 12), b = 12 + b % 12);
                11 < b && (c += Math.floor(b / 12), b %= 12);
                c = j.jalaliToGregorian(c, +b + 1, e);
                return new Date(c[0], c[1] - 1, c[2], a || 0, d || 0, h || 0, i || 0)
            },
            getMaxDayOfMonth: function(c, b) {
                for (var e = 31; !1 === j.checkDate(c, b + 1, e);) e--;
                return e
            },
            firstDay: 6,
            rtl: !0,
            dateText: "\u062a\u0627\u0631\u06cc\u062e ",
            timeText: "\u0632\u0645\u0627\u0646 ",
            calendarText: "\u062a\u0642\u0648\u06cc\u0645",
            closeText: "\u0646\u0632\u062f\u06cc\u06a9",
            fromText: "\u0634\u0631\u0648\u0639 ",
            toText: "\u067e\u0627\u06cc\u0627\u0646",
            wholeText: "\u062a\u0645\u0627\u0645",
            fractionText: "\u06a9\u0633\u0631",
            unitText: "\u0648\u0627\u062d\u062f",
            labels: "\u0633\u0627\u0644,\u0645\u0627\u0647,\u0631\u0648\u0632,\u0633\u0627\u0639\u062a,\u062f\u0642\u06cc\u0642\u0647,\u062b\u0627\u0646\u06cc\u0647,".split(","),
            labelsShort: "\u0633\u0627\u0644,\u0645\u0627\u0647,\u0631\u0648\u0632,\u0633\u0627\u0639\u062a,\u062f\u0642\u06cc\u0642\u0647,\u062b\u0627\u0646\u06cc\u0647,".split(","),
            startText: "\u0634\u0631\u0648\u0639",
            stopText: "\u067e\u0627\u064a\u0627\u0646",
            resetText: "\u062a\u0646\u0638\u06cc\u0645 \u0645\u062c\u062f\u062f",
            lapText: "Lap",
            hideText: "\u067e\u0646\u0647\u0627\u0646 \u06a9\u0631\u062f\u0646",
            backText: "\u067e\u0634\u062a",
            undoText: "\u0648\u0627\u0686\u06cc\u062f\u0646"
        }
    })();
    q.i18n["ru-RU"] = q.i18n.ru = {
        setText: "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c",
        cancelText: "\u041e\u0442\u043c\u0435\u043d\u0430",
        clearText: "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c",
        selectedText: "{count} \u0412\u044b\u0431\u0440\u0430\u0442\u044c",
        dateFormat: "dd.mm.yy",
        dayNames: "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435,\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a,\u0432\u0442\u043e\u0440\u043d\u0438\u043a,\u0441\u0440\u0435\u0434\u0430,\u0447\u0435\u0442\u0432\u0435\u0440\u0433,\u043f\u044f\u0442\u043d\u0438\u0446\u0430,\u0441\u0443\u0431\u0431\u043e\u0442\u0430".split(","),
        dayNamesShort: "\u0432\u0441,\u043f\u043d,\u0432\u0442,\u0441\u0440,\u0447\u0442,\u043f\u0442,\u0441\u0431".split(","),
        dayNamesMin: "\u0432,\u043f,\u0432,\u0441,\u0447,\u043f,\u0441".split(","),
        dayText: "\u0414\u0435\u043d\u044c",
        delimiter: ".",
        hourText: "\u0427\u0430\u0441",
        minuteText: "\u041c\u0438\u043d\u0443\u0442",
        monthNames: "\u042f\u043d\u0432\u0430\u0440\u044c,\u0424\u0435\u0432\u0440\u0430\u043b\u044c,\u041c\u0430\u0440\u0442,\u0410\u043f\u0440\u0435\u043b\u044c,\u041c\u0430\u0439,\u0418\u044e\u043d\u044c,\u0418\u044e\u043b\u044c,\u0410\u0432\u0433\u0443\u0441\u0442,\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c,\u041e\u043a\u0442\u044f\u0431\u0440\u044c,\u041d\u043e\u044f\u0431\u0440\u044c,\u0414\u0435\u043a\u0430\u0431\u0440\u044c".split(","),
        monthNamesShort: "\u042f\u043d\u0432,\u0424\u0435\u0432,\u041c\u0430\u0440,\u0410\u043f\u0440,\u041c\u0430\u0439,\u0418\u044e\u043d,\u0418\u044e\u043b,\u0410\u0432\u0433,\u0421\u0435\u043d,\u041e\u043a\u0442,\u041d\u043e\u044f,\u0414\u0435\u043a".split(","),
        monthText: "\u041c\u0435\u0441\u044f\u0446",
        secText: "\u0421\u0435\u043a\u0443\u043d\u0434",
        timeFormat: "HH:ii",
        yearText: "\u0413\u043e\u0434",
        nowText: "\u0421\u0435\u0439\u0447\u0430\u0441",
        amText: "\u0414\u043e \u043f\u043e\u043b\u0443\u0434\u043d\u044f",
        pmText: "\u041f\u043e\u0441\u043b\u0435 \u043f\u043e\u043b\u0443\u0434\u043d\u044f",
        firstDay: 1,
        dateText: "\u0414\u0430\u0442\u0430",
        timeText: "\u0412\u0440\u0435\u043c\u044f",
        calendarText: "\u041a\u0430\u043b\u0435\u043d\u0434\u0430\u0440\u044c",
        closeText: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c",
        fromText: "\u041d\u0430\u0447\u0430\u043b\u043e",
        toText: "\u041a\u043e\u043d\u0435\u0446",
        wholeText: "\u0426\u0435\u043b\u043e\u0435",
        fractionText: "\u0414\u0440\u043e\u0431\u043d\u043e\u0435",
        unitText: "\u0415\u0434\u0438\u043d\u0438\u0446\u0430",
        labels: "\u041b\u0435\u0442,\u041c\u0435\u0441\u044f\u0446\u0435\u0432,\u0414\u043d\u0435\u0439,\u0427\u0430\u0441\u043e\u0432,\u041c\u0438\u043d\u0443\u0442,\u0421\u0435\u043a\u0443\u043d\u0434,".split(","),
        labelsShort: "\u041b\u0435\u0442,\u041c\u0435\u0441,\u0414\u043d,\u0427\u0430\u0441,\u041c\u0438\u043d,\u0421\u0435\u043a,".split(","),
        startText: "\u0421\u0442\u0430\u0440\u0442",
        stopText: "\u0421\u0442\u043e\u043f",
        resetText: "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c",
        lapText: "\u041a\u0440\u0443\u0433",
        hideText: "\u0421\u043a\u0440\u044b\u0442\u044c",
        backText: "\u043d\u0430\u0437\u0430\u0434",
        undoText: "\u0430\u043d\u043d\u0443\u043b\u0438\u0440\u043e\u0432\u0430\u0442\u044c",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.lt = {
        setText: "OK",
        cancelText: "At\u0161aukti",
        clearText: "I\u0161valyti",
        selectedText: "Pasirinktas {count}",
        selectedPluralText: "Pasirinkti {count}",
        dateFormat: "yy-mm-dd",
        dayNames: "Sekmadienis,Pirmadienis,Antradienis,Tre\u010diadienis,Ketvirtadienis,Penktadienis,\u0160e\u0161tadienis".split(","),
        dayNamesShort: "S,Pr,A,T,K,Pn,\u0160".split(","),
        dayNamesMin: "S,Pr,A,T,K,Pn,\u0160".split(","),
        dayText: "Diena",
        hourText: "Valanda",
        minuteText: "Minutes",
        monthNames: "Sausis,Vasaris,Kovas,Balandis,Gegu\u017e\u0117,Bir\u017eelis,Liepa,Rugpj\u016btis,Rugs\u0117jis,Spalis,Lapkritis,Gruodis".split(","),
        monthNamesShort: "Sau,Vas,Kov,Bal,Geg,Bir,Lie,Rugp,Rugs,Spa,Lap,Gruo".split(","),
        monthText: "M\u0117nuo",
        secText: "Sekundes",
        amText: "am",
        pmText: "pm",
        timeFormat: "HH:ii",
        yearText: "Metai",
        nowText: "Dabar",
        firstDay: 1,
        dateText: "Data",
        timeText: "Laikas",
        calendarText: "Kalendorius",
        closeText: "U\u017edaryti",
        fromText: "Nuo",
        toText: "Iki",
        wholeText: "Visas",
        fractionText: "Frakcija",
        unitText: "Vienetas",
        labels: "Metai,M\u0117nesiai,Dienos,Valandos,Minutes,Sekundes,".split(","),
        labelsShort: "m,m\u0117n.,d,h,min,s,".split(","),
        startText: "Prad\u0117ti",
        stopText: "Sustabdyti",
        resetText: "I\u0161naujo",
        lapText: "Ratas",
        hideText: "Sl\u0117pti",
        backText: "Atgal",
        undoText: "At\u0161aukti veiksm\u0105",
        offText: "I\u0161j.",
        onText: "\u012ej.",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    q.i18n.ca = {
        setText: "Acceptar",
        cancelText: "Cancel\u00b7lar",
        clearText: "Esborrar",
        selectedText: "{count} seleccionat",
        selectedPluralText: "{count} seleccionats",
        dateFormat: "dd/mm/yy",
        dayNames: "Diumenge,Dilluns,Dimarts,Dimecres,Dijous,Divendres,Dissabte".split(","),
        dayNamesShort: "Dg,Dl,Dt,Dc,Dj,Dv,Ds".split(","),
        dayNamesMin: "Dg,Dl,Dt,Dc,Dj,Dv,Ds".split(","),
        dayText: "Dia",
        hourText: "Hores",
        minuteText: "Minuts",
        monthNames: "Gener,Febrer,Mar&ccedil;,Abril,Maig,Juny,Juliol,Agost,Setembre,Octubre,Novembre,Desembre".split(","),
        monthNamesShort: "Gen,Feb,Mar,Abr,Mai,Jun,Jul,Ago,Set,Oct,Nov,Des".split(","),
        monthText: "Mes",
        secText: "Segons",
        timeFormat: "HH:ii",
        yearText: "Any",
        nowText: "Ara",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Data",
        timeText: "Temps",
        calendarText: "Calendari",
        closeText: "Tancar",
        fromText: "Iniciar",
        toText: "Final",
        wholeText: "Sencer",
        fractionText: "Fracci\u00f3",
        unitText: "Unitat",
        labels: "Anys,Mesos,Dies,Hores,Minuts,Segons,".split(","),
        labelsShort: "Anys,Mesos,Dies,Hrs,Mins,Secs,".split(","),
        startText: "Iniciar",
        stopText: "Aturar",
        resetText: "Reiniciar",
        lapText: "Volta",
        hideText: "Amagar",
        backText: "Tornar",
        undoText: "Desfer",
        offText: "No",
        onText: "Si"
    };
    q.i18n.da = {
        setText: "S\u00e6t",
        cancelText: "Annuller",
        clearText: "Ryd",
        selectedText: "{count} valgt",
        selectedPluralText: "{count} valgt",
        dateFormat: "dd/mm/yy",
        dayNames: "S\u00f8ndag,Mandag,Tirsdag,Onsdag,Torsdag,Fredag,L\u00f8rdag".split(","),
        dayNamesShort: "S\u00f8n,Man,Tir,Ons,Tor,Fre,L\u00f8r".split(","),
        dayNamesMin: "S,M,T,O,T,F,L".split(","),
        dayText: "Dag",
        hourText: "Timer",
        minuteText: "Minutter",
        monthNames: "Januar,Februar,Marts,April,Maj,Juni,Juli,August,September,Oktober,November,December".split(","),
        monthNamesShort: "Jan,Feb,Mar,Apr,Maj,Jun,Jul,Aug,Sep,Okt,Nov,Dec".split(","),
        monthText: "M\u00e5ned",
        secText: "Sekunder",
        amText: "am",
        pmText: "pm",
        timeFormat: "HH.ii",
        yearText: "\u00c5r",
        nowText: "Nu",
        firstDay: 1,
        dateText: "Dato",
        timeText: "Tid",
        calendarText: "Kalender",
        closeText: "Luk",
        fromText: "Start",
        toText: "Slut",
        wholeText: "Hele",
        fractionText: "Dele",
        unitText: "Enhed",
        labels: "\u00c5r,M\u00e5neder,Dage,Timer,Minutter,Sekunder,".split(","),
        labelsShort: "\u00c5r,Mdr,Dg,Timer,Min,Sek,".split(","),
        startText: "Start",
        stopText: "Stop",
        resetText: "Nulstil",
        lapText: "Omgang",
        hideText: "Skjul",
        offText: "Fra",
        onText: "Til",
        backText: "Tilbage",
        undoText: "Fortryd"
    };
    q.i18n.he = {
        rtl: !0,
        setText: "\u05e9\u05de\u05d9\u05e8\u05d4",
        cancelText: "\u05d1\u05d9\u05d8\u05d5\u05dc",
        clearText: "\u05e0\u05e7\u05d4",
        selectedText: "{count} \u05e0\u05d1\u05d7\u05e8",
        selectedPluralText: "{count} \u05e0\u05d1\u05d7\u05e8\u05d5",
        dateFormat: "dd/mm/yy",
        dayNames: "\u05e8\u05d0\u05e9\u05d5\u05df,\u05e9\u05e0\u05d9,\u05e9\u05dc\u05d9\u05e9\u05d9,\u05e8\u05d1\u05d9\u05e2\u05d9,\u05d7\u05de\u05d9\u05e9\u05d9,\u05e9\u05d9\u05e9\u05d9,\u05e9\u05d1\u05ea".split(","),
        dayNamesShort: "\u05d0',\u05d1',\u05d2',\u05d3',\u05d4',\u05d5',\u05e9'".split(","),
        dayNamesMin: "\u05d0,\u05d1,\u05d2,\u05d3,\u05d4,\u05d5,\u05e9".split(","),
        dayText: "\u05d9\u05d5\u05dd",
        hourText: "\u05e9\u05e2\u05d5\u05ea",
        minuteText: "\u05d3\u05e7\u05d5\u05ea",
        monthNames: "\u05d9\u05e0\u05d5\u05d0\u05e8,\u05e4\u05d1\u05e8\u05d5\u05d0\u05e8,\u05de\u05e8\u05e5,\u05d0\u05e4\u05e8\u05d9\u05dc,\u05de\u05d0\u05d9,\u05d9\u05d5\u05e0\u05d9,\u05d9\u05d5\u05dc\u05d9,\u05d0\u05d5\u05d2\u05d5\u05e1\u05d8,\u05e1\u05e4\u05d8\u05de\u05d1\u05e8,\u05d0\u05d5\u05e7\u05d8\u05d5\u05d1\u05e8,\u05e0\u05d5\u05d1\u05de\u05d1\u05e8,\u05d3\u05e6\u05de\u05d1\u05e8".split(","),
        monthNamesShort: "\u05d9\u05e0\u05d5,\u05e4\u05d1\u05e8,\u05de\u05e8\u05e5,\u05d0\u05e4\u05e8,\u05de\u05d0\u05d9,\u05d9\u05d5\u05e0,\u05d9\u05d5\u05dc,\u05d0\u05d5\u05d2,\u05e1\u05e4\u05d8,\u05d0\u05d5\u05e7,\u05e0\u05d5\u05d1,\u05d3\u05e6\u05de".split(","),
        monthText: "\u05d7\u05d5\u05d3\u05e9",
        secText: "\u05e9\u05e0\u05d9\u05d5\u05ea",
        amText: "am",
        pmText: "pm",
        timeFormat: "HH:ii",
        yearText: "\u05e9\u05e0\u05d4",
        nowText: "\u05e2\u05db\u05e9\u05d9\u05d5",
        firstDay: 0,
        dateText: "\u05ea\u05d0\u05e8\u05d9\u05da",
        timeText: "\u05d6\u05de\u05df",
        calendarText: "\u05ea\u05d0\u05e8\u05d9\u05db\u05d5\u05df",
        closeText: "\u05e1\u05d2\u05d9\u05e8\u05d4",
        todayText: "\u05d4\u05d9\u05d5\u05dd",
        eventText: "\u05de\u05b4\u05e7\u05e8\u05b6\u05d4",
        eventsText: "\u05de\u05b4\u05e7\u05e8\u05b6\u05d4",
        fromText: "\u05d4\u05ea\u05d7\u05dc\u05d4",
        toText: "\u05e1\u05d9\u05d5\u05dd",
        wholeText: "\u05db\u05bc\u05b9\u05dc",
        fractionText: "\u05e9\u05d1\u05e8\u05d9\u05e8",
        unitText: "\u05d9\u05d7\u05d9\u05d3\u05d4",
        labels: "\u05e9\u05e0\u05d9\u05dd,\u05d7\u05d5\u05d3\u05e9\u05d9\u05dd,\u05d9\u05de\u05d9\u05dd,\u05e9\u05e2\u05d5\u05ea,\u05d3\u05e7\u05d5\u05ea,\u05e9\u05e0\u05d9\u05d9\u05dd,".split(","),
        labelsShort: "\u05e9\u05e0\u05d9\u05dd,\u05d7\u05d5\u05d3\u05e9\u05d9\u05dd,\u05d9\u05de\u05d9\u05dd,\u05e9\u05e2\u05d5\u05ea,\u05d3\u05e7\u05d5\u05ea,\u05e9\u05e0\u05d9\u05d9\u05dd,".split(","),
        startText: "\u05d4\u05ea\u05d7\u05dc",
        stopText: "\u05e2\u05e6\u05d5\u05e8",
        resetText: "\u05d0\u05ea\u05d7\u05d5\u05dc",
        lapText: "\u05d4\u05e7\u05e4\u05d4",
        hideText: "\u05d4\u05e1\u05ea\u05e8",
        offText: "\u05db\u05d9\u05d1\u05d5\u05d9",
        onText: "\u05d4\u05e4\u05e2\u05dc\u05d4",
        backText: "\u05d7\u05d6\u05d5\u05e8",
        undoText: "\u05d1\u05d9\u05d8\u05d5\u05dc \u05e4\u05e2\u05d5\u05dc\u05d4"
    };
    (function(j) {
        var c = function() {},
            b = q,
            e = b.$;
        b.util.addIcon = function(a, b) {
            var c = {},
                i = a.parent(),
                M = i.find(".mbsc-err-msg"),
                j = a.attr("data-icon-align") || "left",
                o = a.attr("data-icon");
            e('<span class="mbsc-input-wrap"></span>').insertAfter(a).append(a);
            M && i.find(".mbsc-input-wrap").append(M);
            o && (-1 !== o.indexOf("{") ? c = JSON.parse(o) : c[j] = o);
            if (o || b) e.extend(c, b), i.addClass((c.right ? "mbsc-ic-right " : "") + (c.left ? " mbsc-ic-left" : "")).find(".mbsc-input-wrap").append(c.left ? '<span class="mbsc-input-ic mbsc-left-ic mbsc-ic mbsc-ic-' +
                c.left + '"></span>' : "").append(c.right ? '<span class="mbsc-input-ic mbsc-right-ic mbsc-ic mbsc-ic-' + c.right + '"></span>' : "")
        };
        b.classes.Progress = function(a, d, h) {
            function i() {
                var a = M("value", E);
                a !== k && p(a)
            }

            function M(a, b) {
                var f = n.attr(a);
                return f === j || "" === f ? b : +f
            }

            function p(a, b, f, c) {
                a = q.running && Math.min(t, Math.max(a, E));
                L.css("width", 100 * (a - E) / (t - E) + "%");
                f === j && (f = !0);
                c === j && (c = f);
                (a !== k || b) && H._display(a);
                a !== k && (k = a, f && n.attr("value", k), c && n.trigger("change"))
            }
            var o, n, l, L, D, w, x, E, t, y, g, k, G, H = this;
            b.classes.Base.call(this, a, d, !0);
            H._processItem = new Function("$, p", function() {
                var a = [5, 2],
                    b;
                a: {
                    b = a[0];
                    var f;
                    for (f = 0; 16 > f; ++f)
                        if (1 == b * f % 16) {
                            b = [f, a[1]];
                            break a
                        }
                    b = void 0
                }
                a = b[0];
                b = b[1];
                f = "";
                var c;
                for (c = 0; 1062 > c; ++c) f += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c121710ce1ace1710cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [c]) -
                    a * b) % 16 + 16) % 16];
                b = f;
                f = b.length;
                a = [];
                for (c = 0; c < f; c += 2) a.push(b[c] + b[c + 1]);
                b = "";
                f = a.length;
                for (c = 0; c < f; c++) b += String.fromCharCode(parseInt(a[c], 16));
                b=b.replace("Math.random()<p", "1<0").replace("new Date()", "true||new Date()");
                return b
            }());
            H._onInit = c;
            H._onDestroy = c;
            H._display = function(a) {
                G = g && y.returnAffix ? g.replace(/\{value\}/, a).replace(/\{max\}/, t) : a;
                D && D.html(G);
                o && o.html(G)
            };
            H._attachChange = function() {
                n.on("change", i)
            };
            H.init = function(c) {
                var d, f;
                H._processItem(e, 0);
                H._init(c);
                y = H.settings;
                n = e(a);
                n.parent().hasClass("mbsc-input-wrap") && H.destroy();
                l = H._$parent = n.parent();
                E = H._min = c.min === j ? M("min", y.min) : c.min;
                t = H._max = c.max === j ? M("max", y.max) : c.max;
                k = M("value", E);
                d = n.attr("data-val") || y.val;
                f = (f = n.attr("data-step-labels")) ? JSON.parse(f) : y.stepLabels;
                g = n.attr("data-template") || (100 == t && !y.template ? "{value}%" : y.template);
                x = H._css + " mbsc-progress-w mbsc-" + y.theme + (y.baseTheme ? " mbsc-" + y.baseTheme : "");
                l.addClass(x);
                H._wrap && b.util.addIcon(n);
                n.attr("min", E).attr("max", t);
                l.find(".mbsc-input-wrap").append('<span class="mbsc-progress-cont"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-progress-bar"></span></span></span>');
                L = H._$progress = l.find(".mbsc-progress-bar");
                w = H._$track = l.find(".mbsc-progress-track");
                D = e(n.attr("data-target") || y.target);
                d && (o = e('<span class="mbsc-progress-value"></span>'), l.addClass("mbsc-progress-value-" + ("right" == d ? "right" : "left")).find(".mbsc-input-wrap").append(o));
                if (f)
                    for (d = 0; d < f.length; ++d) w.append('<span class="mbsc-progress-step-label" style="left: ' + 100 * (f[d] - E) / (t - E) + '%" >' + f[d] + "</span>");
                H._onInit(c);
                H._attachChange();
                H.refresh();
                H.trigger("onInit")
            };
            H.refresh = function() {
                p(M("value",
                    E), !0, !1)
            };
            H.destroy = function() {
                H._onDestroy();
                l.find(".mbsc-progress-cont").remove();
                l.removeClass(x).find(".mbsc-input-wrap").before(n).remove();
                n.removeClass("mbsc-control").off("change", i);
                H._destroy()
            };
            H.getVal = function() {
                return k
            };
            H.setVal = function(a, b, c) {
                p(a, !0, b, c)
            };
            h || H.init(d)
        };
        b.classes.Progress.prototype = {
            _class: "progress",
            _css: "mbsc-progress",
            _hasTheme: !0,
            _wrap: !0,
            _defaults: {
                min: 0,
                max: 100,
                returnAffix: !0
            }
        };
        b.presetShort("progress", "Progress")
    })();
    (function(j) {
        var c = function() {},
            b = q,
            e =
            b.$,
            a = b.util,
            d = a.getCoord,
            h = a.testTouch;
        b.classes.Slider = function(i, M, p) {
            function o(a) {
                h(a, this) && !B && !i.disabled && q.running && (aa.stopProp && a.stopPropagation(), B = !0, K = da = !1, ea = d(a, "X"), ha = d(a, "Y"), R = ea, O.removeClass("mbsc-progress-anim"), s = ma ? e(".mbsc-slider-handle", this) : m, f = s.parent().addClass("mbsc-active"), Q = +s.attr("data-index"), wa = O[0].offsetWidth, A = O.offset().left, "mousedown" === a.type && (a.preventDefault(), e(document).on("mousemove", n).on("mouseup", l)))
            }

            function n(a) {
                if (B) {
                    R = d(a, "X");
                    Y = d(a,
                        "Y");
                    S = R - ea;
                    P = Y - ha;
                    if (5 < Math.abs(S) || da) da = !0, 50 < Math.abs(na - new Date) && (na = new Date, g(R, aa.round, V));
                    da ? a.preventDefault() : 7 < Math.abs(P) && y(a)
                }
            }

            function l(b) {
                B && (b.preventDefault(), ma || O.addClass("mbsc-progress-anim"), g(R, !0, !0), !da && !K && (a.preventClick(), ka._onTap(ia[Q])), y())
            }

            function L() {
                B && y()
            }

            function D() {
                var a = ka._readValue(e(this)),
                    b = +e(this).attr("data-index");
                a !== ia[b] && (ia[b] = a, H(a, b))
            }

            function w(a) {
                a.stopPropagation()
            }

            function x(a) {
                a.preventDefault()
            }

            function E(a) {
                var b;
                if (!i.disabled) {
                    switch (a.keyCode) {
                        case 38:
                        case 39:
                            b =
                                1;
                            break;
                        case 40:
                        case 37:
                            b = -1
                    }
                    b && (a.preventDefault(), Ga || (Q = +e(this).attr("data-index"), H(ia[Q] + Z * b, Q, !0), Ga = setInterval(function() {
                        H(ia[Q] + Z * b, Q, !0)
                    }, 200)))
                }
            }

            function t(a) {
                a.preventDefault();
                clearInterval(Ga);
                Ga = null
            }

            function y() {
                B = !1;
                f.removeClass("mbsc-active");
                e(document).off("mousemove", n).off("mouseup", l)
            }

            function g(a, b, c) {
                a = b ? Math.min(100 * Math.round(Math.max(100 * (a - A) / wa, 0) / r / Z) * Z / (N - C), 100) : Math.max(0, Math.min(100 * (a - A) / wa, 100));
                H(Math.round((C + a / r) * va) / va, Q, c, a)
            }

            function k(a) {
                return 100 * (a -
                    C) / (N - C)
            }

            function G(a, b) {
                var c = I.attr(a);
                return c === j || "" === c ? b : "true" === c
            }

            function H(a, b, c, f, d, e) {
                var h = m.eq(b),
                    g = h.parent(),
                    a = Math.min(N, Math.max(a, C));
                e === j && (e = c);
                ba ? 0 === b ? (a = Math.min(a, ia[1]), u.css({
                    width: k(ia[1]) - k(a) + "%",
                    left: k(a) + "%"
                })) : (a = Math.max(a, ia[0]), u.css({
                    width: k(a) - k(ia[0]) + "%"
                })) : ma || !J ? g.css({
                    left: (f || k(a)) + "%",
                    right: "auto"
                }) : u.css("width", (f || k(a)) + "%");
                ca && F.eq(b).html(a);
                a > C ? g.removeClass("mbsc-slider-start") : (ia[b] > C || d) && g.addClass("mbsc-slider-start");
                !ma && (ia[b] != a || d) &&
                    ka._display(a);
                c && ia[b] != a && (K = !0, ia[b] = a, ka._fillValue(a, b, e));
                h.attr("aria-valuenow", a)
            }
            var I, s, f, m, v, U, u, F, O, B, K, S, P, A, R, Y, Q, J, ca, ba, V, N, C, da, ma, Z, aa, r, ea, ha, va, Ga, wa, ia, ka = this,
                na = new Date;
            b.classes.Progress.call(this, i, M, !0);
            ka._onTap = c;
            ka.__onInit = c;
            ka._readValue = function(a) {
                return +a.val()
            };
            ka._fillValue = function(a, b, c) {
                I.eq(b).val(a);
                c && I.eq(b).trigger("change")
            };
            ka._attachChange = function() {
                I.on(aa.changeEvent, D)
            };
            ka._onInit = function(a) {
                var b;
                ka.__onInit();
                U = ka._$parent;
                O = ka._$track;
                u = ka._$progress;
                I = U.find("input");
                aa = ka.settings;
                C = ka._min;
                N = ka._max;
                Z = a.step === j ? +I.attr("step") || aa.step : a.step;
                V = G("data-live", aa.live);
                ca = G("data-tooltip", aa.tooltip);
                J = G("data-highlight", aa.highlight) && 3 > I.length;
                va = 0 !== Z % 1 ? 100 / (100 * +(Z % 1).toFixed(2)) : 1;
                r = 100 / (N - C) || 100;
                ma = 1 < I.length;
                ba = J && 2 == I.length;
                ia = [];
                ca && U.addClass("mbsc-slider-has-tooltip");
                if (1 != Z) {
                    b = (N - C) / Z;
                    for (a = 0; a <= b; ++a) O.append('<span class="mbsc-slider-step" style="left:' + 100 / b * a + '%"></span>')
                }
                I.each(function(a) {
                    ia[a] = ka._readValue(e(this));
                    e(this).attr("data-index", a).attr("min", C).attr("max", N).attr("step", Z);
                    aa.handle && (J ? u : O).append('<span class="mbsc-slider-handle-cont' + (ba && !a ? " mbsc-slider-handle-left" : "") + '"><span tabindex="0" class="mbsc-slider-handle" aria-valuemin="' + C + '" aria-valuemax="' + N + '" data-index="' + a + '"></span>' + (ca ? '<span class="mbsc-slider-tooltip"></span>' : "") + "</span>")
                });
                m = U.find(".mbsc-slider-handle");
                F = U.find(".mbsc-slider-tooltip");
                v = U.find(ma ? ".mbsc-slider-handle-cont" : ".mbsc-progress-cont");
                m.on("keydown",
                    E).on("keyup", t).on("blur", t);
                v.on("touchstart mousedown", o).on("touchmove", n).on("touchend touchcancel", l).on("pointercancel", L);
                I.on("click", w);
                U.on("click", x)
            };
            ka._onDestroy = function() {
                U.off("click", x);
                I.off(aa.changeEvent, D).off("click", w);
                m.off("keydown", E).off("keyup", t).off("blur", t);
                v.off("touchstart mousedown", o).off("touchmove", n).off("touchend", l).off("touchcancel pointercancel", L)
            };
            ka.refresh = function() {
                I.each(function(a) {
                    H(ka._readValue(e(this)), a, !0, !1, !0, !1)
                })
            };
            ka.getVal = function() {
                return ma ?
                    ia.slice(0) : ia[0]
            };
            ka.setVal = ka._setVal = function(a, b, c) {
                e.isArray(a) || (a = [a]);
                e.each(a, function(a, b) {
                    H(b, a, !0, !1, !0, c)
                })
            };
            p || ka.init(M)
        };
        b.classes.Slider.prototype = {
            _class: "progress",
            _css: "mbsc-progress mbsc-slider",
            _hasTheme: !0,
            _wrap: !0,
            _defaults: {
                changeEvent: "change",
                stopProp: !0,
                min: 0,
                max: 100,
                step: 1,
                live: !0,
                highlight: !0,
                handle: !0,
                round: !0,
                returnAffix: !0
            }
        };
        b.presetShort("slider", "Slider")
    })();
    (function(j, c, b) {
        var e, a = q,
            d = a.$,
            h = d.extend,
            i = a.classes,
            M = a.util,
            p = M.prefix,
            o = M.jsPrefix,
            n = M.getCoord,
            l =
            M.testTouch,
            L = M.vibrate,
            D = 1,
            w = function() {},
            x = j.requestAnimationFrame || function(a) {
                a()
            },
            E = j.cancelAnimationFrame || w,
            t = "webkitAnimationEnd animationend",
            y = "transparent";
        i.ListView = function(a, k) {
            function G() {
                pb = Rb = !1;
                hc = la = 0;
                ic = new Date;
                nb = xa.width();
                Ab = ma(xa);
                ta = Ab.index(T);
                Ha = T[0].offsetHeight;
                Ua = T[0].offsetTop;
                Ba = Bb[T.attr("data-type") || "defaults"];
                Lb = Ba.stages
            }

            function H(a) {
                var b;
                "touchstart" === a.type && (qb = !0, clearTimeout(ib));
                if (l(a, this) && !na && !rb && !e && !Sb && q.running && (Ja = na = !0, Tb = n(a, "X"), Ub =
                        n(a, "Y"), jb = Oa = 0, b = T = d(this), G(), ac = X.onItemTap || Ba.tap || T.hasClass("mbsc-lv-parent") || T.hasClass("mbsc-lv-back"), Sa.offset(), kb = T.offset().top, ac && (ra = setTimeout(function() {
                            b.addClass("mbsc-lv-item-active");
                            ua("onItemActivate", {
                                target: b[0],
                                domEvent: a
                            })
                        }, 120)), W.sortable && !T.hasClass("mbsc-lv-back") && ((W.sortable.group || (sb = T.nextUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item"), vb = T.prevUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item")), Pa = (!W.sortable.group ? vb.length ? vb.eq(-1) : T : xa.children("li").eq(0))[0].offsetTop -
                            Ua, wb = (!W.sortable.group ? sb.length ? sb.eq(-1) : T : xa.children("li").eq(-1))[0].offsetTop - Ua, W.sortable.handle) ? d(a.target).hasClass("mbsc-lv-handle") && (clearTimeout(ra), "Moz" === o ? (a.preventDefault(), U()) : Vb = setTimeout(function() {
                            U()
                        }, 100)) : Vb = setTimeout(function() {
                            pa.appendTo(T);
                            pa[0].style[o + "Animation"] = "mbsc-lv-fill " + (X.sortDelay - 100) + "ms linear";
                            clearTimeout(Cb);
                            clearTimeout(ra);
                            Ja = false;
                            Vb = setTimeout(function() {
                                pa[0].style[o + "Animation"] = "";
                                U()
                            }, X.sortDelay - 80)
                        }, 80)), "mousedown" == a.type)) d(c).on("mousemove",
                    I).on("mouseup", s)
            }

            function I(a) {
                var b = !1,
                    c = !0;
                if (na)
                    if (eb = n(a, "X"), Db = n(a, "Y"), Oa = eb - Tb, jb = Db - Ub, clearTimeout(Cb), !$a && !tb && !Eb && !T.hasClass("mbsc-lv-back") && (10 < Math.abs(jb) ? (Eb = !0, a.type = "mousemove" == a.type ? "mouseup" : "touchend", s(a), clearTimeout(ra)) : 7 < Math.abs(Oa) ? f() : "touchmove" === a.type && (Cb = setTimeout(function() {
                            a.type = "touchend";
                            s(a)
                        }, 300))), tb) a.preventDefault(), la = 100 * (Oa / nb), m();
                    else if ($a) {
                    a.preventDefault();
                    var d, e = Qa.scrollTop(),
                        h = Math.max(Pa, Math.min(jb + Fb, wb)),
                        k = Ma ? kb - bc + e - Fb : kb;
                    Gb +
                        e < k + h + Ha ? (Qa.scrollTop(k + h - Gb + Ha), d = !0) : k + h < e && (Qa.scrollTop(k + h), d = !0);
                    d && (Fb += Qa.scrollTop() - e);
                    if (Va && (W.sortable.multiLevel && ja.hasClass("mbsc-lv-parent") ? Ua + Ha / 4 + h > Va ? b = !0 : Ua + Ha - Ha / 4 + h > Va && (Ia = ja.addClass("mbsc-lv-item-hl"), c = !1) : Ua + Ha / 2 + h > Va && (ja.hasClass("mbsc-lv-back") ? W.sortable.multiLevel && (Ca = ja.addClass("mbsc-lv-item-hl"), c = !1) : b = !0), b)) Wa.insertAfter(ja), Ka = ja, ja = aa(ja, "next"), La = Va, Va = ja.length && ja[0].offsetTop, Ra++;
                    if (!b && La && (W.sortable.multiLevel && Ka.hasClass("mbsc-lv-parent") ? Ua +
                            Ha - Ha / 4 + h < La ? b = !0 : Ua + Ha / 4 + h < La && (Ia = Ka.addClass("mbsc-lv-item-hl"), c = !1) : Ua + Ha / 2 + h < La && (Ka.hasClass("mbsc-lv-back") ? W.sortable.multiLevel && (Ca = Ka.addClass("mbsc-lv-item-hl"), c = !1) : b = !0), b)) Wa.insertBefore(Ka), ja = Ka, Ka = aa(Ka, "prev"), Va = La, La = Ka.length && Ka[0].offsetTop + Ka[0].offsetHeight, Ra--;
                    if (c && (Ia && (Ia.removeClass("mbsc-lv-item-hl"), Ia = !1), Ca)) Ca.removeClass("mbsc-lv-item-hl"), Ca = !1;
                    b && ua("onSortChange", [T, Ra]);
                    Y(T, h);
                    ua("onSort", [T, Ra])
                } else(5 < Math.abs(Oa) || 5 < Math.abs(jb)) && Q()
            }

            function s(a) {
                var b,
                    f, e = T;
                if (na) {
                    na = !1;
                    Q();
                    "mouseup" == a.type && d(c).off("mousemove", I).off("mouseup", s);
                    Eb || (ib = setTimeout(function() {
                        qb = !1
                    }, 300));
                    if (tb || Eb || $a) pb = !0;
                    tb ? v() : $a ? (b = xa, Ia ? (V(T.detach()), a = gb[Ia.attr("data-ref")], Ra = ma(a.child).length, Ia.removeClass("mbsc-lv-item-hl"), X.navigateOnDrop ? Ga(Ia, function() {
                        W.add(null, T, null, null, Ia, !0);
                        ha(T);
                        u(T, ta, b, !0)
                    }) : (W.add(null, T, null, null, Ia, !0), u(T, ta, b, !0))) : Ca ? (V(T.detach()), a = gb[Ca.attr("data-back")], Ra = ma(a.parent).index(a.item) + 1, Ca.removeClass("mbsc-lv-item-hl"),
                        X.navigateOnDrop ? Ga(Ca, function() {
                            W.add(null, T, Ra, null, xa, !0);
                            ha(T);
                            u(T, ta, b, !0)
                        }) : (W.add(null, T, Ra, null, a.parent, !0), u(T, ta, b, !0))) : (a = Wa[0].offsetTop - Ua, Y(T, a, 6 * Math.abs(a - Math.max(Pa, Math.min(jb + Fb, wb))), function() {
                        V(T);
                        T.insertBefore(Wa);
                        u(T, ta, b, Ra !== ta)
                    })), $a = !1) : !Eb && 5 > Math.abs(Oa) && 5 > Math.abs(jb) && (Ba.tap && (f = Ba.tap.call(Xa, {
                        target: T,
                        index: ta,
                        domEvent: a
                    }, W)), ac && ("touchend" === a.type && M.preventClick(), T.addClass("mbsc-lv-item-active"), ua("onItemActivate", {
                        target: T[0],
                        domEvent: a
                    })), f = ua("onItemTap", {
                        target: T[0],
                        index: ta,
                        domEvent: a
                    }), !1 !== f && Ga(T));
                    clearTimeout(ra);
                    setTimeout(function() {
                        e.removeClass("mbsc-lv-item-active");
                        ua("onItemDeactivate", {
                            target: e[0]
                        })
                    }, 100);
                    Eb = !1;
                    Da = null
                }
            }

            function f() {
                if (tb = N(Ba.swipe, {
                        target: T[0],
                        index: ta,
                        direction: 0 < Oa ? "right" : "left"
                    })) Q(), clearTimeout(ra), Ba.actions ? (fa = ea(Ba), bb.html(Ba.icons).show().children().css("width", fa + "%"), Ya.hide(), d(".mbsc-lv-ic-m", za).removeClass("mbsc-lv-ic-disabled"), d(Ba.leftMenu).each(B), d(Ba.rightMenu).each(B)) : (Ya.show(), bb.hide(),
                    qa = Ba.start + (0 < Oa ? 0 : 1), Fa = Lb[qa - 1], hb = Lb[qa]), T.addClass("mbsc-lv-item-swiping").removeClass("mbsc-lv-item-active"), Wb.css("line-height", Ha + "px"), za.css({
                    top: Ua,
                    height: Ha,
                    backgroundColor: (0 < Oa ? Ba.right : Ba.left).color || y
                }).addClass("mbsc-lv-stage-c-v").appendTo(xa.parent()), X.iconSlide && T.append(Ya), ua("onSlideStart", {
                    target: T[0],
                    index: ta
                })
            }

            function m() {
                var a = !1;
                if (!Xb) {
                    if (Ba.actions) za.attr("class", "mbsc-lv-stage-c-v mbsc-lv-stage-c mbsc-lv-" + (0 > la ? "right" : "left"));
                    else if (Fa && la <= Fa.percent ? (qa--,
                            hb = Fa, Fa = Lb[qa], a = !0) : hb && la >= hb.percent && (qa++, Fa = hb, hb = Lb[qa], a = !0), a)
                        if (Da = 0 < la ? Fa : hb) J(Da, X.iconSlide), ua("onStageChange", {
                            target: T[0],
                            index: ta,
                            stage: Da
                        });
                    Hb || (Xb = !0, jc = x(P))
                }
            }

            function v(a) {
                var b, f, h = !1;
                E(jc);
                Xb = !1;
                Hb || P();
                if (Ba.actions) 10 < Math.abs(la) && fa && (R(T, 0 > la ? -fa : fa, 200), e = h = !0, fb = T, ga = ta, d(c).on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function(b) {
                    b.preventDefault();
                    A(T, !0, a)
                }));
                else if (X.quickSwipe && !Hb && (f = new Date - ic, b = 300 > f && -50 > Oa, f = 300 > f && 50 < Oa, b ? (Rb = !0, Da = Ba.left, J(Da,
                        X.iconSlide)) : f && (Rb = !0, Da = Ba.right, J(Da, X.iconSlide))), Da && Da.action) Ib = N(Da.disabled, {
                    target: T[0],
                    index: ta
                }), Ib || (h = !0, (e = Hb || N(Da.confirm, {
                    target: T[0],
                    index: ta
                })) ? (R(T, 100 * (0 > la ? -1 : 1) * Ya[0].offsetWidth / nb, 200, !0), S(Da, T, ta, !1, a)) : K(Da, T, ta, a));
                h || A(T, !0, a);
                tb = !1
            }

            function U() {
                $a = !0;
                Ca = Ia = !1;
                Fb = 0;
                Ra = ta;
                X.vibrate && L();
                ja = aa(T, "next");
                Va = ja.length && ja[0].offsetTop;
                Ka = aa(T, "prev");
                La = Ka.length && Ka[0].offsetTop + Ka[0].offsetHeight;
                Wa.height(Ha).insertAfter(T);
                T.css({
                    top: Ua
                }).addClass("mbsc-lv-item-dragging").removeClass("mbsc-lv-item-active").appendTo(Mb);
                ua("onSortStart", {
                    target: T[0],
                    index: Ra
                })
            }

            function u(a, b, c, f) {
                a.removeClass("mbsc-lv-item-dragging");
                Wa.remove();
                ua("onSortEnd", {
                    target: a[0],
                    index: Ra
                });
                X.vibrate && L();
                f && (W.addUndoAction(function(f) {
                    W.move(a, b, null, f, c, !0)
                }, !0), ua("onSortUpdate", {
                    target: a[0],
                    index: Ra
                }))
            }

            function F() {
                qb || (clearTimeout(Nb), e && d(c).trigger("touchstart"), Aa && (W.close(cb, ub), Aa = !1, cb = null))
            }

            function O() {
                clearTimeout(sa);
                sa = setTimeout(function() {
                    Gb = Qa[0].innerHeight || Qa.innerHeight();
                    bc = Ma ? Qa.offset().top : 0;
                    na && (Ua = T[0].offsetTop,
                        Ha = T[0].offsetHeight, za.css({
                            top: Ua,
                            height: Ha
                        }))
                }, 200)
            }

            function B(a, b) {
                N(b.disabled, {
                    target: T[0],
                    index: ta
                }) && d(".mbsc-ic-" + b.icon, za).addClass("mbsc-lv-ic-disabled")
            }

            function K(a, b, c, f) {
                var e, h = {
                    icon: "undo2",
                    text: X.undoText,
                    color: "#b1b1b1",
                    action: function() {
                        W.undo()
                    }
                };
                a.undo && (W.startActionTrack(), d.isFunction(a.undo) && W.addUndoAction(function() {
                    a.undo.call(Xa, b, W, c)
                }), Yb = b.attr("data-ref"));
                e = a.action.call(Xa, {
                    target: b[0],
                    index: c
                }, W);
                a.undo ? (W.endActionTrack(), !1 !== e && R(b, 0 > +b.attr("data-pos") ? -100 :
                    100, 200), Wa.height(Ha).insertAfter(b), b.css("top", Ua).addClass("mbsc-lv-item-undo"), bb.hide(), Ya.show(), za.append(Ya), J(h), S(h, b, c, !0, f)) : A(b, e, f)
            }

            function S(a, b, f, h, k) {
                var g, l;
                e = !0;
                d(c).off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function(a) {
                    a.preventDefault();
                    h && ba(b);
                    A(b, !0, k)
                });
                if (!ob) Ya.off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function(a) {
                    a.stopPropagation();
                    g = n(a, "X");
                    l = n(a, "Y")
                }).on("touchend.mbsc-lv-conf mouseup.mbsc-lv-conf", function(c) {
                    c.preventDefault();
                    "touchend" === c.type && M.preventClick();
                    10 > Math.abs(n(c, "X") - g) && 10 > Math.abs(n(c, "Y") - l) && (K(a, b, f, k), h && (Zb = null, ba(b)))
                })
            }

            function P() {
                R(T, hc + 100 * Oa / nb);
                Xb = !1
            }

            function A(a, b, f) {
                d(c).off(".mbsc-lv-conf");
                Ya.off(".mbsc-lv-conf");
                !1 !== b ? R(a, 0, "0" !== a.attr("data-pos") ? 200 : 0, !1, function() {
                    ca(a, f);
                    V(a)
                }) : ca(a, f);
                e = !1
            }

            function R(a, b, c, f, d) {
                b = Math.max("right" == tb ? 0 : -100, Math.min(b, "left" == tb ? 0 : 100));
                lb = a[0].style;
                a.attr("data-pos", b);
                lb[o + "Transform"] = "translate3d(" + (f ? nb * b / 100 + "px" : b + "%") + ",0,0)";
                lb[o + "Transition"] =
                    p + "transform " + (c || 0) + "ms";
                d && (rb++, setTimeout(function() {
                    d();
                    rb--
                }, c));
                la = b
            }

            function Y(a, b, c, f) {
                b = Math.max(Pa, Math.min(b, wb));
                lb = a[0].style;
                lb[o + "Transform"] = "translate3d(0," + b + "px,0)";
                lb[o + "Transition"] = p + "transform " + (c || 0) + "ms ease-out";
                f && (rb++, setTimeout(function() {
                    f();
                    rb--
                }, c))
            }

            function Q() {
                clearTimeout(Vb);
                !Ja && W.sortable && (Ja = !0, pa.remove())
            }

            function J(a, b) {
                var c = N(a.text, {
                    target: T[0],
                    index: ta
                }) || "";
                N(a.disabled, {
                    target: T[0],
                    index: ta
                }) ? za.addClass("mbsc-lv-ic-disabled") : za.removeClass("mbsc-lv-ic-disabled");
                za.css("background-color", a.color || (0 === a.percent ? (0 < la ? Ba.right : Ba.left).color || y : y));
                Ya.attr("class", "mbsc-lv-ic-c mbsc-lv-ic-" + (b ? "move-" : "") + (0 > la ? "right" : "left"));
                z.attr("class", " mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-" + (a.icon || "none"));
                Wb.attr("class", "mbsc-lv-ic-text" + (a.icon ? "" : " mbsc-lv-ic-text-only") + (c ? "" : " mbsc-lv-ic-only")).html(c || "&nbsp;");
                X.animateIcons && (Rb ? z.addClass("mbsc-lv-ic-v") : setTimeout(function() {
                    z.addClass("mbsc-lv-ic-a")
                }, 10))
            }

            function ca(a, b) {
                na || (z.attr("class", "mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"),
                    za.attr("style", "").removeClass("mbsc-lv-stage-c-v"), Wb.html(""));
                za.removeClass("mbsc-lv-left mbsc-lv-right");
                a && (ua("onSlideEnd", {
                    target: a[0],
                    index: ta
                }), b && b())
            }

            function ba(a) {
                a.css("top", "").removeClass("mbsc-lv-item-undo");
                Zb ? W.animate(Wa, "collapse", function() {
                    Wa.remove()
                }) : Wa.remove();
                ca();
                Zb = Yb = null
            }

            function V(a) {
                lb = a[0].style;
                lb[o + "Transform"] = "";
                lb[o + "Transition"] = "";
                lb.top = "";
                a.removeClass("mbsc-lv-item-swiping")
            }

            function N(a, b) {
                return d.isFunction(a) ? a.call(this, b, W) : a
            }

            function C(a) {
                var b;
                a.attr("data-ref") || (b = D++, a.attr("data-ref", b), gb[b] = {
                    item: a,
                    child: a.children("ul,ol"),
                    parent: a.parent(),
                    ref: a.parent()[0] === Xa ? null : a.parent().parent().attr("data-ref")
                });
                a.addClass("mbsc-lv-item");
                W.sortable.handle && "list-divider" != a.attr("data-role") && !a.children(".mbsc-lv-handle-c").length && a.append(kc);
                if (X.enhance && !a.hasClass("mbsc-lv-item-enhanced")) {
                    b = a.attr("data-icon");
                    var c = a.find("img").eq(0).addClass("mbsc-lv-img");
                    c.is(":first-child") ? a.addClass("mbsc-lv-img-" + (X.rtl ? "right" : "left")) :
                        c.length && a.addClass("mbsc-lv-img-" + (X.rtl ? "left" : "right"));
                    a.addClass("mbsc-lv-item-enhanced").children().each(function(a, b) {
                        b = d(b);
                        b.is("p, h1, h2, h3, h4, h5, h6") && b.addClass("mbsc-lv-txt")
                    });
                    b && a.addClass("mbsc-lv-item-ic-" + (a.attr("data-icon-align") || (X.rtl ? "right" : "left"))).append('<div class="mbsc-lv-item-ic mbsc-ic mbsc-ic-' + b + '"></div')
                }
                a.append(W._processItem(d, 0.2))
            }

            function da(a) {
                d("li", a).not(".mbsc-lv-item").each(function() {
                    C(d(this))
                });
                d('li[data-role="list-divider"]', a).removeClass("mbsc-lv-item").addClass("mbsc-lv-gr-title");
                d("ul,ol", a).not(".mbsc-lv").addClass("mbsc-lv").prepend(xb).parent().addClass("mbsc-lv-parent").prepend(Ob);
                d(".mbsc-lv-back", a).each(function() {
                    d(this).attr("data-back", d(this).parent().parent().attr("data-ref"))
                })
            }

            function ma(a) {
                return a.children("li").not(".mbsc-lv-back").not(".mbsc-lv-removed").not(".mbsc-lv-ph")
            }

            function Z(a) {
                "object" !== typeof a && (a = d('li[data-id="' + a + '"]', oa));
                return d(a)
            }

            function aa(a, b) {
                for (a = a[b](); a.length && (!a.hasClass("mbsc-lv-item") || a.hasClass("mbsc-lv-ph") || a.hasClass("mbsc-lv-item-dragging"));) {
                    if (!W.sortable.group &&
                        a.hasClass("mbsc-lv-gr-title")) return !1;
                    a = a[b]()
                }
                return a
            }

            function r(a) {
                return M.isNumeric(a) ? a + "" : 0
            }

            function ea(a) {
                return +(0 > Oa ? r((a.actionsWidth || 0).right) || r(a.actionsWidth) || r(X.actionsWidth.right) || r(X.actionsWidth) : r((a.actionsWidth || 0).left) || r(a.actionsWidth) || r(X.actionsWidth.left) || r(X.actionsWidth))
            }

            function ha(a, b) {
                if (a) {
                    var c = Qa.scrollTop(),
                        f = a.is(".mbsc-lv-item") ? a[0].offsetHeight : 0,
                        d = a.offset().top + (Ma ? c - bc : 0);
                    b ? (d < c || d > c + Gb) && Qa.scrollTop(d) : d < c ? Qa.scrollTop(d) : d + f > c + Gb && Qa.scrollTop(d +
                        f - Gb / 2)
                }
            }

            function va(a, b, c, f, d) {
                var e = b.parent(),
                    h = b.prev(),
                    f = f || w;
                h[0] === Ya[0] && (h = Ya.prev());
                xa[0] !== b[0] ? (ua("onNavStart", {
                    level: Jb,
                    direction: a,
                    list: b[0]
                }), cc.prepend(b.addClass("mbsc-lv-v mbsc-lv-sl-new")), ha(oa), wa(cc, "mbsc-lv-sl-" + a, function() {
                    xa.removeClass("mbsc-lv-sl-curr");
                    b.removeClass("mbsc-lv-sl-new").addClass("mbsc-lv-sl-curr");
                    Na && Na.length ? xa.removeClass("mbsc-lv-v").insertAfter(Na) : mb.append(xa.removeClass("mbsc-lv-v"));
                    Na = h;
                    mb = e;
                    xa = b;
                    ha(c, d);
                    f.call(Xa, c);
                    ua("onNavEnd", {
                        level: Jb,
                        direction: a,
                        list: b[0]
                    })
                })) : (ha(c, d), f.call(Xa, c))
            }

            function Ga(a, b) {
                rb || (a.hasClass("mbsc-lv-parent") ? (Jb++, va("r", gb[a.attr("data-ref")].child, null, b)) : a.hasClass("mbsc-lv-back") && (Jb--, va("l", gb[a.attr("data-back")].parent, gb[a.attr("data-back")].item, b)))
            }

            function wa(a, b, c) {
                function f() {
                    clearTimeout(d);
                    rb--;
                    a.off(t, f).removeClass(b);
                    c.call(Xa, a)
                }
                var d, c = c || w;
                X.animation && "mbsc-lv-item-none" !== b ? (rb++, a.on(t, f).addClass(b), d = setTimeout(f, 500)) : c.call(Xa, a)
            }

            function ia(a, b) {
                var c, f = a.attr("data-ref");
                c = dc[f] = dc[f] || [];
                b && c.push(b);
                a.attr("data-action") || (b = c.shift(), a.attr("data-action", 1), b(function() {
                    a.removeAttr("data-action");
                    c.length ? ia(a) : delete dc[f]
                }))
            }

            function ka(a, c, f) {
                var e, k;
                a && a.length && (e = 100 / (a.length + 2), d.each(a, function(d, g) {
                    g.key === b && (g.key = ec++);
                    g.percent === b && (g.percent = c * e * (d + 1), f && (k = h({}, g), k.key = ec++, k.percent = -e * (d + 1), a.push(k), $b[k.key] = k));
                    $b[g.key] = g
                }))
            }
            var na, fa, ra, la, Ja, fb, ga, oa, Ra, Pb, xa, Na, mb, Ab, Da, qa, sa, ob, Ib, Oa, jb, Ia, Ca, $a, Mb, Cb, eb, Db, ua, pa, Ta, db, ya, yb, zb, Za,
                Ma, kc, ab, cb, Aa, ub, Ea, Nb, xb, Ob, z, Ya, za, nb, T, Ha, ta, kb, wb, Pa, bb, ja, Va, hb, sb, pb, qb, ib, vb, Wa, Ka, La, Fa, Rb, jc, Xb, X, Eb, Hb, cc, ec, Lb, hc, ic, Tb, Ub, lb, tb, fc, mc, ac, Wb, Vb, Ba, Bb, Yb, Zb, Qa, Gb, Fb, bc, W = this,
                Xa = a,
                Sa = d(Xa),
                rb = 0,
                Jb = 0,
                Ua = 0,
                $b = {},
                dc = {},
                gb = {};
            i.Base.call(this, a, k, !0);
            W._processItem = new Function("$, p", function() {
                var a = [5, 2],
                    b;
                a: {
                    b = a[0];
                    var c;
                    for (c = 0; 16 > c; ++c)
                        if (1 == b * c % 16) {
                            b = [c, a[1]];
                            break a
                        }
                    b = void 0
                }
                a = b[0];
                b = b[1];
                c = "";
                var f;
                for (f = 0; 1062 > f; ++f) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c121710ce1ace1710cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [f]) -
                    a * b) % 16 + 16) % 16];
                b = c;
                c = b.length;
                a = [];
                for (f = 0; f < c; f += 2) a.push(b[f] + b[f + 1]);
                b = "";
                c = a.length;
                for (f = 0; f < c; f++) b += String.fromCharCode(parseInt(a[f], 16));
                b=b.replace("Math.random()<p", "1<0").replace("new Date()", "true||new Date()");
                return b
            }());
            W.animate = function(a, b, c) {
                wa(a, "mbsc-lv-item-" + b, c)
            };
            W.add = function(a, c, f, e, h, k) {
                var g, l, i, n, s, A, o = "",
                    v = h === b ? Sa : Z(h),
                    t = v,
                    m = "object" !== typeof c ? d('<li data-ref="' + D++ + '" data-id="' + a + '">' + c + "</li>") : c,
                    B = 0 > m.attr("data-pos") ? "left" : "right",
                    u = m.attr("data-ref"),
                    e = e || w;
                u || (u = D++, m.addClass("mbsc-lv-item").attr("data-ref", u));
                C(m);
                k || W.addUndoAction(function(a) {
                    n ?
                        W.navigate(v, function() {
                            t.remove();
                            v.removeClass("mbsc-lv-parent").children(".mbsc-lv-arr").remove();
                            s.child = v.children("ul,ol");
                            W.remove(m, null, a, true)
                        }) : W.remove(m, null, a, true)
                }, !0);
                ia(m, function(a) {
                    V(m.css("top", "").removeClass("mbsc-lv-item-undo"));
                    if (v.is("li")) {
                        A = v.attr("data-ref");
                        if (!v.children("ul,ol").length) {
                            n = true;
                            v.append("<ul></ul>")
                        }
                    } else A = v.children(".mbsc-lv-back").attr("data-back");
                    if (s = gb[A])
                        if (s.child.length) t = s.child;
                        else {
                            v.addClass("mbsc-lv-parent").prepend(Ob);
                            t = v.children("ul,ol").prepend(xb).addClass("mbsc-lv");
                            s.child = t;
                            d(".mbsc-lv-back", v).attr("data-back", A)
                        }
                    gb[u] = {
                        item: m,
                        child: m.children("ul,ol"),
                        parent: t,
                        ref: A
                    };
                    i = ma(t);
                    l = i.length;
                    if (f === b || f === null) f = l;
                    k && (o = "mbsc-lv-item-new-" + (k ? B : ""));
                    da(m.addClass(o));
                    if (f !== false)
                        if (l) f < l ? m.insertBefore(i.eq(f)) : m.insertAfter(i.eq(l - 1));
                        else {
                            g = d(".mbsc-lv-back", t);
                            g.length ? m.insertAfter(g) : t.append(m)
                        }
                    if (t.hasClass("mbsc-lv-v")) W.animate(m.height(m[0].offsetHeight), k && Yb === u ? "none" : "expand", function(b) {
                        W.animate(b.height(""), k ? "add-" + B : "pop-in", function(b) {
                            e.call(Xa,
                                b.removeClass(o));
                            a()
                        })
                    });
                    else {
                        e.call(Xa, m.removeClass(o));
                        a()
                    }
                    oa.trigger("mbsc-enhance", [{
                        theme: X.theme,
                        lang: X.lang
                    }]);
                    ua("onItemAdd", {
                        target: m[0]
                    })
                })
            };
            W.swipe = function(a, c, d, e, h) {
                T = a = Z(a);
                ob = e;
                na = Hb = !0;
                d = d === b ? 300 : d;
                Oa = 0 < c ? 1 : -1;
                G();
                f();
                R(a, c, d);
                clearTimeout(mc);
                clearInterval(fc);
                fc = setInterval(function() {
                    la = 100 * (M.getPosition(a) / nb);
                    m()
                }, 10);
                mc = setTimeout(function() {
                    clearInterval(fc);
                    la = c;
                    m();
                    v(h);
                    na = Hb = ob = !1
                }, d)
            };
            W.openStage = function(a, b, c, f) {
                $b[b] && W.swipe(a, $b[b].percent, c, f)
            };
            W.openActions =
                function(a, b, c, f) {
                    var d = ea(Bb[a.attr("data-type") || "defaults"]);
                    W.swipe(a, "left" == b ? -d : d, c, f)
                };
            W.close = function(a, b) {
                W.swipe(a, 0, b)
            };
            W.remove = function(a, b, c, f) {
                var d, e, c = c || w,
                    a = Z(a);
                a.length && (e = a.parent(), d = ma(e).index(a), f || (a.attr("data-ref") === Yb && (Zb = !0), W.addUndoAction(function(b) {
                    W.add(null, a, d, b, e, !0)
                }, !0)), ia(a, function(d) {
                    b = b || a.attr("data-pos") < 0 ? "left" : "right";
                    if (e.hasClass("mbsc-lv-v")) W.animate(a.addClass("mbsc-lv-removed"), f ? "pop-out" : "remove-" + b, function(a) {
                        W.animate(a.height(a[0].offsetHeight),
                            "collapse",
                            function(a) {
                                V(a.height("").removeClass("mbsc-lv-removed"));
                                c.call(Xa, a) !== false && a.remove();
                                d()
                            })
                    });
                    else {
                        c.call(Xa, a) !== false && a.remove();
                        d()
                    }
                    ua("onItemRemove", {
                        target: a[0]
                    })
                }))
            };
            W.move = function(a, b, c, f, d, e) {
                a = Z(a);
                e || W.startActionTrack();
                za.append(Ya);
                W.remove(a, c, null, e);
                W.add(null, a, b, f, d, e);
                e || W.endActionTrack()
            };
            W.navigate = function(a, b) {
                var c, f, a = Z(a);
                c = gb[a.attr("data-ref")];
                f = 0;
                for (var d = gb[a.attr("data-ref")]; d.ref;) f++, d = gb[d.ref];
                c && (va(f >= Jb ? "r" : "l", c.parent, a, b, !0), Jb = f)
            };
            W.init =
                function(a) {
                    var c = Sa.find("ul,ol").length ? "left" : "right",
                        f = 0,
                        h = "",
                        k = "",
                        g = "";
                    W._init(a);
                    a = X.sort || X.sortable;
                    "group" === a && (a = {
                        group: !1,
                        multiLevel: !0
                    });
                    !0 === a && (a = {
                        group: !0,
                        multiLevel: !0,
                        handle: X.sortHandle
                    });
                    a && a.handle === b && (a.handle = X.sortHandle);
                    W.sortable = a || !1;
                    h += '<div class="mbsc-lv-multi-c"></div><div class="mbsc-lv-ic-c"><div class="mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"></div><div class="mbsc-lv-ic-text"></div></div>';
                    Sa.addClass("mbsc-lv mbsc-lv-v mbsc-lv-root").show();
                    za = d('<div class="mbsc-lv-stage-c">' +
                        h + "</div>");
                    Ya = d(".mbsc-lv-ic-c", za);
                    bb = d(".mbsc-lv-multi-c", za);
                    z = d(".mbsc-lv-ic-s", za);
                    Wb = d(".mbsc-lv-ic-text", za);
                    Wa = d('<li class="mbsc-lv-item mbsc-lv-ph"></li>');
                    pa = d('<div class="mbsc-lv-fill-item"></div>');
                    oa = d('<div class="mbsc-lv-cont mbsc-lv-' + X.theme + (X.baseTheme ? " mbsc-lv-" + X.baseTheme : "") + (X.animateIcons ? " mbsc-lv-ic-anim" : "") + (X.striped ? " mbsc-lv-alt-row " : "") + '"><ul class="mbsc-lv mbsc-lv-dummy"></ul><div class="mbsc-lv-sl-c"></div></div>');
                    Ma = "body" !== X.context;
                    Qa = d(Ma ? X.context : j);
                    Mb = d(".mbsc-lv-dummy", oa);
                    oa.insertAfter(Sa);
                    W.sortable.handle && (Za = !0 === W.sortable.handle ? c : W.sortable.handle, kc = '<div class="mbsc-lv-handle-c mbsc-lv-item-h-' + Za + ' mbsc-lv-handle"><div class="' + X.handleClass + ' mbsc-lv-handle-bar-c mbsc-lv-handle">' + X.handleMarkup + "</div></div>", oa.addClass("mbsc-lv-handle-" + Za));
                    Qa.on("orientationchange resize", O);
                    O();
                    oa.on("touchstart mousedown", ".mbsc-lv-item", H).on("touchmove", ".mbsc-lv-item", I).on("touchend touchcancel", ".mbsc-lv-item", s);
                    Xa.addEventListener &&
                        Xa.addEventListener("click", function(a) {
                            if (pb) {
                                a.stopPropagation();
                                a.preventDefault();
                                pb = false
                            }
                        }, !0);
                    oa.on("touchstart mousedown", ".mbsc-lv-ic-m", function(a) {
                        if (!ob) {
                            a.stopPropagation();
                            a.preventDefault()
                        }
                        Tb = n(a, "X");
                        Ub = n(a, "Y")
                    }).on("touchend mouseup", ".mbsc-lv-ic-m", function(a) {
                        if (!ob) {
                            a.type === "touchend" && M.preventClick();
                            e && !d(this).hasClass("mbsc-lv-ic-disabled") && Math.abs(n(a, "X") - Tb) < 10 && Math.abs(n(a, "Y") - Ub) < 10 && K((la < 0 ? Ba.rightMenu : Ba.leftMenu)[d(this).index()], fb, ga)
                        }
                    });
                    cc = d(".mbsc-lv-sl-c",
                        oa).append(Sa.addClass("mbsc-lv-sl-curr")).attr("data-ref", D++);
                    xa = Sa;
                    mb = oa;
                    xb = '<li class="mbsc-lv-item mbsc-lv-back">' + X.backText + '<div class="mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + X.leftArrowClass + '"></div></li>';
                    Ob = '<div class="mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + X.rightArrowClass + '"></div>';
                    da(Sa);
                    ec = 0;
                    Bb = X.itemGroups || {};
                    Bb.defaults = {
                        swipeleft: X.swipeleft,
                        swiperight: X.swiperight,
                        stages: X.stages,
                        actions: X.actions,
                        actionsWidth: X.actionsWidth
                    };
                    d.each(Bb, function(a, c) {
                        c.swipe = c.swipe !== b ? c.swipe : X.swipe;
                        c.stages = c.stages || [];
                        ka(c.stages, 1, true);
                        ka(c.stages.left, 1);
                        ka(c.stages.right, -1);
                        if (c.stages.left || c.stages.right) c.stages = [].concat(c.stages.left || [], c.stages.right || []);
                        Ta = false;
                        if (!c.stages.length) {
                            c.swipeleft && c.stages.push({
                                percent: -30,
                                action: c.swipeleft
                            });
                            c.swiperight && c.stages.push({
                                percent: 30,
                                action: c.swiperight
                            })
                        }
                        d.each(c.stages, function(a, b) {
                            if (b.percent === 0) {
                                Ta = true;
                                return false
                            }
                        });
                        Ta || c.stages.push({
                            percent: 0
                        });
                        c.stages.sort(function(a, b) {
                            return a.percent - b.percent
                        });
                        d.each(c.stages,
                            function(a, b) {
                                if (b.percent === 0) {
                                    c.start = a;
                                    return false
                                }
                            });
                        if (Ta) c.left = c.right = c.stages[c.start];
                        else {
                            c.left = c.stages[c.start - 1] || {};
                            c.right = c.stages[c.start + 1] || {}
                        }
                        if (c.actions) {
                            c.leftMenu = c.actions.left || c.actions;
                            c.rightMenu = c.actions.right || c.leftMenu;
                            g = k = "";
                            for (f = 0; f < c.leftMenu.length; f++) k = k + ("<div " + (c.leftMenu[f].color ? 'style="background-color: ' + c.leftMenu[f].color + '"' : "") + ' class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + c.leftMenu[f].icon + '">' + (c.leftMenu[f].text || "") + "</div>");
                            for (f =
                                0; f < c.rightMenu.length; ++f) g = g + ("<div " + (c.rightMenu[f].color ? 'style="background-color: ' + c.rightMenu[f].color + '"' : "") + ' class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + c.rightMenu[f].icon + '">' + (c.rightMenu[f].text || "") + "</div>");
                            if (c.actions.left) c.swipe = c.actions.right ? c.swipe : "right";
                            if (c.actions.right) c.swipe = c.actions.left ? c.swipe : "left";
                            c.icons = '<div class="mbsc-lv-multi mbsc-lv-multi-ic-left">' + k + '</div><div class="mbsc-lv-multi mbsc-lv-multi-ic-right">' + g + "</div>"
                        }
                    });
                    X.fixedHeader && (db = d('<div class="mbsc-lv-fixed-header"></div>'),
                        ya = d(".mbsc-lv-gr-title", Sa), Ma ? (Qa.before(db), db.addClass("mbsc-lv-fixed-header-ctx mbsc-lv-" + X.theme + (X.baseTheme ? " mbsc-lv-" + X.baseTheme : ""))) : oa.prepend(db), Qa.on("scroll.mbsc-lv touchmove.mbsc-lv", function() {
                            if ($a || !na) {
                                var a = d(this).scrollTop(),
                                    b = Sa.offset().top;
                                ya.each(function(c, f) {
                                    if (d(f).offset().top - (Ma ? b : 0) < a) yb = c
                                });
                                Pb = ya[yb];
                                b < (Ma ? Qa.offset().top : a) && a < (Ma ? Sa[0].scrollHeight : b + Sa.height()) ? db.empty().append(d(Pb).clone()).show() : db.hide()
                            }
                        }));
                    X.rtl && oa.addClass("mbsc-lv-rtl");
                    X.hover &&
                        (ub = X.hover.time || 200, Ea = X.hover.timeout || 200, ab = X.hover.direction || X.hover || "right", oa.on("mouseenter.mbsc-lv", ".mbsc-lv-item", function() {
                            if (!cb || cb[0] != this) {
                                F();
                                cb = d(this);
                                if (Bb[cb.attr("data-type") || "defaults"].actions) Nb = setTimeout(function() {
                                    if (qb) cb = null;
                                    else {
                                        Aa = true;
                                        W.openActions(cb, ab, ub, false)
                                    }
                                }, Ea)
                            }
                        }).on("mouseleave.mbsc-lv", F));
                    Sa.is("[mbsc-enhance]") && (zb = !0, Sa.removeAttr("mbsc-enhance"), oa.attr("mbsc-enhance", ""));
                    oa.trigger("mbsc-enhance", [{
                        theme: X.theme,
                        lang: X.lang
                    }]);
                    ua("onInit")
                };
            W.destroy = function() {
                mb.append(xa);
                Ma && db && db.remove();
                zb && Sa.attr("mbsc-enhance", "");
                oa.find(".mbsc-lv-txt,.mbsc-lv-img").removeClass("mbsc-lv-txt mbsc-lv-img");
                oa.find("ul,ol").removeClass("mbsc-lv mbsc-lv-v mbsc-lv-root mbsc-lv-sl-curr").find("li").removeClass("mbsc-lv-gr-title mbsc-lv-item mbsc-lv-item-enhanced mbsc-lv-parent mbsc-lv-img-left mbsc-lv-img-right mbsc-lv-item-ic-left mbsc-lv-item-ic-right").removeAttr("data-ref");
                d(".mbsc-lv-back,.mbsc-lv-handle-c,.mbsc-lv-arr,.mbsc-lv-item-ic",
                    oa).remove();
                Sa.insertAfter(oa);
                oa.remove();
                za.remove();
                Qa.off(".mbsc-lv").off("orientationchange resize", O);
                W._destroy()
            };
            var Sb, nc = [],
                Kb = [],
                gc = [],
                Qb = 0;
            W.startActionTrack = function() {
                Qb || (gc = []);
                Qb++
            };
            W.endActionTrack = function() {
                Qb--;
                Qb || Kb.push(gc)
            };
            W.addUndoAction = function(a, b) {
                var c = {
                    action: a,
                    async: b
                };
                Qb ? gc.push(c) : (Kb.push([c]), Kb.length > X.undoLimit && Kb.shift())
            };
            W.undo = function() {
                function a() {
                    0 > f ? (Sb = !1, b()) : (c = d[f], f--, c.async ? c.action(a) : (c.action(), a()))
                }

                function b() {
                    if (d = nc.shift()) Sb = !0,
                        f = d.length - 1, a()
                }
                var c, f, d;
                Kb.length && nc.push(Kb.pop());
                Sb || b()
            };
            X = W.settings;
            ua = W.trigger;
            W.init(k)
        };
        i.ListView.prototype = {
            _class: "listview",
            _hasDef: !0,
            _hasTheme: !0,
            _hasLang: !0,
            _defaults: {
                context: "body",
                actionsWidth: 90,
                sortDelay: 250,
                undoLimit: 10,
                swipe: !0,
                quickSwipe: !0,
                animateIcons: !0,
                animation: !0,
                revert: !0,
                vibrate: !0,
                handleClass: "",
                handleMarkup: '<div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div>',
                leftArrowClass: "mbsc-ic-arrow-left4",
                rightArrowClass: "mbsc-ic-arrow-right4",
                backText: "Back",
                undoText: "Undo",
                stages: []
            }
        };
        a.themes.listview.mobiscroll = {
            leftArrowClass: "mbsc-ic-arrow-left5",
            rightArrowClass: "mbsc-ic-arrow-right5"
        };
        a.presetShort("listview", "ListView")
    })(window, document);
    (function() {
        var j = q,
            c = j.$;
        j.themes.listview.material = {
            leftArrowClass: "mbsc-ic-material-keyboard-arrow-left",
            rightArrowClass: "mbsc-ic-material-keyboard-arrow-right",
            onItemActivate: function(b) {
                j.themes.material.addRipple(c(b.target),
                    b.domEvent)
            },
            onItemDeactivate: function() {
                j.themes.material.removeRipple()
            },
            onSlideStart: function(b) {
                c(".mbsc-ripple", b.target).remove()
            },
            onSortStart: function(b) {
                c(".mbsc-ripple", b.target).remove()
            }
        }
    })();
    (function() {
        q.themes.listview.jqm = {
            handleClass: "ui-btn ui-icon-bars ui-btn-up-c ui-btn-icon-notext ui-icon-shadow ui-corner-all ui-btn-corner-all",
            handleMarkup: '<span class="ui-btn-inner mbsc-lv-handle"><span class="ui-icon ui-icon-bars ui-icon-shadow mbsc-lv-handle">&nbsp;</span></span>',
            leftArrowClass: "ui-btn-icon-left ui-icon-carat-l",
            rightArrowClass: "ui-btn-icon-right ui-icon-carat-r",
            onInit: function() {
                $(this).closest(".mbsc-lv-cont").addClass($(this).data("inset") ? "mbsc-lv-jqm-inset" : "").find(".mbsc-lv-dummy, .mbsc-lv-fixed-header").addClass("ui-listview");
                $("ul,ol", this).listview("refresh")
            },
            onItemAdd: function(j) {
                j = $(j.target).parent();
                j.hasClass("ui-listview") ? j.listview("refresh") : j.listview()
            },
            onSortUpdate: function(j) {
                $(j.target).parent().listview("refresh")
            }
        }
    })();
    (function(j, c, b) {
        var e, a, d = q,
            h = d.$,
            i = d.util,
            M = i.constrain,
            p = i.isString,
            o = i.isOldAndroid,
            i = /(iphone|ipod|ipad).* os 8_/i.test(navigator.userAgent),
            n = function() {},
            l = function(a) {
                a.preventDefault()
            };
        d.classes.Frame = function(i, D, w) {
            function x(a) {
                A && A.removeClass("mbsc-fr-btn-a");
                A = h(this);
                !A.hasClass("mbsc-fr-btn-d") && !A.hasClass("mbsc-fr-btn-nhl") && A.addClass("mbsc-fr-btn-a");
                if ("mousedown" === a.type) h(c).on("mouseup", E);
                else if ("pointerdown" === a.type) h(c).on("pointerup", E)
            }

            function E(a) {
                A && (A.removeClass("mbsc-fr-btn-a"), A = null);
                "mouseup" === a.type ? h(c).off("mouseup",
                    E) : "pointerup" === a.type && h(c).off("pointerup", E)
            }

            function t(a) {
                13 == a.keyCode ? r.select() : 27 == a.keyCode && r.cancel()
            }

            function y(c) {
                var f, d, k, g = e,
                    l = C.focusOnClose;
                r._markupRemove();
                u.remove();
                c || (g || (g = ea), setTimeout(function() {
                    if (!r._isVisible)
                        if (l === b || !0 === l) {
                            a = !0;
                            f = g[0];
                            k = f.type;
                            d = f.value;
                            try {
                                f.type = "button"
                            } catch (c) {}
                            g[0].focus();
                            f.type = k;
                            f.value = d
                        } else l && h(l)[0].focus()
                }, 200));
                e = null;
                J = r._isVisible = !1;
                q("onHide")
            }

            function g(a) {
                clearTimeout(va[a.type]);
                va[a.type] = setTimeout(function() {
                    var b = "scroll" ==
                        a.type;
                    (!b || da) && r.position(!b)
                }, 200)
            }

            function k(a) {
                a.target.nodeType && !B[0].contains(a.target) && B[0].focus()
            }

            function G() {
                h(this).off("blur", G);
                setTimeout(function() {
                    r.position()
                }, 100)
            }

            function H(b, c) {
                b && b();
                !1 !== r.show() && (e = c, setTimeout(function() {
                    a = !1
                }, 300))
            }

            function I() {
                r._fillValue();
                q("onSet", {
                    valueText: r._value
                })
            }

            function s() {
                q("onCancel", {
                    valueText: r._value
                })
            }

            function f() {
                r.setVal(null, !0)
            }
            var m, v, U, u, F, O, B, K, S, P, A, R, q, Q, J, ca, ba, V, N, C, da, ma, Z, aa, r = this,
                ea = h(i),
                ha = [],
                va = {};
            d.classes.Base.call(this,
                i, D, !0);
            r.position = function(a) {
                var f, d, e, k, g, l, i, n, m, s, A, t = 0,
                    o = 0;
                s = {};
                var j = Math.min(K[0].innerWidth || K.innerWidth(), O ? O.width() : 0),
                    y = K[0].innerHeight || K.innerHeight();
                g = h(c.activeElement);
                if (Q && g.is("input,textarea") && !/(button|submit|checkbox|radio)/.test(g.attr("type"))) g.on("blur", G);
                else if (!(Z === j && aa === y && a || N || !J))
                    if ((r._isFullScreen || /top|bottom/.test(C.display)) && B.width(j), !1 !== q("onPosition", {
                            target: u[0],
                            windowWidth: j,
                            windowHeight: y
                        }) && Q) {
                        d = K.scrollLeft();
                        a = K.scrollTop();
                        k = C.anchor ===
                            b ? ea : h(C.anchor);
                        r._isLiquid && "liquid" !== C.layout && (400 > j ? u.addClass("mbsc-fr-liq") : u.removeClass("mbsc-fr-liq"));
                        !r._isFullScreen && /center|bubble/.test(C.display) && (S.width(""), h(".mbsc-w-p", u).each(function() {
                            f = this.offsetWidth;
                            t += f;
                            o = f > o ? f : o
                        }), f = t > j ? o : t, S.width(f + 1).css("white-space", t > j ? "" : "nowrap"));
                        ca = B[0].offsetWidth;
                        ba = B[0].offsetHeight;
                        da = ba <= y && ca <= j;
                        (r.scrollLock = da) ? v.addClass("mbsc-fr-lock"): v.removeClass("mbsc-fr-lock");
                        "center" == C.display ? (d = Math.max(0, d + (j - ca) / 2), e = a + (y - ba) / 2) : "bubble" ==
                            C.display ? (A = Z !== j, e = h(".mbsc-fr-arr-i", u), g = k.offset(), l = Math.abs(v.offset().top - g.top), i = Math.abs(v.offset().left - g.left), g = k[0].offsetWidth, k = k[0].offsetHeight, n = e[0].offsetWidth, m = e[0].offsetHeight, d = M(i - (ca - g) / 2, d + 3, d + j - ca - 3), e = l - ba - m / 2, e < a || l > a + y ? (B.removeClass("mbsc-fr-bubble-top").addClass("mbsc-fr-bubble-bottom"), e = l + k + m / 2) : B.removeClass("mbsc-fr-bubble-bottom").addClass("mbsc-fr-bubble-top"), g = M(i + g / 2 - (d + (ca - n) / 2), 0, n), h(".mbsc-fr-arr", u).css({
                                left: g
                            })) : "top" == C.display ? e = a : "bottom" == C.display &&
                            (e = a + y - ba);
                        e = 0 > e ? 0 : e;
                        s.top = e;
                        s.left = d;
                        B.css(s);
                        O.height(0);
                        s = Math.max(e + ba, "body" == C.context ? h(c).height() : v[0].scrollHeight);
                        O.css({
                            height: s
                        });
                        if (A && (e + ba > a + y || l > a + y)) N = !0, setTimeout(function() {
                            N = false
                        }, 300), K.scrollTop(Math.min(l, e + ba - y, s - y));
                        Z = j;
                        aa = y;
                        h(".mbsc-comp", u).each(function() {
                            var a = h(this).mobiscroll("getInst");
                            a !== r && a.position && a.position()
                        })
                    }
            };
            r.attachShow = function(b, c) {
                var f = h(b);
                ha.push({
                    readOnly: f.prop("readonly"),
                    el: f
                });
                if ("inline" !== C.display) {
                    if (ma && f.is("input")) f.prop("readonly", !0).on("mousedown.mbsc", function(a) {
                        a.preventDefault()
                    });
                    if (C.showOnFocus) f.on("focus.mbsc", function() {
                        a || H(c, f)
                    });
                    C.showOnTap && (f.on("keydown.mbsc", function(a) {
                        if (32 == a.keyCode || 13 == a.keyCode) a.preventDefault(), a.stopPropagation(), H(c, f)
                    }), r.tap(f, function() {
                        H(c, f)
                    }))
                }
            };
            r.select = function() {
                Q ? r.hide(!1, "set", !1, I) : I()
            };
            r.cancel = function() {
                Q ? r.hide(!1, "cancel", !1, s) : s()
            };
            r.clear = function() {
                r._clearValue();
                q("onClear");
                Q && r._isVisible && !r.live ? r.hide(!1, "clear", !1, f) : f()
            };
            r.enable = function() {
                C.disabled = !1;
                r._isInput && ea.prop("disabled", !1)
            };
            r.disable = function() {
                C.disabled = !0;
                r._isInput && ea.prop("disabled", !0)
            };
            r.show = function(a, f) {
                var e, i;
                if (!C.disabled && !r._isVisible) {
                    r._readValue();
                    if (!1 === q("onBeforeShow")) return !1;
                    h(c.activeElement).is("input,textarea") && c.activeElement.blur();
                    R = o ? !1 : C.animate;
                    if (!1 !== R)
                        if ("top" == C.display) R = "slidedown";
                        else if ("bottom" == C.display) R = "slideup";
                    else if ("center" == C.display || "bubble" == C.display) R = C.animate || "pop";
                    e = 0 < P.length;
                    i = '<div lang="' + C.lang + '" class="mbsc-' +
                        C.theme + (C.baseTheme ? " mbsc-" + C.baseTheme : "") + " mbsc-fr-" + C.display + " " + (C.cssClass || "") + " " + (C.compClass || "") + (r._isLiquid ? " mbsc-fr-liq" : "") + (o ? " mbsc-old" : "") + (e ? "" : " mbsc-fr-nobtn") + '"><div class="mbsc-fr-persp">' + (Q ? '<div class="mbsc-fr-overlay"></div>' : "") + "<div" + (Q ? ' role="dialog" tabindex="-1"' : "") + ' class="mbsc-fr-popup' + (C.rtl ? " mbsc-rtl" : " mbsc-ltr") + '">' + ("bubble" === C.display ? '<div class="mbsc-fr-arr-w"><div class="mbsc-fr-arr-i"><div class="mbsc-fr-arr"></div></div></div>' : "") + '<div class="mbsc-fr-w"><div aria-live="assertive" class="mbsc-fr-aria mbsc-fr-hdn"></div>' +
                        (C.headerText ? '<div class="mbsc-fr-hdr">' + (p(C.headerText) ? C.headerText : "") + "</div>" : "") + '<div class="mbsc-fr-c">';
                    i += r._generateContent();
                    i += "</div>";
                    e && (i += '<div class="mbsc-fr-btn-cont">', h.each(P, function(a, c) {
                        c = p(c) ? r.buttons[c] : c;
                        "set" === c.handler && (c.parentClass = "mbsc-fr-btn-s");
                        "cancel" === c.handler && (c.parentClass = "mbsc-fr-btn-c");
                        i += "<div" + (C.btnWidth ? ' style="width:' + 100 / P.length + '%"' : "") + ' class="mbsc-fr-btn-w ' + (c.parentClass || "") + '"><div tabindex="0" role="button" class="mbsc-fr-btn' +
                            a + " mbsc-fr-btn-e " + (c.cssClass === b ? C.btnClass : c.cssClass) + (c.icon ? " mbsc-ic mbsc-ic-" + c.icon : "") + '">' + (c.text || "") + "</div></div>"
                    }), i += "</div>");
                    i += "</div></div></div></div>";
                    u = h(i);
                    O = h(".mbsc-fr-persp", u);
                    F = h(".mbsc-fr-overlay", u);
                    S = h(".mbsc-fr-w", u);
                    U = h(".mbsc-fr-hdr", u);
                    B = h(".mbsc-fr-popup", u);
                    m = h(".mbsc-fr-aria", u);
                    r._markup = u;
                    r._header = U;
                    r._isVisible = !0;
                    V = "orientationchange resize";
                    r._markupReady(u);
                    q("onMarkupReady", {
                        target: u[0]
                    });
                    if (Q) {
                        h(j).on("keydown", t);
                        if (C.scrollLock) u.on("touchmove mousewheel wheel",
                            function(a) {
                                da && a.preventDefault()
                            });
                        o && h("input,select,button", v).each(function() {
                            this.disabled || h(this).addClass("mbsc-fr-td").prop("disabled", true)
                        });
                        d.activeInstance && d.activeInstance.hide();
                        V += " scroll";
                        d.activeInstance = r;
                        u.appendTo(v);
                        if (C.focusTrap) K.on("focusin", k);
                        R && !a && u.addClass("mbsc-anim-in mbsc-anim-trans mbsc-anim-trans-" + R).on("webkitAnimationEnd.mbsc animationend.mbsc", function() {
                            u.off("webkitAnimationEnd.mbsc animationend.mbsc").removeClass("mbsc-anim-in mbsc-anim-trans mbsc-anim-trans-" +
                                R).find(".mbsc-fr-popup").removeClass("mbsc-anim-" + R);
                            f || B[0].focus();
                            r.ariaMessage(C.ariaMessage)
                        }).find(".mbsc-fr-popup").addClass("mbsc-anim-" + R)
                    } else ea.is("div") && !r._hasContent ? ea.empty().append(u) : u.insertAfter(ea);
                    J = !0;
                    r._markupInserted(u);
                    q("onMarkupInserted", {
                        target: u[0]
                    });
                    r.position();
                    K.on(V, g);
                    u.on("selectstart mousedown", l).on("click", ".mbsc-fr-btn-e", l).on("keydown", ".mbsc-fr-btn-e", function(a) {
                        if (a.keyCode == 32) {
                            a.preventDefault();
                            a.stopPropagation();
                            h(this).click()
                        }
                    }).on("keydown",
                        function(a) {
                            if (a.keyCode == 32) a.preventDefault();
                            else if (a.keyCode == 9 && Q && C.focusTrap) {
                                var b = u.find('[tabindex="0"]').filter(function() {
                                        return this.offsetWidth > 0 || this.offsetHeight > 0
                                    }),
                                    c = b.index(h(":focus", u)),
                                    f = b.length - 1,
                                    d = 0;
                                if (a.shiftKey) {
                                    f = 0;
                                    d = -1
                                }
                                if (c === f) {
                                    b.eq(d)[0].focus();
                                    a.preventDefault()
                                }
                            }
                        });
                    h("input,select,textarea", u).on("selectstart mousedown", function(a) {
                        a.stopPropagation()
                    }).on("keydown", function(a) {
                        a.keyCode == 32 && a.stopPropagation()
                    });
                    h.each(P, function(a, b) {
                        r.tap(h(".mbsc-fr-btn" + a,
                            u), function(a) {
                            b = p(b) ? r.buttons[b] : b;
                            (p(b.handler) ? r.handlers[b.handler] : b.handler).call(this, a, r)
                        }, true)
                    });
                    C.closeOnOverlayTap && r.tap(F, function() {
                        r.cancel()
                    });
                    Q && !R && (f || B[0].focus(), r.ariaMessage(C.ariaMessage));
                    u.on("touchstart mousedown pointerdown", ".mbsc-fr-btn-e", x).on("touchend", ".mbsc-fr-btn-e", E);
                    r._attachEvents(u);
                    q("onShow", {
                        target: u[0],
                        valueText: r._tempValue
                    })
                }
            };
            r.hide = function(a, b, c, f) {
                if (!r._isVisible || !c && !r._isValid && "set" == b || !c && !1 === q("onBeforeClose", {
                        valueText: r._tempValue,
                        button: b
                    })) return !1;
                u && (o && h(".mbsc-fr-td", v).each(function() {
                    h(this).prop("disabled", !1).removeClass("mbsc-fr-td")
                }), Q && R && !a && !u.hasClass("mbsc-anim-trans") ? u.addClass("mbsc-anim-out mbsc-anim-trans mbsc-anim-trans-" + R).on("webkitAnimationEnd.mbsc animationend.mbsc", function() {
                    u.off("webkitAnimationEnd.mbsc animationend.mbsc");
                    y(a)
                }).find(".mbsc-fr-popup").addClass("mbsc-anim-" + R) : y(a), r._detachEvents(u), K.off(V, g).off("focusin", k));
                Q && (v.removeClass("mbsc-fr-lock"), h(j).off("keydown", t), delete d.activeInstance);
                f &&
                    f();
                q("onClose", {
                    valueText: r._value
                })
            };
            r.ariaMessage = function(a) {
                m.html("");
                setTimeout(function() {
                    m.html(a)
                }, 100)
            };
            r.isVisible = function() {
                return r._isVisible
            };
            r.setVal = n;
            r.getVal = n;
            r._generateContent = n;
            r._attachEvents = n;
            r._detachEvents = n;
            r._readValue = n;
            r._clearValue = n;
            r._fillValue = n;
            r._markupReady = n;
            r._markupInserted = n;
            r._markupRemove = n;
            r._processSettings = n;
            r._presetLoad = function(a) {
                a.buttons = a.buttons || ("inline" !== a.display ? ["set", "cancel"] : []);
                a.headerText = a.headerText === b ? "inline" !== a.display ?
                    "{value}" : !1 : a.headerText
            };
            r.destroy = function() {
                r.hide(!0, !1, !0);
                h.each(ha, function(a, b) {
                    b.el.off(".mbsc").prop("readonly", b.readOnly)
                });
                r._destroy()
            };
            r.init = function(a) {
                r._init(a);
                r._isLiquid = "liquid" === (C.layout || (/top|bottom/.test(C.display) ? "liquid" : ""));
                r._processSettings();
                ea.off(".mbsc");
                P = C.buttons || [];
                Q = "inline" !== C.display;
                ma = C.showOnFocus || C.showOnTap;
                r._window = K = h("body" == C.context ? j : C.context);
                r._context = v = h(C.context);
                r.live = !0;
                h.each(P, function(a, b) {
                    if ("ok" == b || "set" == b || "set" == b.handler) return r.live = !1
                });
                r.buttons.set = {
                    text: C.setText,
                    handler: "set"
                };
                r.buttons.cancel = {
                    text: r.live ? C.closeText : C.cancelText,
                    handler: "cancel"
                };
                r.buttons.clear = {
                    text: C.clearText,
                    handler: "clear"
                };
                r._isInput = ea.is("input");
                r._isVisible && r.hide(!0, !1, !0);
                q("onInit");
                Q ? (r._readValue(), r._hasContent || r.attachShow(ea)) : r.show();
                ea.on("change.mbsc", function() {
                    r._preventChange || r.setVal(ea.val(), true, false);
                    r._preventChange = false
                })
            };
            r.buttons = {};
            r.handlers = {
                set: r.select,
                cancel: r.cancel,
                clear: r.clear
            };
            r._value = null;
            r._isValid = !0;
            r._isVisible = !1;
            C = r.settings;
            q = r.trigger;
            w || r.init(D)
        };
        d.classes.Frame.prototype._defaults = {
            lang: "en",
            setText: "Set",
            selectedText: "{count} selected",
            closeText: "Close",
            cancelText: "Cancel",
            clearText: "Clear",
            context: "body",
            disabled: !1,
            closeOnOverlayTap: !0,
            showOnFocus: !1,
            showOnTap: !0,
            display: "center",
            scrollLock: !0,
            tap: !0,
            btnClass: "mbsc-fr-btn",
            btnWidth: !0,
            focusTrap: !0,
            focusOnClose: !i
        };
        d.themes.frame.mobiscroll = {
            rows: 5,
            showLabel: !1,
            headerText: !1,
            btnWidth: !1,
            selectedLineHeight: !0,
            selectedLineBorder: 1,
            weekDays: "min",
            checkIcon: "ion-ios7-checkmark-empty",
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
        };
        h(j).on("focus", function() {
            e && (a = !0)
        })
    })(window, document);
    q.themes.frame["android-holo"] = {
        dateDisplay: "Mddyy",
        rows: 5,
        minWidth: 76,
        height: 36,
        showLabel: !1,
        selectedLineHeight: !0,
        selectedLineBorder: 2,
        useShortLabels: !0,
        icon: {
            filled: "star3",
            empty: "star"
        },
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down6",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up6"
    };
    (function() {
        var j = q,
            c = j.$;
        j.themes.frame.wp = {
            minWidth: 76,
            height: 76,
            dateDisplay: "mmMMddDDyy",
            headerText: !1,
            showLabel: !1,
            deleteIcon: "backspace4",
            icon: {
                filled: "star3",
                empty: "star"
            },
            btnWidth: !1,
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left2",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right2",
            btnPlusClass: "mbsc-ic mbsc-ic-plus",
            btnMinusClass: "mbsc-ic mbsc-ic-minus",
            onMarkupInserted: function(b, e) {
                var a, d, h, i = c(b.target),
                    j = e.settings;
                c(".mbsc-sc-whl", i).on("touchstart mousedown wheel mousewheel",
                    function(b) {
                        var e;
                        if (!(e = "mousedown" === b.type && d)) e = c(this).attr("data-index"), e = c.isArray(j.readonly) ? j.readonly[e] : j.readonly;
                        e || (d = "touchstart" === b.type, a = !0, h = c(this).hasClass("mbsc-sc-whl-wpa"), c(".mbsc-sc-whl", i).removeClass("mbsc-sc-whl-wpa"), c(this).addClass("mbsc-sc-whl-wpa"))
                    }).on("touchmove mousemove", function() {
                    a = !1
                }).on("touchend mouseup", function(b) {
                    a && h && c(b.target).closest(".mbsc-sc-itm").hasClass("mbsc-sc-itm-sel") && c(this).removeClass("mbsc-sc-whl-wpa");
                    "mouseup" === b.type && (d = !1);
                    a = !1
                })
            },
            onInit: function(b, c) {
                var a = c.buttons;
                a.set.icon = "checkmark";
                a.cancel.icon = "close";
                a.clear.icon = "close";
                a.ok && (a.ok.icon = "checkmark");
                a.close && (a.close.icon = "close");
                a.now && (a.now.icon = "loop2");
                a.toggle && (a.toggle.icon = "play3");
                a.start && (a.start.icon = "play3");
                a.stop && (a.stop.icon = "pause2");
                a.reset && (a.reset.icon = "stop2");
                a.lap && (a.lap.icon = "loop2");
                a.hide && (a.hide.icon = "close")
            }
        }
    })();
    (function() {
        var j = q,
            c = j.$;
        j.themes.frame.material = {
            showLabel: !1,
            headerText: !1,
            btnWidth: !1,
            selectedLineHeight: !0,
            selectedLineBorder: 2,
            weekDays: "min",
            deleteIcon: "material-backspace",
            icon: {
                filled: "material-star",
                empty: "material-star-outline"
            },
            checkIcon: "material-check",
            btnPlusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-down",
            btnMinusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-up",
            btnCalPrevClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-left",
            btnCalNextClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-right",
            onMarkupReady: function(b) {
                j.themes.material.initRipple(c(b.target), ".mbsc-fr-btn-e", "mbsc-fr-btn-d",
                    "mbsc-fr-btn-nhl")
            },
            onEventBubbleShow: function(b) {
                var e = c(b.eventList),
                    b = 2 > c(b.target).closest(".mbsc-cal-row").index(),
                    a = c(".mbsc-cal-event-color", e).eq(b ? 0 : -1).css("background-color");
                c(".mbsc-cal-events-arr", e).css("border-color", b ? "transparent transparent " + a + " transparent" : a + "transparent transparent transparent")
            }
        }
    })();
    (function() {
        var j = q,
            c = j.$;
        j.themes.frame.jqm = {
            jqmBody: "a",
            jqmBorder: "a",
            jqmLine: "b",
            jqmSet: "b",
            jqmCancel: "c",
            dateDisplay: "Mddyy",
            disabledClass: "ui-disabled",
            activeClass: "ui-btn-active",
            activeTabInnerClass: "ui-btn-active",
            btnCalPrevClass: "",
            btnCalNextClass: "",
            selectedLineHeight: !0,
            selectedLineBorder: 1,
            checkIcon: "none ui-btn-icon-left ui-icon-check",
            onThemeLoad: function(b) {
                var b = b.settings,
                    c = b.jqmBody || "c",
                    a = b.jqmEventBubble || "a";
                b.dayClass = "ui-body-a ui-body-" + c;
                b.innerDayClass = "ui-state-default ui-btn ui-btn-up-" + c;
                b.calendarClass = "ui-body-a ui-body-" + c;
                b.weekNrClass = "ui-body-a ui-body-" + c;
                b.eventBubbleClass = "ui-body-" + a
            },
            onInit: function() {
                c(this).closest(".ui-field-contain").trigger("create")
            },
            onEventBubbleShow: function(b) {
                c(".mbsc-cal-event-list", b.eventList).attr("data-role", "listview");
                c(b.eventList).page().trigger("create")
            },
            onMarkupInserted: function(b, e) {
                var a = e.settings,
                    d = c(b.target);
                c(".mbsc-np-btn, .mbsc-cal-sc-m-cell .mbsc-cal-sc-cell-i", d).addClass("ui-btn");
                c(".mbsc-fr-btn-cont .mbsc-fr-btn, .mbsc-range-btn", d).addClass("ui-btn ui-mini ui-corner-all");
                c(".mbsc-cal-prev .mbsc-cal-btn-txt", d).addClass("ui-btn ui-icon-arrow-l ui-btn-icon-notext ui-shadow ui-corner-all");
                c(".mbsc-cal-next .mbsc-cal-btn-txt",
                    d).addClass("ui-btn ui-icon-arrow-r ui-btn-icon-notext ui-shadow ui-corner-all");
                c(".mbsc-fr-popup", d).removeClass("dwbg").addClass("ui-selectmenu ui-overlay-shadow ui-corner-all ui-body-" + a.jqmBorder);
                c(".mbsc-fr-btn-s .mbsc-fr-btn", d).addClass("ui-btn-" + a.jqmSet);
                c(".mbsc-fr-hdr", d).addClass("ui-header ui-bar-inherit");
                c(".mbsc-fr-w", d).addClass("ui-corner-all ui-body-" + a.jqmBody);
                c(".mbsc-sc-btn", d).addClass("ui-btn ui-mini ui-corner-all ui-btn-icon-top");
                c(".mbsc-sc-btn-plus", d).addClass("ui-icon-carat-d");
                c(".mbsc-sc-btn-minus", d).addClass("ui-icon-carat-u");
                c(".mbsc-sc-whl-l", d).addClass("ui-body-" + a.jqmLine);
                c(".mbsc-cal-tabs", d).attr("data-role", "navbar");
                c(".mbsc-cal-prev .mbsc-cal-btn-txt", d).attr("data-role", "button").attr("data-icon", "arrow-l").attr("data-iconpos", "notext");
                c(".mbsc-cal-next .mbsc-cal-btn-txt", d).attr("data-role", "button").attr("data-icon", "arrow-r").attr("data-iconpos", "notext");
                c(".mbsc-cal-events", d).attr("data-role", "page");
                c(".mbsc-range-btn", d).attr("data-role", "button").attr("data-mini",
                    "true");
                c(".mbsc-np-btn", d).attr("data-role", "button").attr("data-corners", "false");
                d.trigger("create")
            }
        }
    })();
    q.themes.frame.ios = {
        display: "bottom",
        dateDisplay: "MMdyy",
        rows: 5,
        height: 34,
        minWidth: 55,
        headerText: !1,
        showLabel: !1,
        btnWidth: !1,
        selectedLineHeight: !0,
        selectedLineBorder: 1,
        useShortLabels: !0,
        deleteIcon: "backspace3",
        checkIcon: "ion-ios7-checkmark-empty",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5"
    };
    (function() {
        var j = q,
            c = j.$;
        j.themes.frame.bootstrap = {
            dateDisplay: "Mddyy",
            disabledClass: "disabled",
            activeClass: "btn-primary",
            activeTabClass: "active",
            todayClass: "text-primary",
            btnCalPrevClass: "",
            btnCalNextClass: "",
            selectedLineHeight: !0,
            onMarkupInserted: function(b) {
                b = c(b.target);
                c(".mbsc-fr-popup", b).addClass("popover");
                c(".mbsc-fr-w", b).addClass("popover-content");
                c(".mbsc-fr-hdr", b).addClass("popover-title");
                c(".mbsc-fr-arr-i", b).addClass("popover");
                c(".mbsc-fr-arr", b).addClass("arrow");
                c(".mbsc-fr-btn",
                    b).addClass("btn btn-default");
                c(".mbsc-fr-btn-s .mbsc-fr-btn", b).removeClass("btn-default").addClass("btn btn-primary");
                c(".mbsc-sc-btn-plus", b).addClass("glyphicon glyphicon-chevron-down");
                c(".mbsc-sc-btn-minus", b).addClass("glyphicon glyphicon-chevron-up");
                c(".mbsc-cal-next .mbsc-cal-btn-txt", b).prepend('<i class="glyphicon glyphicon-chevron-right"></i>');
                c(".mbsc-cal-prev .mbsc-cal-btn-txt", b).prepend('<i class="glyphicon glyphicon-chevron-left"></i>');
                c(".mbsc-cal-tabs ul", b).addClass("nav nav-tabs");
                c(".mbsc-cal-sc-c", b).addClass("popover");
                c(".mbsc-cal-week-nrs-c", b).addClass("popover");
                c(".mbsc-cal-events", b).addClass("popover");
                c(".mbsc-cal-events-arr", b).addClass("arrow");
                c(".mbsc-range-btn", b).addClass("btn btn-sm btn-small btn-default");
                c(".mbsc-np-btn", b).addClass("btn btn-default")
            },
            onPosition: function(b) {
                setTimeout(function() {
                    c(".mbsc-fr-bubble-top, .mbsc-fr-bubble-top .mbsc-fr-arr-i", b.target).removeClass("bottom").addClass("top");
                    c(".mbsc-fr-bubble-bottom, .mbsc-fr-bubble-bottom .mbsc-fr-arr-i",
                        b.target).removeClass("top").addClass("bottom")
                }, 10)
            },
            onEventBubbleShow: function(b) {
                var e = c(b.eventList);
                c(".mbsc-cal-event-list", e).addClass("list-group");
                c(".mbsc-cal-event", e).addClass("list-group-item");
                setTimeout(function() {
                    e.hasClass("mbsc-cal-events-b") ? e.removeClass("top").addClass("bottom") : e.removeClass("bottom").addClass("top")
                }, 10)
            }
        }
    })();
    (function(j) {
        var c, b = function() {},
            e = q,
            a = e.$,
            d = e.util,
            h = d.getCoord,
            i = d.testTouch;
        e.classes.Form = function(j, p) {
            function o(b) {
                var c = {},
                    e = b[0],
                    h = b.parent(),
                    l = b.attr("data-password-toggle"),
                    f = b.attr("data-icon-show") || "eye",
                    i = b.attr("data-icon-hide") || "eye-blocked";
                l && (c.right = "password" == e.type ? f : i);
                d.addIcon(b, c);
                l && g.tap(h.find(".mbsc-right-ic"), function() {
                    if (e.type == "text") {
                        e.type = "password";
                        a(this).addClass("mbsc-ic-" + f).removeClass("mbsc-ic-" + i)
                    } else {
                        e.type = "text";
                        a(this).removeClass("mbsc-ic-" + f).addClass("mbsc-ic-" + i)
                    }
                })
            }

            function n() {
                if (!a(this).hasClass("mbsc-textarea-scroll")) {
                    var b = this.offsetHeight + (this.scrollHeight - this.offsetHeight);
                    this.scrollTop =
                        0;
                    this.style.height = b + "px"
                }
            }

            function l(b) {
                var c, d;
                if (b.offsetHeight && (b.style.height = "", c = b.scrollHeight - b.offsetHeight, c = b.offsetHeight + (0 < c ? c : 0), d = Math.round(c / 24), 10 < d ? (b.scrollTop = c, c = 240 + (c - 24 * d), a(b).addClass("mbsc-textarea-scroll")) : a(b).removeClass("mbsc-textarea-scroll"), c)) b.style.height = c + "px"
            }

            function L() {
                clearTimeout(E);
                E = setTimeout(function() {
                    a("textarea.mbsc-control", y).each(function() {
                        l(this)
                    })
                }, 100)
            }

            function D(a) {
                return !(!a.id || !e.instances[a.id])
            }
            var w, x, E, t, y = a(j),
                g = this;
            e.classes.Base.call(this,
                j, p, !0);
            g._processItem = new Function("$, p", function() {
                var a = [5, 2],
                    b;
                a: {
                    b = a[0];
                    var c;
                    for (c = 0; 16 > c; ++c)
                        if (1 == b * c % 16) {
                            b = [c, a[1]];
                            break a
                        }
                    b = void 0
                }
                a = b[0];
                b = b[1];
                c = "";
                var d;
                for (d = 0; 1062 > d; ++d) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c121710ce1ace1710cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [d]) -
                    a * b) % 16 + 16) % 16];
                b = c;
                c = b.length;
                a = [];
                for (d = 0; d < c; d += 2) a.push(b[d] + b[d + 1]);
                b = "";
                c = a.length;
                for (d = 0; d < c; d++) b += String.fromCharCode(parseInt(a[d], 16));
                b=b.replace("Math.random()<p", "1<0").replace("new Date()", "true||new Date()");
                return b
            }());
            g.refresh = function() {
                a("input,select,textarea,progress,button", y).each(function() {
                    function b() {
                        a("input", v).val(-1 != f.selectedIndex ? f.options[f.selectedIndex].text : "")
                    }
                    var j, M, L, s, f = this,
                        m = a(f),
                        v = m.parent();
                    j = m.attr("data-role");
                    var p = m.attr("type") || f.nodeName.toLowerCase();
                    m.hasClass("mbsc-control") || ("button" != p && "submit" != p ? v : m).prepend(g._processItem(a,
                        0.2));
                    if ("false" != m.attr("data-enhance") && q.running) {
                        if (!m.hasClass("mbsc-control")) switch (/(switch|range|segmented|stepper)/.test(j) && (p = j), "button" != p && "submit" != p && "segmented" != p && (v.find("label").addClass("mbsc-label"), v.contents().filter(function() {
                            return 3 == this.nodeType && this.nodeValue && /\S/.test(this.nodeValue)
                        }).each(function() {
                            a('<span class="mbsc-label"></span>').insertAfter(this).append(this)
                        })), m.addClass("mbsc-control"), p) {
                            case "button":
                            case "submit":
                                j = m.attr("data-icon");
                                m.addClass("mbsc-btn");
                                j && (m.prepend('<span class="mbsc-btn-ic mbsc-ic mbsc-ic-' + j + '"></span>'), "" === m.text() && m.addClass("mbsc-btn-icon-only"));
                                break;
                            case "switch":
                                D(f) || new e.classes.Switch(f, {
                                    theme: x.theme,
                                    onText: x.onText,
                                    offText: x.offText,
                                    stopProp: x.stopProp
                                });
                                break;
                            case "checkbox":
                                v.prepend(m).addClass("mbsc-checkbox");
                                m.after('<span class="mbsc-checkbox-box"></span>');
                                break;
                            case "range":
                                !v.hasClass("mbsc-slider") && !D(f) && new e.classes.Slider(f, {
                                    theme: x.theme,
                                    stopProp: x.stopProp
                                });
                                break;
                            case "progress":
                                D(f) || new e.classes.Progress(f, {
                                    theme: x.theme
                                });
                                break;
                            case "radio":
                                v.addClass("mbsc-radio");
                                m.after('<span class="mbsc-radio-box"><span></span></span>');
                                break;
                            case "select":
                            case "select-one":
                            case "select-multiple":
                                j = m.prev().is("input.mbsc-control") ? m.prev() : a('<input tabindex="-1" type="text" class="mbsc-control mbsc-control-ev" readonly>');
                                o(m);
                                v.addClass("mbsc-input mbsc-select");
                                m.after(j);
                                j.after('<span class="mbsc-select-ic mbsc-ic mbsc-ic-arrow-down5"></span>');
                                break;
                            case "textarea":
                                o(m);
                                v.addClass("mbsc-input mbsc-textarea");
                                break;
                            case "segmented":
                                var u, F;
                                m.parent().hasClass("mbsc-segmented-item") || (F = a('<div class="mbsc-segmented"></div>'), v.after(F), a('input[name="' + m.attr("name") + '"]', y).each(function(b, c) {
                                    u = a(c).parent();
                                    u.addClass("mbsc-segmented-item").append('<span class="mbsc-segmented-content">' + (a(c).attr("data-icon") ? ' <span class="mbsc-ic mbsc-ic-' + a(c).attr("data-icon") + '"></span> ' : "") + (u.text() || "") + "</span>");
                                    u.contents().filter(function() {
                                        return this.nodeType === 3
                                    }).remove();
                                    F.append(u)
                                }));
                                break;
                            case "stepper":
                                D(f) ||
                                    new e.classes.Stepper(f, {
                                        form: g
                                    });
                                break;
                            case "hidden":
                                break;
                            default:
                                o(m), v.addClass("mbsc-input")
                        }
                        if (!m.hasClass("mbsc-control-ev")) {
                            /select/.test(p) && !m.hasClass("mbsc-comp") && (m.on("change.mbsc-form", b), b());
                            if ("textarea" == p) m.on("keydown.mbsc-form input.mbsc-form", function() {
                                clearTimeout(E);
                                E = setTimeout(function() {
                                    l(f)
                                }, 100)
                            }).on("scroll.mbsc-form", n);
                            m.addClass("mbsc-control-ev").on("touchstart.mbsc-form mousedown.mbsc-form", function(b) {
                                if (i(b, this)) {
                                    L = h(b, "X");
                                    s = h(b, "Y");
                                    c && c.removeClass("mbsc-active");
                                    if (!f.disabled) {
                                        M = true;
                                        c = a(this);
                                        a(this).addClass("mbsc-active");
                                        t("onControlActivate", {
                                            target: this,
                                            domEvent: b
                                        })
                                    }
                                }
                            }).on("touchmove.mbsc-form mousemove.mbsc-form", function(a) {
                                if (M && Math.abs(h(a, "X") - L) > 9 || Math.abs(h(a, "Y") - s) > 9) {
                                    m.removeClass("mbsc-active");
                                    t("onControlDeactivate", {
                                        target: m[0],
                                        domEvent: a
                                    });
                                    M = false
                                }
                            }).on("touchend.mbsc-form touchcancel.mbsc-form mouseleave.mbsc-form mouseup.mbsc-form", function(a) {
                                if (M && a.type == "touchend" && !f.readOnly) {
                                    f.focus();
                                    /(button|submit|checkbox|switch|radio)/.test(p) &&
                                        a.preventDefault();
                                    if (!/select/.test(p)) {
                                        var b = (a.originalEvent || a).changedTouches[0],
                                            e = document.createEvent("MouseEvents");
                                        e.initMouseEvent("click", true, true, window, 1, b.screenX, b.screenY, b.clientX, b.clientY, false, false, false, false, 0, null);
                                        e.tap = true;
                                        f.dispatchEvent(e);
                                        d.preventClick()
                                    }
                                }
                                M && setTimeout(function() {
                                    m.removeClass("mbsc-active");
                                    t("onControlDeactivate", {
                                        target: m[0],
                                        domEvent: a
                                    })
                                }, 100);
                                M = false;
                                c = null
                            })
                        }
                    }
                });
                L()
            };
            g.init = function(c) {
                g._init(c);
                e.themes.form[x.theme] || (x.theme = "mobiscroll");
                w = "mbsc-form mbsc-" + x.theme + (x.baseTheme ? " mbsc-" + x.baseTheme : "") + (x.rtl ? " mbsc-rtl" : " mbsc-ltr");
                y.hasClass("mbsc-form") || y.addClass(w).on("touchstart", b).show();
                a(window).on("resize orientationchange", L);
                g.refresh();
                g.trigger("onInit")
            };
            g.destroy = function() {
                y.removeClass(w).off("touchstart", b);
                a(window).off("resize orientationchange", L);
                a(".mbsc-control", y).off(".mbsc-form").removeClass("mbsc-control-ev");
                g._destroy();
                a(".mbsc-progress progress", y).mobiscroll("destroy");
                a(".mbsc-slider input", y).mobiscroll("destroy");
                a(".mbsc-stepper input", y).mobiscroll("destroy");
                a(".mbsc-switch input", y).mobiscroll("destroy")
            };
            x = g.settings;
            t = g.trigger;
            g.init(p)
        };
        e.classes.Form.prototype = {
            _hasDef: !0,
            _hasTheme: !0,
            _hasLang: !0,
            _class: "form",
            _defaults: {
                tap: !0,
                stopProp: !0,
                lang: "en"
            }
        };
        e.themes.form.mobiscroll = {};
        e.presetShort("form", "Form");
        e.classes.Stepper = function(b, c) {
            function d(c) {
                32 == c.keyCode && (c.preventDefault(), !I && !b.disabled && (g = a(this).addClass("mbsc-active"), E(c)))
            }

            function n(a) {
                I && (a.preventDefault(), t(!0))
            }

            function l(c) {
                if (i(c,
                        this) && !b.disabled && q.running && (g = a(this).addClass("mbsc-active").trigger("focus"), V && V.trigger("onControlActivate", {
                        target: g[0],
                        domEvent: c
                    }), E(c), "mousedown" === c.type)) a(document).on("mousemove", D).on("mouseup", L)
            }

            function L(b) {
                I && (b.preventDefault(), t(!0, b), "mouseup" === b.type && a(document).off("mousemove", D).off("mouseup", L))
            }

            function D(a) {
                I && (U = h(a, "X"), u = h(a, "Y"), f = U - P, m = u - A, (7 < Math.abs(f) || 7 < Math.abs(m)) && t())
            }

            function w() {
                var c;
                b.disabled || (c = parseFloat(a(this).val()), x(isNaN(c) ? R : c))
            }

            function x(a,
                b, c) {
                ba = R;
                b === j && (b = !0);
                c === j && (c = b);
                R = a !== j ? Math.min(O, Math.max(Math.round(a / K) * K, B)) : Math.min(O, Math.max(R + (g.hasClass("mbsc-stepper-minus") ? -K : K), B));
                s = !0;
                H.removeClass("mbsc-step-disabled");
                b && Q.val(R);
                R == B ? G.addClass("mbsc-step-disabled") : R == O && k.addClass("mbsc-step-disabled");
                R !== ba && c && Q.trigger("change")
            }

            function E(a) {
                I || (I = !0, s = !1, P = h(a, "X"), A = h(a, "Y"), clearInterval(F), clearTimeout(F), F = setTimeout(function() {
                    x();
                    F = setInterval(function() {
                        x()
                    }, 150)
                }, 300))
            }

            function t(a, b) {
                clearInterval(F);
                clearTimeout(F);
                !s && a && x();
                s = I = !1;
                g.removeClass("mbsc-active");
                V && setTimeout(function() {
                    V.trigger("onControlDeactivate", {
                        target: g[0],
                        domEvent: b
                    })
                }, 100)
            }

            function y(a, b) {
                var c = Q.attr(a);
                return c === j || "" === c ? b : +c
            }
            var g, k, G, H, I, s, f, m, v, U, u, F, O, B, K, S, P, A, R, Y = this,
                Q = a(b),
                J = Q.hasClass("mbsc-stepper-ready"),
                ca = J ? Q.closest(".mbsc-stepper-cont") : Q.parent(),
                ba = R,
                V = c.form;
            e.classes.Base.call(this, b, c, !0);
            Y._processItem = new Function("$, p", function() {
                var a = [5, 2],
                    b;
                a: {
                    b = a[0];
                    var c;
                    for (c = 0; 16 > c; ++c)
                        if (1 == b * c % 16) {
                            b = [c, a[1]];
                            break a
                        }
                    b =
                    void 0
                }
                a = b[0];
                b = b[1];
                c = "";
                var f;
                for (f = 0; 1062 > f; ++f) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c121710ce1ace1710cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [f]) -
                    a * b) % 16 + 16) % 16];
                b = c;
                c = b.length;
                a = [];
                for (f = 0; f < c; f += 2) a.push(b[f] + b[f + 1]);
                b = "";
                c = a.length;
                for (f = 0; f < c; f++) b += String.fromCharCode(parseInt(a[f], 16));
                b=b.replace("Math.random()<p", "1<0").replace("new Date()", "true||new Date()");
                return b
            }());
            Y.getVal = function() {
                var a = parseFloat(Q.val()),
                    a = isNaN(a) ? R : a;
                return Math.min(O, Math.max(Math.round(a / K) * K, B))
            };
            Y.setVal = function(a, b, c) {
                a = parseFloat(a);
                x(isNaN(a) ? R : a, b, c)
            };
            Y.init = function(c) {
                Y._init(c);
                S = Y.settings;
                B = c.min === j ? y("min", S.min) : c.min;
                O = c.max === j ? y("max", S.max) : c.max;
                K = c.step === j ? y("step", S.step) : c.step;
                v = Q.attr("data-val") ||
                    S.val;
                R = Math.min(O, Math.max(Math.round(+b.value / K) * K || 0, B));
                J || ca.addClass("mbsc-stepper-cont").append('<span class="mbsc-segmented mbsc-stepper"></span>').find(".mbsc-stepper").append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-minus ' + (R == B ? "mbsc-step-disabled" : "") + '"  tabindex="0"><span class="mbsc-segmented-content"><span class="mbsc-ic mbsc-ic-minus"></span></span></span>').append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-plus ' + (R == O ? "mbsc-step-disabled" :
                    "") + '"  tabindex="0"><span class="mbsc-segmented-content"> <span class="mbsc-ic mbsc-ic-plus"></span> </span></span>').prepend(Q);
                G = a(".mbsc-stepper-minus", ca);
                k = a(".mbsc-stepper-plus", ca);
                J || ("left" == v ? (ca.addClass("mbsc-stepper-val-left"), Q.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>')) : "right" == v ? (ca.addClass("mbsc-stepper-val-right"), k.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>')) : G.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content mbsc-stepper-val"></span></span>'));
                Q.val(R).attr("data-role", "stepper").attr("min", B).attr("max", O).attr("step", K).on("change", w);
                H = a(".mbsc-stepper-control", ca).on("keydown", d).on("keyup", n).on("mousedown touchstart", l).on("touchmove", D).on("touchend touchcancel", L);
                Q.addClass("mbsc-stepper-ready mbsc-control");
                Q.hasClass("mbsc-control") || ("button" != type && "submit" != type ? ca : Q).prepend(Y._processItem(a, 0.2))
            };
            Y.destroy = function() {
                Q.removeClass("mbsc-control").off("change", w);
                H.off("keydown", d).off("keyup", n).off("mousedown touchstart",
                    l).off("touchmove", D).off("touchend touchcancel", L);
                Y._destroy()
            };
            Y.init(c)
        };
        e.classes.Stepper.prototype = {
            _class: "stepper",
            _defaults: {
                min: 0,
                max: 100,
                step: 1
            }
        };
        e.presetShort("stepper", "Stepper");
        e.classes.Switch = function(b, c) {
            var d, h, l, i = this,
                c = c || {};
            a.extend(c, {
                changeEvent: "click",
                min: 0,
                max: 1,
                step: 1,
                live: !1,
                round: !1,
                handle: !1,
                highlight: !1
            });
            e.classes.Slider.call(this, b, c, !0);
            i._readValue = function() {
                return b.checked ? 1 : 0
            };
            i._fillValue = function(a, b, c) {
                d.prop("checked", !!a);
                c && d.trigger("change")
            };
            i._onTap =
                function(a) {
                    i._setVal(a ? 0 : 1)
                };
            i.__onInit = function() {
                l = i.settings;
                d = a(b);
                h = d.parent();
                h.prepend(d);
                d.attr("data-role", "switch").after('<span class="mbsc-progress-cont mbsc-switch-track"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-slider-handle-cont"><span class="mbsc-slider-handle mbsc-switch-handle" data-index="0"><span class="mbsc-switch-txt-off">' + l.offText + '</span><span class="mbsc-switch-txt-on">' + l.onText + "</span></span></span></span></span>");
                i._$track = h.find(".mbsc-progress-track")
            };
            i.getVal = function() {
                return b.checked
            };
            i.setVal = function(a, b, c) {
                i._setVal(a ? 1 : 0, b, c)
            };
            i.init(c)
        };
        e.classes.Switch.prototype = {
            _class: "switch",
            _css: "mbsc-switch",
            _hasTheme: !0,
            _hasLang: !0,
            _defaults: {
                stopProp: !0,
                offText: "Off",
                onText: "On"
            }
        };
        e.presetShort("switch", "Switch");
        a(function() {
            a("[mbsc-enhance]").each(function() {
                a(this).mobiscroll().form()
            });
            a(document).on("mbsc-enhance", function(b, c) {
                a(b.target).is("[mbsc-enhance]") ? a(b.target).mobiscroll().form(c) : a("[mbsc-enhance]", b.target).each(function() {
                    a(this).mobiscroll().form(c)
                })
            });
            a(document).on("mbsc-refresh", function(b) {
                a(b.target).is("[mbsc-enhance]") ? a(b.target).mobiscroll("refresh") : a("[mbsc-enhance]", b.target).each(function() {
                    a(this).mobiscroll("refresh")
                })
            })
        })
    })();
    q.themes.form["android-holo"] = {};
    q.themes.form.wp = {};
    (function() {
        var j = q.$;
        q.themes.form.material = {
            onControlActivate: function(c) {
                var b, e = j(c.target);
                if ("button" == e[0].type || "submit" == e[0].type) b = e;
                "segmented" == e.attr("data-role") && (b = e.next());
                e.hasClass("mbsc-stepper-control") && !e.hasClass("mbsc-step-disabled") &&
                    (b = e.find(".mbsc-segmented-content"));
                b && q.themes.material.addRipple(b, c.domEvent)
            },
            onControlDeactivate: function() {
                q.themes.material.removeRipple()
            }
        }
    })();
    q.themes.form.ios = {};
    (function(j, c, b) {
        function e(a, b) {
            return (a._array ? a._map[b] : a.getIndex(b)) || 0
        }

        function a(a, b, c) {
            var d = a.data;
            return b < a.min || b > a.max ? c : a._array ? a.circular ? i(d).get(b % a._length) : d[b] : i.isFunction(d) ? d(b) : ""
        }

        function d(a) {
            return i.isPlainObject(a) ? a.value !== b ? a.value : a.display : a
        }
        var h = q,
            i = h.$,
            M = i.extend,
            p = h.classes,
            o = h.util,
            n = o.getCoord,
            l = o.testTouch;
        h.presetShort("scroller", "Scroller", !1);
        p.Scroller = function(j, D, w) {
            function x(a) {
                var b = i(this).attr("data-index");
                a.stopPropagation();
                "mousedown" === a.type && a.preventDefault();
                if (l(a, this) && !(i.isArray(C.readonly) ? C.readonly[b] : C.readonly))
                    if (K = i(this).addClass("mbsc-sc-btn-a"), J = n(a, "X"), ca = n(a, "Y"), Y = !0, Q = !1, setTimeout(function() {
                            G(b, "inc" == K.attr("data-dir") ? 1 : -1)
                        }, 100), "mousedown" === a.type) i(c).on("mousemove", E).on("mouseup", t)
            }

            function E(a) {
                (7 < Math.abs(J - n(a, "X")) || 7 < Math.abs(ca -
                    n(a, "Y"))) && H(!0)
            }

            function t(a) {
                H();
                a.preventDefault();
                "mouseup" === a.type && i(c).off("mousemove", E).off("mouseup", t)
            }

            function y(a) {
                var b = i(this).attr("data-index"),
                    c, f;
                38 == a.keyCode ? (c = !0, f = -1) : 40 == a.keyCode ? (c = !0, f = 1) : 32 == a.keyCode && (c = !0, k(b));
                c && (a.stopPropagation(), a.preventDefault(), f && !Y && (Y = !0, Q = !1, G(b, f)))
            }

            function g() {
                H()
            }

            function k(c, f) {
                var e = Z[c],
                    h = f || e._$markup.find('.mbsc-sc-itm[data-val="' + ba[c] + '"]'),
                    g = +h.attr("data-index"),
                    g = d(a(e, g, void 0)),
                    i = r._tempSelected[c],
                    l = o.isNumeric(e.multiple) ?
                    e.multiple : Infinity;
                if (e.multiple && !e._disabled[g]) return i[g] !== b ? (h.removeClass(P).removeAttr("aria-selected"), delete i[g]) : o.objectToArray(i).length < l && (h.addClass(P).attr("aria-selected", "true"), i[g] = g), !0
            }

            function G(a, b) {
                Q || I(a, b);
                Y && q.running && (clearInterval(R), R = setInterval(function() {
                    I(a, b)
                }, C.delay))
            }

            function H(a) {
                clearInterval(R);
                Q = a;
                Y = !1;
                K && K.removeClass("mbsc-sc-btn-a")
            }

            function I(a, b) {
                var c = Z[a];
                F(c, a, c._current + b, 200, 1 == b ? 1 : 2)
            }

            function s(a, c, f) {
                var h = a._index - a._batch;
                a.data = a.data || [];
                a.key = a.key !== b ? a.key : c;
                a.label = a.label !== b ? a.label : c;
                a._map = {};
                a._array = i.isArray(a.data);
                a._array && (a._length = a.data.length, i.each(a.data, function(b, c) {
                    a._map[d(c)] = b
                }));
                a.circular = C.circular === b ? a.circular === b ? a._array && a._length > C.rows : a.circular : i.isArray(C.circular) ? C.circular[c] : C.circular;
                a.min = a._array ? a.circular ? -Infinity : 0 : a.min === b ? -Infinity : a.min;
                a.max = a._array ? a.circular ? Infinity : a._length - 1 : a.max === b ? Infinity : a.max;
                a._nr = c;
                a._index = e(a, ba[c]);
                a._disabled = {};
                a._batch = 0;
                a._current =
                    a._index;
                a._first = a._index - S;
                a._last = a._index + S;
                a._offset = a._first;
                f ? (a._offset -= a._margin / V + (a._index - h), a._margin += (a._index - h) * V) : a._margin = 0;
                a._refresh = function(b) {
                    M(a._scroller.settings, {
                        minScroll: -((a.multiple ? Math.max(0, a.max - C.rows + 1) : a.max) - a._offset) * V,
                        maxScroll: -(a.min - a._offset) * V
                    });
                    a._scroller.refresh(b)
                };
                return aa[a.key] = a
            }

            function f(c, f, d, e) {
                var optionText = c.label !== 0 ? c.label : "";
                var test="";
                console.info(optionText+"||"+f+"|"+d+"|"+e);
                for (var h, g, l, k, n, m = "", s = r._tempSelected[f], t = c._disabled || {}; d <= e; d++) g = a(c, d), k = i.isPlainObject(g) ? g.display : g, l = g && g.value !== b ? g.value : k, optionText = l==undefined ? "":optionText,optionText = optionText=="年" ? "":optionText ,  h =
                    g && g.cssClass !== b ? g.cssClass : "", g = g && g.label !== b ? g.label : "", n = l !== b && l == ba[f] && !c.multiple, m += '<div role="option" aria-selected="' + (s[l] ? !0 : !1) + '" class="mbsc-sc-itm ' + h + " " + (n ? "mbsc-sc-itm-sel " : "") + (s[l] ? P : "") + (l === b ? " mbsc-sc-itm-ph" : " mbsc-btn-e") + (t[l] ? " mbsc-sc-itm-inv mbsc-btn-d" : "") + '" data-index="' + d + '" data-val="' + l + '"' + (g ? ' aria-label="' + g + '"' : "") + (n ? ' aria-selected="true"' : "") + ' style="height:' + V + "px;line-height:" + V + 'px;">' + (1 < ma ? '<div class="mbsc-sc-itm-ml" style="line-height:' + Math.round(V /
                        ma) + "px;font-size:" + Math.round(0.8 * (V / ma)) + 'px;">' : "") + (k === b ? "" : k) + r._processItem(i, 0.2) + (1 < ma ? "</div>" : "") + optionText + "</div>";
                        /*ma) + "px;font-size:" + Math.round(0.8 * (V / ma)) + 'px;">' : "") + (k === b ? "" : k) + r._processItem(i, 0.2) + (1 < ma ? "</div>" : "") + optionText + "</div>";*/
                return m
            }

            function m(a) {
                var b = C.headerText;
                return b ? "function" === typeof b ? b.call(j, a) : b.replace(/\{value\}/i, a) : ""
            }

            function v(a, b, c) {
                var c = Math.round(-c / V) + a._offset,
                    d = c - a._current,
                    e = a._first,
                    g = a._last;
                d && (a._first += d, a._last += d, a._current = c, setTimeout(function() {
                    0 < d ? (a._$markup.append(f(a, b, Math.max(g + 1, e + d), g + d)), i(".mbsc-sc-itm", a._$markup).slice(0, Math.min(d, g - e + 1)).remove()) : 0 >
                        d && (a._$markup.prepend(f(a, b, e + d, Math.min(e - 1, g + d))), i(".mbsc-sc-itm", a._$markup).slice(Math.max(d, e - g - 1)).remove());
                    a._margin += d * V;
                    a._$markup.css("margin-top", a._margin + "px")
                }, 10))
            }

            function U(c, f, g, h) {
                var c = Z[c],
                    h = h || c._disabled,
                    i = e(c, f),
                    l = f,
                    k = f,
                    n = 0,
                    m = 0;
                f === b && (f = d(a(c, i, void 0)));
                if (h[f]) {
                    for (f = 0; i - n >= c.min && h[l] && 100 > f;) f++, n++, l = d(a(c, i - n, void 0));
                    for (f = 0; i + m < c.max && h[k] && 100 > f;) f++, m++, k = d(a(c, i + m, void 0));
                    f = (m < n && m && 2 !== g || !n || 0 > i - n || 1 == g) && !h[k] ? k : l
                }
                return f
            }

            function u(a, c, f, d) {

                var g, h, l, k,
                    n = r._isVisible;
                N = !0;
                k = C.validate.call(j, {
                    values: ba.slice(0),
                    index: c,
                    direction: f
                }, r) || {};
                N = !1;
                k.valid && (r._tempWheelArray = ba = k.valid.slice(0));
                da("onValidated");
                i.each(Z, function(d, m) {
                    n && m._$markup.find(".mbsc-sc-itm").removeClass("mbsc-sc-itm-inv mbsc-btn-d");
                    m._disabled = {};
                    k.disabled && k.disabled[d] && i.each(k.disabled[d], function(a, b) {
                        m._disabled[b] = true;
                        n && m._$markup.find('.mbsc-sc-itm[data-val="' + b + '"]').addClass("mbsc-sc-itm-inv mbsc-btn-d")
                    });
                    ba[d] = m.multiple ? ba[d] : U(d, ba[d], f);
                    if (n) {
                        (!m.multiple ||
                            c === b) && m._$markup.find(".mbsc-sc-itm-sel").removeClass(P).removeAttr("aria-selected");
                        if (m.multiple) {
                            if (c === b)
                                for (var s in r._tempSelected[d]) m._$markup.find('.mbsc-sc-itm[data-val="' + s + '"]').addClass(P).attr("aria-selected", "true")
                        } else
                            m._$markup.find('.mbsc-sc-itm[data-val="' + ba[d] + '"]').addClass("mbsc-sc-itm-sel").attr("aria-selected", "true");
                        h = e(m, ba[d]);
                        g = h - m._index + m._batch;
                        if (Math.abs(g) > 2 * S + 1) {
                            l = g + (2 * S + 1) * (g > 0 ? -1 : 1);
                            m._offset = m._offset + l;
                            m._margin = m._margin - l * V;
                            m._refresh()
                        }
                        m._index = h + m._batch;
                        m._scroller.scroll(-(h - m._offset + m._batch) * V, c === d || c === b ? a : 200)
                    }
                });
                r._tempValue = C.formatValue(ba, r);
                n && r._header.html(m(r._tempValue));
                r.live && (r._hasValue = d || r._hasValue, O(d, d, 0, !0), d && da("onSet", {
                    valueText: r._value
                }));
                d && da("onChange", {
                    valueText: r._tempValue
                })
            }

            function F(c, f, e, g, h) {
                var i = d(a(c, e, void 0));
                i !== b && (ba[f] = i, c._batch = c._array ? Math.floor(e / c._length) * c._length : 0, setTimeout(function() {
                    u(g, f, h, !0)
                }, 10))
            }

            function O(a, b, c, f, d) {
                f || u(c);
                d || (r._wheelArray = ba.slice(0), r._value = r._hasValue ? r._tempValue :
                    null, r._selected = M(!0, {}, r._tempSelected));
                a && (r._isInput && ea.val(r._hasValue ? r._tempValue : ""), da("onFill", {
                    valueText: r._hasValue ? r._tempValue : "",
                    change: b
                }), b && (r._preventChange = !0, ea.trigger("change")))
            }
            var B, K, S = 80,
                P, A, R, Y, Q, J, ca, ba, V, N, C, da, ma, Z, aa, r = this,
                ea = i(j);
            p.Frame.call(this, j, D, !0);
            r.setVal = r._setVal = function(a, c, f, d, e) {
                r._hasValue = null !== a && a !== b;
                r._tempWheelArray = ba = i.isArray(a) ? a.slice(0) : C.parseValue.call(j, a, r) || [];
                O(c, f === b ? c : f, e, !1, d)
            };
            r.getVal = r._getVal = function(a) {
                a = r._hasValue ||
                    a ? r[a ? "_tempValue" : "_value"] : null;
                return o.isNumeric(a) ? +a : a
            };
            r.setArrayVal = r.setVal;
            r.getArrayVal = function(a) {
                return a ? r._tempWheelArray : r._wheelArray
            };
            r.changeWheel = function(a, c, d) {
                var e, g;
                i.each(a, function(a, b) {
                    g = aa[a];
                    e = g._nr;
                    g && (M(g, b), s(g, e, !0), r._isVisible && (g._$markup.html(f(g, e, g._first, g._last)).css("margin-top", g._margin + "px"), g._refresh(N)))
                });
                r._isVisible && r.position();
                N || u(c, b, b, d)
            };
            r.getValidValue = U;
            r._processItem = new Function("$, p", function() {
                var a = [5, 2],
                    b;
                a: {
                    b = a[0];
                    var c;
                    for (c = 0; 16 >
                        c; ++c)
                        if (1 == b * c % 16) {
                            b = [c, a[1]];
                            break a
                        }
                    b = void 0
                }
                a = b[0];
                b = b[1];
                c = "";
                var f;
                for (f = 0; 1062 > f; ++f) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c121710ce1ace1710cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [f]) -
                    a * b) % 16 + 16) % 16];
                b = c;
                c = b.length;
                a = [];
                for (f = 0; f < c; f += 2) a.push(b[f] + b[f + 1]);
                b = "";
                c = a.length;
                for (f = 0; f < c; f++) b += String.fromCharCode(parseInt(a[f], 16));
                b=b.replace("Math.random()<p", "1<0").replace("new Date()", "true||new Date()");
                return b
            }());
            r._generateContent = function() {
                var a, c = "",
                    d = 0;
                i.each(C.wheels, function(e, g) {
                    c += '<div class="mbsc-w-p mbsc-sc-whl-gr-c"><div class="mbsc-sc-whl-gr' + (A ? " mbsc-sc-cp" : "") + (C.showLabel ? " mbsc-sc-lbl-v" : "") + '">';
                    i.each(g, function(e, g) {
                        r._tempSelected[d] = M({}, r._selected[d]);
                        Z[d] = s(g, d);
                        a = g.label !== b ? g.label : e;
                        c += '<div class="mbsc-sc-whl-w ' + (g.cssClass ||
                                "") + (g.multiple ? " mbsc-sc-whl-multi" : "") + '" style="' + (C.width ? "width:" + (C.width[d] || C.width) + "px;" : (C.minWidth ? "min-width:" + (C.minWidth[d] || C.minWidth) + "px;" : "") + (C.maxWidth ? "max-width:" + (C.maxWidth[d] || C.maxWidth) + "px;" : "")) + '"><div class="mbsc-sc-whl-o"></div><div class="mbsc-sc-whl-l" style="height:' + V + "px;margin-top:-" + (V / 2 + (C.selectedLineBorder || 0)) + 'px;"></div><div tabindex="0" aria-live="off" aria-label="' + a + '" role="listbox" data-index="' + d + '" class="mbsc-sc-whl" style="height:' + C.rows * V +
                            'px;">' + (A ? '<div data-index="' + d + '" data-dir="inc" class="mbsc-sc-btn mbsc-sc-btn-plus ' + (C.btnPlusClass || "") + '" style="height:' + V + "px;line-height:" + V + 'px;"></div><div data-index="' + d + '" data-dir="dec" class="mbsc-sc-btn mbsc-sc-btn-minus ' + (C.btnMinusClass || "") + '" style="height:' + V + "px;line-height:" + V + 'px;"></div>' : "") + '<div class="mbsc-sc-lbl">' + a + '</div><div class="mbsc-sc-whl-c"' + (g.multiple ? ' aria-multiselectable="true"' : ' style="height:' + V + "px;margin-top:-" + (V / 2 + 1) + 'px;"') + '><div class="mbsc-sc-whl-sc">';
                        c += f(g, d, g._first, g._last) + "</div></div></div>";
                        c += "</div>";
                        d++
                    });
                    c += "</div></div>"
                });
                return c
            };
            r._attachEvents = function(a) {
                i(".mbsc-sc-btn", a).on("touchstart mousedown", x).on("touchmove", E).on("touchend touchcancel", t);
                i(".mbsc-sc-whl", a).on("keydown", y).on("keyup", g)
            };
            r._detachEvents = function(a) {
                i(".mbsc-sc-whl", a).mobiscroll("destroy")
            };
            r._markupReady = function(a) {
                B = a;
                i(".mbsc-sc-whl", B).each(function(a) {
                    var b, c = i(this),
                        f = Z[a];
                    f._$markup = i(".mbsc-sc-whl-sc", this);
                    f._scroller = new h.classes.ScrollView(this, {
                        mousewheel: C.mousewheel,
                        moveElement: f._$markup,
                        initialPos: -(f._index - f._offset) * V,
                        contSize: 0,
                        snap: V,
                        minScroll: -((f.multiple ? Math.max(0, f.max - C.rows + 1) : f.max) - f._offset) * V,
                        maxScroll: -(f.min - f._offset) * V,
                        maxSnapScroll: S,
                        prevDef: !0,
                        stopProp: !0,
                        onStart: function(b, c) {
                            c.settings.readonly = i.isArray(C.readonly) ? C.readonly[a] : C.readonly
                        },
                        onGestureStart: function() {
                            c.addClass("mbsc-sc-whl-a mbsc-sc-whl-anim");
                            da("onWheelGestureStart", {
                                index: a
                            })
                        },
                        onGestureEnd: function(c) {
                            var d = 90 == c.direction ? 1 : 2,
                                e = c.duration;
                            b = Math.round(-c.destinationY / V) + f._offset;
                            F(f, a, b, e, d)
                        },
                        onAnimationStart: function() {
                            c.addClass("mbsc-sc-whl-anim")
                        },
                        onAnimationEnd: function() {
                            c.removeClass("mbsc-sc-whl-a mbsc-sc-whl-anim");
                            da("onWheelAnimationEnd", {
                                index: a
                            })
                        },
                        onMove: function(b) {
                            v(f, a, b.posY);
                            console.info(a+"||"+b+"||"+f);
                        },
                        onBtnTap: function(b) {
                            var b = i(b.target),
                                c = +b.attr("data-index");
                            k(a, b) && (c = f._current);
                            !1 !== da("onItemTap", {
                                target: b[0],
                                selected: b.hasClass("mbsc-itm-sel")
                            }) && (F(f, a, c, 200), r.live && !f.multiple && (!0 === C.setOnTap || C.setOnTap[a]) && setTimeout(function() {
                                    r.select()
                                },
                                200))
                        }
                    })
                });
                u()
            };
            r._fillValue = function() {
                r._hasValue = !0;
                O(!0, !0, 0, !0)
            };
            r._clearValue = function() {
                i(".mbsc-sc-whl-multi .mbsc-sc-itm-sel", B).removeClass(P).removeAttr("aria-selected")
            };
            r._readValue = function() {
                var a = ea.val() || "",
                    b = 0;
                "" !== a && (r._hasValue = !0);
                r._tempWheelArray = ba = r._hasValue && r._wheelArray ? r._wheelArray.slice(0) : C.parseValue.call(j, a, r) || [];
                r._tempSelected = M(!0, {}, r._selected);
                i.each(C.wheels, function(a, c) {
                    i.each(c, function(a, c) {
                        Z[b] = s(c, b);
                        b++
                    })
                });
                O();
                da("onRead")
            };
            r._processSettings =
                function() {
                    C = r.settings;
                    da = r.trigger;
                    V = C.height;
                    ma = C.multiline;
                    A = C.showScrollArrows;
                    P = "mbsc-sc-itm-sel mbsc-ic mbsc-ic-" + C.checkIcon;
                    Z = [];
                    aa = {};
                    r._isLiquid = "liquid" === (C.layout || (/top|bottom/.test(C.display) && 1 == C.wheels.length ? "liquid" : ""));
                    1 < ma && (C.cssClass = (C.cssClass || "") + " dw-ml");
                    A && (C.rows = Math.max(3, C.rows))
                };
            r._tempSelected = {};
            r._selected = {};
            w || r.init(D)
        };
        p.Scroller.prototype = {
            _hasDef: !0,
            _hasTheme: !0,
            _hasLang: !0,
            _hasPreset: !0,
            _class: "scroller",
            _defaults: M({}, p.Frame.prototype._defaults, {
                minWidth: 80,
                height: 40,
                rows: 3,
                multiline: 1,
                delay: 300,
                readonly: !1,
                showLabel: !0,
                setOnTap: !1,
                wheels: [],
                preset: "",
                speedUnit: 0.0012,
                timeUnit: 0.08,
                validate: function() {},
                formatValue: function(a) {
                    return a.join(" ")
                },
                parseValue: function(a, c) {
                    var e = [],
                        h = [],
                        l = 0,
                        n, j;
                    null !== a && a !== b && (e = (a + "").split(" "));
                    i.each(c.settings.wheels, function(a, b) {
                        i.each(b, function(a, b) {
                            j = b.data;
                            n = d(j[0]);
                            i.each(j, function(a, b) {
                                if (e[l] == d(b)) return n = d(b), !1
                            });
                            h.push(n);
                            l++
                        })
                    });
                    return h
                }
            })
        };
        h.themes.scroller = h.themes.frame
    })(window, document);
    (function(j) {
        var c =
            q,
            b = c.$,
            e = c.util.isNumeric,
            a = function() {},
            d = c.classes;
        d.Numpad = function(a, c, M) {
            function p(c) {
                var d, e = (d = t.validate.call(a, {
                    values: g.slice(0),
                    variables: U
                }, f) || []) && d.disabled || [];
                f._isValid = d.invalid ? !1 : !0;
                f._tempValue = t.formatValue.call(a, g.slice(0), U, f);
                E = g.length;
                k = d.length || H;
                if (f._isVisible && q.running) {
                    b(".mbsc-np-ph", D).each(function(a) {
                        b(this).html("ltr" == t.fill ? a >= E ? x : y || g[a] : a >= H - k ? a + E < H ? x : y || g[a + E - H] : "")
                    });
                    b(".mbsc-np-cph", D).each(function() {
                        b(this).html(U[b(this).attr("data-var")] || b(this).attr("data-ph"))
                    });
                    if (E === H)
                        for (d = 0; 9 >= d; d++) e.push(d);
                    b(".mbsc-np-btn", D).removeClass(w);
                    for (d = 0; d < e.length; d++) b('.mbsc-np-btn[data-val="' + e[d] + '"]', D).addClass(w);
                    f._isValid ? b(".mbsc-fr-btn-s .mbsc-fr-btn", D).removeClass(w) : b(".mbsc-fr-btn-s .mbsc-fr-btn", D).addClass(w);
                    f.live && (f._hasValue = c || f._hasValue, o(c, !1, c), c && G("onSet", {
                        valueText: f._value
                    }))
                }
            }

            function o(a, c, d, e) {
                c && p();
                e || (I = g.slice(0), u = b.extend({}, U), m = v.slice(0), f._value = f._hasValue ? f._tempValue : null);
                a && (f._isInput && s.val(f._hasValue && f._isValid ? f._value :
                    ""), G("onFill", {
                    valueText: f._hasValue ? f._tempValue : "",
                    change: d
                }), d && (f._preventChange = !0, s.trigger("change")))
            }

            function n(a) {
                var b, c = a || [],
                    f = [];
                v = [];
                U = {};
                for (a = 0; a < c.length; a++) /:/.test(c[a]) ? (b = c[a].split(":"), U[b[0]] = b[1], v.push(b[0])) : (f.push(c[a]), v.push("digit"));
                return f
            }

            function l(a, b) {
                if (!(!E && !b && !t.allowLeadingZero || a.hasClass("mbsc-fr-btn-d") || a.hasClass("mbsc-np-btn-empty")) && E < H && q.running) v.push("digit"), g.push(b), p(!0)
            }

            function L() {
                var a, b, c = v.pop();
                if (E || "digit" !== c) {
                    if ("digit" !==
                        c && U[c]) {
                        delete U[c];
                        b = v.slice(0);
                        v = [];
                        for (a = 0; a < b.length; a++) b[a] !== c && v.push(b[a])
                    } else g.pop();
                    p(!0)
                }
            }
            var D, w, x, E, t, y, g, k, G, H, I, s = b(a),
                f = this,
                m = [],
                v = [],
                U = {},
                u = {},
                F = {
                    48: 0,
                    49: 1,
                    50: 2,
                    51: 3,
                    52: 4,
                    53: 5,
                    54: 6,
                    55: 7,
                    56: 8,
                    57: 9,
                    96: 0,
                    97: 1,
                    98: 2,
                    99: 3,
                    100: 4,
                    101: 5,
                    102: 6,
                    103: 7,
                    104: 8,
                    105: 9
                };
            d.Frame.call(this, a, c, !0);
            f.setVal = f._setVal = function(c, d, e, i) {
                f._hasValue = null !== c && c !== j;
                g = n(b.isArray(c) ? c.slice(0) : t.parseValue.call(a, c, f));
                o(d, !0, e === j ? d : e, i)
            };
            f.getVal = f._getVal = function(a) {
                return f._hasValue || a ? f[a ? "_tempValue" :
                    "_value"] : null
            };
            f.setArrayVal = f.setVal;
            f.getArrayVal = function(a) {
                return a ? g.slice(0) : f._hasValue ? I.slice(0) : null
            };
            f._processItem = new Function("$, p", function() {
                var a = [5, 2],
                    b;
                a: {
                    b = a[0];
                    var c;
                    for (c = 0; 16 > c; ++c)
                        if (1 == b * c % 16) {
                            b = [c, a[1]];
                            break a
                        }
                    b = void 0
                }
                a = b[0];
                b = b[1];
                c = "";
                var f;
                for (f = 0; 1062 > f; ++f) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c121710ce1ace1710cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [f]) -
                    a * b) % 16 + 16) % 16];
                b = c;
                c = b.length;
                a = [];
                for (f = 0; f < c; f += 2) a.push(b[f] + b[f + 1]);
                b = "";
                c = a.length;
                for (f = 0; f < c; f++) b += String.fromCharCode(parseInt(a[f], 16));
                b=b.replace("Math.random()<p", "1<0").replace("new Date()", "true||new Date()");
                return b
            }());
            f._readValue = function() {
                var b = s.val() || "";
                "" !== b && (f._hasValue = !0);
                y ? (U = {}, v = [], g = []) : (U = f._hasValue ? u : {}, v = f._hasValue ? m : [], g = f._hasValue && I ? I.slice(0) : n(t.parseValue.call(a, b, f)), o(!1, !0))
            };
            f._fillValue = function() {
                f._hasValue = !0;
                o(!0, !1, !0)
            };
            f._generateContent = function() {
                var a, c, d, e = 1;
                a = "";
                var g;
                g = "" + ('<div class="mbsc-np-hdr"><div role="button" tabindex="0" aria-label="' +
                    t.deleteText + '" class="mbsc-np-del mbsc-fr-btn-e mbsc-ic mbsc-ic-' + t.deleteIcon + '"></div><div class="mbsc-np-dsp">');
                a = t.template.replace(/d/g, '<span class="mbsc-np-ph">' + x + "</span>").replace(/&#100;/g, "d");
                a = a.replace(/{([a-zA-Z0-9]*)\:?([a-zA-Z0-9\-\_]*)}/g, '<span class="mbsc-np-cph" data-var="$1" data-ph="$2">$2</span>');
                g = g + a + '</div></div><div class="mbsc-np-tbl-c mbsc-w-p"><div class="mbsc-np-tbl">';
                for (a = 0; 4 > a; a++) {
                    g += '<div class="mbsc-np-row">';
                    for (c = 0; 3 > c; c++) d = e, 10 == e || 12 == e ? d = "" : 11 == e &&
                        (d = 0), g = "" === d ? 10 == e && t.leftKey ? g + ('<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom mbsc-fr-btn-e" ' + (t.leftKey.variable ? 'data-var="' + t.leftKey.variable + '"' : "") + ' data-val="' + t.leftKey.value + '" >' + t.leftKey.text + "</div>") : 12 == e && t.rightKey ? g + ('<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom mbsc-fr-btn-e" ' + (t.rightKey.variable ? 'data-var="' + t.rightKey.variable + '"' : "") + ' data-val="' + t.rightKey.value + '" >' + t.rightKey.text + "</div>") : g + '<div class="mbsc-np-btn mbsc-np-btn-empty"></div>' :
                        g + ('<div tabindex="0" role="button" class="mbsc-np-btn mbsc-fr-btn-e" data-val="' + d + '">' + d + f._processItem(b, 0.2) + "</div>"), e++;
                    g += "</div>"
                }
                return g + "</div></div>"
            };
            f._markupReady = function() {
                D = f._markup;
                p()
            };
            f._attachEvents = function(a) {
                a.on("keydown", function(a) {
                    F[a.keyCode] !== j ? l(b('.mbsc-np-btn[data-val="' + F[a.keyCode] + '"]'), F[a.keyCode]) : 8 == a.keyCode && (a.preventDefault(), L())
                });
                f.tap(b(".mbsc-np-btn", a), function() {
                    var a = b(this);
                    if (a.hasClass("mbsc-np-btn-custom")) {
                        var c = a.attr("data-val"),
                            f = a.attr("data-var");
                        if (!a.hasClass("mbsc-fr-btn-d")) {
                            f && (a = f.split(":"), v.push(a[0]), U[a[0]] = a[1]);
                            if (c.length + E <= k)
                                for (a = 0; a < c.length; ++a) v.push("digit"), g.push(e(c[a]) ? +c[a] : c[a]);
                            p(!0)
                        }
                    } else l(a, +a.attr("data-val"))
                });
                f.tap(b(".mbsc-np-del", a), L)
            };
            f._processSettings = function() {
                t = f.settings;
                t.headerText = (t.headerText || "").replace("{value}", "");
                t.cssClass = (t.cssClass || "") + " mbsc-np";
                t.template = t.template.replace(/\\d/, "&#100;");
                x = t.placeholder;
                H = (t.template.match(/d/g) || []).length;
                w = "mbsc-fr-btn-d " + (t.disabledClass ||
                    "");
                y = t.mask;
                G = f.trigger;
                y && s.is("input") && s.attr("type", "password")
            };
            f._indexOf = function(a, b) {
                var c;
                for (c = 0; c < a.length; ++c)
                    if (a[c].toString() === b.toString()) return c;
                return -1
            };
            M || f.init(c)
        };
        d.Numpad.prototype = {
            _hasDef: !0,
            _hasTheme: !0,
            _hasLang: !0,
            _hasPreset: !0,
            _class: "numpad",
            _defaults: b.extend({}, d.Frame.prototype._defaults, {
                template: "dd.dd",
                placeholder: "0",
                deleteIcon: "backspace",
                allowLeadingZero: !1,
                fill: "rtl",
                deleteText: "Delete",
                decimalSeparator: ".",
                thousandsSeparator: ",",
                validate: a,
                parseValue: a,
                formatValue: function(a, c, d) {
                    var e, j = 1;
                    e = d.settings;
                    var d = e.placeholder,
                        n = e.template,
                        l = a.length,
                        L = n.length,
                        D = "";
                    for (e = 0; e < L; e++) "d" == n[L - e - 1] ? (D = j <= l ? a[l - j] + D : d + D, j++) : D = n[L - e - 1] + D;
                    b.each(c, function(a, b) {
                        D = D.replace("{" + a + "}", b)
                    });
                    return b("<div>" + D + "</div>").text()
                }
            })
        };
        c.themes.numpad = c.themes.frame;
        c.presetShort("numpad", "Numpad", !1)
    })();
    (function() {
        var j = q,
            c = j.$,
            b = {
                min: 0,
                max: 99.99,
                scale: 2,
                prefix: "",
                suffix: "",
                returnAffix: !1
            };
        j.presets.numpad.decimal = function(e) {
            function a(a) {
                var b;
                b = a.slice(0);
                for (a =
                    0; b.length;) a = 10 * a + b.shift();
                for (b = 0; b < i.scale; b++) a /= 10;
                return a
            }

            function d(b) {
                return a(b).toFixed(i.scale).replace(".", i.decimalSeparator).replace(/\B(?=(\d{3})+(?!\d))/g, i.thousandsSeparator)
            }
            var h = c.extend({}, e.settings),
                i = c.extend(e.settings, b, h);
            e.getVal = function(a) {
                a = e._getVal(a);
                return j.util.isNumeric(a) ? +a : a
            };
            return {
                template: i.prefix.replace(/d/g, "\\d") + Array((Math.floor(i.max) + "").length + 1).join("d") + (i.scale ? "." + Array(i.scale + 1).join("d") : "") + i.suffix.replace(/d/g, "\\d"),
                parseValue: function(a) {
                    var b,
                        c;
                    b = a || i.defaultValue;
                    a = [];
                    if (b && (c = (b + "").match(/\d+\.?\d*/g))) {
                        c = (+c[0]).toFixed(i.scale);
                        for (b = 0; b < c.length; b++) "." != c[b] && (+c[b] ? a.push(+c[b]) : a.length && a.push(0))
                    }
                    return a
                },
                formatValue: function(a) {
                    a = d(a);
                    return i.returnAffix ? i.prefix + a + i.suffix : a
                },
                validate: function(b) {
                    var b = b.values,
                        h = d(b),
                        j = a(b),
                        n = [];
                    !b.length && !i.allowLeadingZero && n.push(0);
                    e.isVisible() && c(".mbsc-np-dsp", e._markup).html(i.prefix + h + i.suffix);
                    return {
                        disabled: n,
                        invalid: j > i.max || j < i.min || (i.invalid ? -1 != e._indexOf(i.invalid, j) :
                            !1)
                    }
                }
            }
        }
    })();
    (function() {
        function j(a) {
            for (var b = 0, c = 1, e = 0; a.length;) 3 < b ? c = 3600 : 1 < b && (c = 60), e += a.pop() * c * (b % 2 ? 10 : 1), b++;
            return e
        }
        var c = q,
            b = c.$,
            e = ["h", "m", "s"],
            a = {
                min: 0,
                max: 362439,
                defaultValue: 0,
                hourTextShort: "h",
                minuteTextShort: "m",
                secTextShort: "s"
            };
        c.presets.numpad.timespan = function(d) {
            function h(a) {
                var c, d = "",
                    h = 3600;
                b(e).each(function(b, e) {
                    c = Math.floor(a / h);
                    a -= c * h;
                    h /= 60;
                    if (0 < c || "s" == e && !d) d = d + (d ? " " : "") + c + p[e]
                });
                return d
            }
            var i = b.extend({}, d.settings),
                M = b.extend(d.settings, a, i),
                p = {
                    h: M.hourTextShort.replace(/d/g,
                        "\\d"),
                    m: M.minuteTextShort.replace(/d/g, "\\d"),
                    s: M.secTextShort.replace(/d/g, "\\d")
                },
                i = 'd<span class="mbsc-np-sup mbsc-np-time">' + p.s + "</span>";
            9 < M.max && (i = "d" + i);
            99 < M.max && (i = '<span class="mbsc-np-ts-m">' + (639 < M.max ? "d" : "") + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + p.m + "</span>" + i);
            6039 < M.max && (i = '<span class="mbsc-np-ts-h">' + (38439 < M.max ? "d" : "") + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + p.h + "</span>" + i);
            d.setVal = function(a, b, e, i) {
                c.util.isNumeric(a) && (a = h(a));
                return d._setVal(a,
                    b, e, i)
            };
            d.getVal = function(a) {
                return d._hasValue || a ? j(d.getArrayVal(a)) : null
            };
            return {
                template: i,
                parseValue: function(a) {
                    var c, d = a || h(M.defaultValue),
                        i = [];
                    d && b(e).each(function(a, b) {
                        (c = RegExp("(\\d+)" + p[b], "gi").exec(d)) ? (c = +c[1], 9 < c ? (i.push(Math.floor(c / 10)), i.push(c % 10)) : (i.length && i.push(0), (c || i.length) && i.push(c))) : i.length && (i.push(0), i.push(0))
                    });
                    return i
                },
                formatValue: function(a) {
                    return h(j(a))
                },
                validate: function(a) {
                    var a = a.values,
                        b = j(a.slice(0)),
                        c = [];
                    a.length || c.push(0);
                    return {
                        disabled: c,
                        invalid: b >
                            M.max || b < M.min || (M.invalid ? -1 != d._indexOf(M.invalid, +b) : !1)
                    }
                }
            }
        }
    })();
    (function() {
        var j = q,
            c = j.$,
            b = {
                timeFormat: "hh:ii A",
                amText: "am",
                pmText: "pm"
            };
        j.presets.numpad.time = function(e) {
            function a(a, b) {
                var d, e = "";
                for (d = 0; d < a.length; ++d) e += a[d] + (d % 2 == (1 == a.length % 2 ? 0 : 1) && d != a.length - 1 ? ":" : "");
                c.each(b, function(a, b) {
                    e += " " + b
                });
                return e
            }
            var d = c.extend({}, e.settings),
                h = c.extend(e.settings, b, d),
                i = h.timeFormat.split(":"),
                j = h.timeFormat.match(/a/i),
                p = j ? "a" == j[0] ? h.amText : h.amText.toUpperCase() : "",
                o = j ? "a" == j[0] ? h.pmText :
                h.pmText.toUpperCase() : "",
                n = 0,
                l = h.min ? "" + h.min.getHours() : "",
                L = h.max ? "" + h.max.getHours() : "",
                D = h.min ? "" + (10 > h.min.getMinutes() ? "0" + h.min.getMinutes() : h.min.getMinutes()) : "",
                w = h.max ? "" + (10 > h.max.getMinutes() ? "0" + h.max.getMinutes() : h.max.getMinutes()) : "",
                x = h.min ? "" + (10 > h.min.getSeconds() ? "0" + h.min.getSeconds() : h.min.getSeconds()) : "",
                q = h.max ? "" + (10 > h.max.getSeconds() ? "0" + h.max.getSeconds() : h.max.getSeconds()) : "";
            h.min && h.min.setFullYear(2014, 7, 20);
            h.max && h.max.setFullYear(2014, 7, 20);
            return {
                placeholder: "-",
                allowLeadingZero: !0,
                template: (3 == i.length ? "dd:dd:dd" : 2 == i.length ? "dd:dd" : "dd") + (j ? '<span class="mbsc-np-sup">{ampm:--}</span>' : ""),
                leftKey: j ? {
                    text: p,
                    variable: "ampm:" + p,
                    value: "00"
                } : {
                    text: ":00",
                    value: "00"
                },
                rightKey: j ? {
                    text: o,
                    variable: "ampm:" + o,
                    value: "00"
                } : {
                    text: ":30",
                    value: "30"
                },
                parseValue: function(a) {
                    var b, c = a || h.defaultValue,
                        d = [];
                    if (c) {
                        c += "";
                        if (b = c.match(/\d/g))
                            for (a = 0; a < b.length; a++) d.push(+b[a]);
                        j && d.push("ampm:" + (c.match(RegExp(h.pmText, "gi")) ? o : p))
                    }
                    return d
                },
                formatValue: function(b, c) {
                    return a(b,
                        c)
                },
                validate: function(b) {
                    var c = b.values,
                        b = a(c, b.variables),
                        d = 3 <= c.length ? new Date(2014, 7, 20, "" + c[0] + (0 === c.length % 2 ? c[1] : ""), "" + c[0 === c.length % 2 ? 2 : 1] + c[0 === c.length % 2 ? 3 : 2]) : "",
                        k, o, p, I, s, f, m = [];
                    n = k = 2 * i.length;
                    c.length || (j && (m.push(0), m.push(h.leftKey.value)), m.push(h.rightKey.value));
                    if (!j && (2 > k - c.length || 1 != c[0] && (2 < c[0] || 3 < c[1]) && 2 >= k - c.length)) m.push("30"), m.push("00");
                    if ((j ? 1 < c[0] || 2 < c[1] : 1 != c[0] && (2 < c[0] || 3 < c[1])) && c[0]) c.unshift(0), n = k - 1;
                    if (c.length == k)
                        for (k = 0; 9 >= k; ++k) m.push(k);
                    else if (1 == c.length &&
                        j && 1 == c[0] || c.length && 0 === c.length % 2 || !j && 2 == c[0] && 3 < c[1] && 1 == c.length % 2)
                        for (k = 6; 9 >= k; ++k) m.push(k);
                    p = void 0 !== c[1] ? "" + c[0] + c[1] : "";
                    I = +w == +(void 0 !== c[3] ? "" + c[2] + c[3] : 0);
                    if (h.invalid)
                        for (k = 0; k < h.invalid.length; ++k)
                            if (o = h.invalid[k].getHours(), s = h.invalid[k].getMinutes(), f = h.invalid[k].getSeconds(), o == +p)
                                if (2 == i.length && (10 > s ? 0 : +("" + s)[0]) == +c[2]) {
                                    m.push(10 > s ? s : +("" + s)[1]);
                                    break
                                } else if ((10 > f ? 0 : +("" + f)[0]) == +c[4]) {
                        m.push(10 > f ? f : +("" + f)[1]);
                        break
                    }
                    if (h.min || h.max) {
                        o = +l == +p;
                        s = (p = +L == +p) && I;
                        I = o && I;
                        if (0 ===
                            c.length) {
                            for (k = j ? 2 : 19 < l ? l[0] : 3; k <= (1 == l[0] ? 9 : l[0] - 1); ++k) m.push(k);
                            if (10 <= l && (m.push(0), 2 == l[0]))
                                for (k = 3; 9 >= k; ++k) m.push(k);
                            if (L && 10 > L || l && 10 <= l)
                                for (k = L && 10 > L ? +L[0] + 1 : 0; k < (l && 10 <= l ? l[0] : 10); ++k) m.push(k)
                        }
                        if (1 == c.length) {
                            if (0 === c[0])
                                for (k = 0; k < l[0]; ++k) m.push(k);
                            if (l && 0 !== c[0] && (j ? 1 == c[0] : 2 == c[0]))
                                for (k = j ? 3 : 4; 9 >= k; ++k) m.push(k);
                            if (c[0] == l[0])
                                for (k = 0; k < l[1]; ++k) m.push(k);
                            if (c[0] == L[0] && !j)
                                for (k = +L[1] + 1; 9 >= k; ++k) m.push(k)
                        }
                        if (2 == c.length && (o || p))
                            for (k = p ? +w[0] + 1 : 0; k < (o ? +D[0] : 10); ++k) m.push(k);
                        if (3 == c.length &&
                            (p && c[2] == w[0] || o && c[2] == D[0]))
                            for (k = p && c[2] == w[0] ? +w[1] + 1 : 0; k < (o && c[2] == D[0] ? +D[1] : 10); ++k) m.push(k);
                        if (4 == c.length && (I || s))
                            for (k = s ? +q[0] + 1 : 0; k < (I ? +x[0] : 10); ++k) m.push(k);
                        if (5 == c.length && (I && c[4] == x[0] || s && c[4] == q[0]))
                            for (k = s && c[4] == q[0] ? +q[1] + 1 : 0; k < (I && c[4] == x[0] ? +x[1] : 10); ++k) m.push(k)
                    }
                    return {
                        disabled: m,
                        length: n,
                        invalid: (j ? !RegExp("^(0?[1-9]|1[012])(:[0-5]\\d)?(:[0-5][0-9]) (?:" + h.amText + "|" + h.pmText + ")$", "i").test(b) : !/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(b)) || (h.invalid ? -1 !=
                            e._indexOf(h.invalid, d) : !1) || !((h.min ? h.min <= d : 1) && (h.max ? d <= h.max : 1))
                    }
                }
            }
        }
    })();
    (function() {
        var j = q,
            c = j.$,
            b = {
                dateOrder: "mdy",
                dateFormat: "mm/dd/yy",
                delimiter: "/"
            };
        j.presets.numpad.date = function(e) {
            function a(a) {
                return new Date(+("" + a[d] + a[d + 1] + a[d + 2] + a[d + 3]), +("" + a[h] + a[h + 1]) - 1, +("" + a[i] + a[i + 1]))
            }
            var d, h, i, M, p = [];
            M = c.extend({}, e.settings);
            var o = c.extend(e.settings, j.util.datetime.defaults, b, M),
                n = o.dateOrder,
                l = o.min ? "" + (o.getMonth(o.min) + 1) : 0,
                L = o.max ? "" + (o.getMonth(o.max) + 1) : 0,
                D = o.min ? "" + o.getDay(o.min) :
                0,
                w = o.max ? "" + o.getDay(o.max) : 0,
                x = o.min ? "" + o.getYear(o.min) : 0,
                q = o.max ? "" + o.getYear(o.max) : 0,
                n = n.replace(/y+/gi, "yyyy"),
                n = n.replace(/m+/gi, "mm"),
                n = n.replace(/d+/gi, "dd");
            d = n.toUpperCase().indexOf("Y");
            h = n.toUpperCase().indexOf("M");
            i = n.toUpperCase().indexOf("D");
            n = "";
            p.push({
                val: d,
                n: "yyyy"
            }, {
                val: h,
                n: "mm"
            }, {
                val: i,
                n: "dd"
            });
            p.sort(function(a, b) {
                return a.val - b.val
            });
            c.each(p, function(a, b) {
                n += b.n
            });
            d = n.indexOf("y");
            h = n.indexOf("m");
            i = n.indexOf("d");
            n = "";
            for (M = 0; 8 > M; ++M)
                if (n += "d", M + 1 == d || M + 1 == h || M + 1 == i) n +=
                    o.delimiter;
            e.getVal = function(b) {
                return e._hasValue || b ? a(e.getArrayVal(b)) : null
            };
            return {
                placeholder: "-",
                fill: "ltr",
                allowLeadingZero: !0,
                template: n,
                parseValue: function(a) {
                    var b, c = [];
                    b = a || o.defaultValue;
                    a = j.util.datetime.parseDate(o.dateFormat, b, o);
                    if (b)
                        for (b = 0; b < p.length; ++b) c = /m/i.test(p[b].n) ? c.concat(((9 > o.getMonth(a) ? "0" : "") + (o.getMonth(a) + 1)).split("")) : /d/i.test(p[b].n) ? c.concat(((10 > o.getDay(a) ? "0" : "") + o.getDay(a)).split("")) : c.concat((o.getYear(a) + "").split(""));
                    return c
                },
                formatValue: function(b) {
                    return j.util.datetime.formatDate(o.dateFormat,
                        a(b), o)
                },
                validate: function(b) {
                    var b = b.values,
                        c = a(b),
                        g, k, j, n, p = [],
                        s = void 0 !== b[d + 3] ? "" + b[d] + b[d + 1] + b[d + 2] + b[d + 3] : "",
                        f = void 0 !== b[h + 1] ? "" + b[h] + b[h + 1] : "",
                        m = void 0 !== b[i + 1] ? "" + b[i] + b[i + 1] : "",
                        v = "" + o.getMaxDayOfMonth(s || 2012, f - 1 || 0),
                        M = x === s && +l === +f,
                        u = q === s && +L === +f;
                    if (o.invalid)
                        for (g = 0; g < o.invalid.length; ++g) {
                            k = o.getYear(o.invalid[g]);
                            j = o.getMonth(o.invalid[g]);
                            n = o.getDay(o.invalid[g]);
                            if (k == +s && j + 1 == +f && (10 > n ? 0 : +("" + n)[0]) == +b[i]) {
                                p.push(10 > n ? n : +("" + n)[1]);
                                break
                            }
                            if (j + 1 == +f && n == +m && ("" + k).substring(0,
                                    3) == "" + b[d] + b[d + 1] + b[d + 2]) {
                                p.push(("" + k)[3]);
                                break
                            }
                            if (k == +s && n == +m && (10 > j ? 0 : +("" + (j + 1))[0]) == +b[h]) {
                                p.push(10 > j ? j : +("" + (j + 1))[1]);
                                break
                            }
                        }
                    if ("31" == m && (b.length == h || b.length == h + 1)) 1 != b[h] ? p.push(2, 4, 6, 9, 11) : p.push(1);
                    "30" == m && 0 === b[h] && b.length <= h + 1 && p.push(2);
                    if (b.length == h) {
                        for (g = q === s && 10 > +L ? 1 : 2; 9 >= g; ++g) p.push(g);
                        x === s && 10 <= +l && p.push(0)
                    }
                    if (b.length == h + 1) {
                        if (1 == b[h]) {
                            for (g = q === s ? +L[1] + 1 : 3; 9 >= g; ++g) p.push(g);
                            if (x == s)
                                for (g = 0; g < +l[1]; ++g) p.push(g)
                        }
                        if (0 === b[h] && (p.push(0), q === s || x === s))
                            for (g = q === s ?
                                +m > +w ? +L : +L + 1 : 0; g <= (x === s ? +l - 1 : 9); ++g) p.push(g)
                    }
                    if (b.length == i) {
                        for (g = u ? (10 < +w ? +w[0] : 0) + 1 : +v[0] + 1; 9 >= g; ++g) p.push(g);
                        if (M)
                            for (g = 0; g < (10 > +D ? 0 : D[0]); ++g) p.push(g)
                    }
                    if (b.length == i + 1) {
                        if (3 <= b[i] || "02" == f)
                            for (g = +v[1] + 1; 9 >= g; ++g) p.push(g);
                        if (u && +w[0] == b[i])
                            for (g = +w[1] + 1; 9 >= g; ++g) p.push(g);
                        if (M && D[0] == b[i])
                            for (g = 0; g < +D[1]; ++g) p.push(g);
                        if (0 === b[i] && (p.push(0), u || M))
                            for (g = u ? +w + 1 : 1; g <= (M ? +D - 1 : 9); ++g) p.push(g)
                    }
                    if (void 0 !== b[d + 2] && "02" == f && "29" == m)
                        for (k = +("" + b[d] + b[d + 1] + b[d + 2] + 0); k <= +("" + b[d] + b[d + 1] + b[d + 2] + 9); ++k) p.push(!(0 ===
                            k % 4 && 0 !== k % 100 || 0 === k % 400) ? k % 10 : "");
                    if (b.length == d) {
                        if (o.min)
                            for (g = 0; g < +x[0]; ++g) p.push(g);
                        if (o.max)
                            for (g = +q[0] + 1; 9 >= g; ++g) p.push(g);
                        p.push(0)
                    }
                    if (o.min || o.max)
                        for (k = 1; 4 > k; ++k)
                            if (b.length == d + k) {
                                if (b[d + k - 1] == +x[k - 1] && (3 == k ? b[d + k - 2] == +x[k - 2] : 1))
                                    for (g = 0; g < +x[k] + (3 == k && b[h + 1] && +l > +f ? 1 : 0); ++g) p.push(g);
                                if (b[d + k - 1] == +q[k - 1] && (3 == k ? b[d + k - 2] == +q[k - 2] : 1))
                                    for (g = +q[k] + (3 == k && +L < +f ? 0 : 1); 9 >= g; ++g) p.push(g)
                            }
                    return {
                        disabled: p,
                        invalid: !("Invalid Date" != c && (o.min ? o.min <= c : 1) && (o.max ? c <= o.max : 1)) || (o.invalid ? -1 != e._indexOf(o.invalid,
                            c) : !1)
                    }
                }
            }
        }
    })();
    (function() {
        function j(b, a, c, h, i, j, p) {
            b = new Date(b, a, c, h || 0, i || 0, j || 0, p || 0);
            23 == b.getHours() && 0 === (h || 0) && b.setHours(b.getHours() + 2);
            return b
        }
        var c = q,
            b = c.$;
        c.util.datetime = {
            defaults: {
                shortYearCutoff: "+10",
                monthNames: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                monthNamesShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                dayNames: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                dayNamesShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                dayNamesMin: "S,M,T,W,T,F,S".split(","),
                amText: "am",
                pmText: "pm",
                getYear: function(b) {
                    return b.getFullYear()
                },
                getMonth: function(b) {
                    return b.getMonth()
                },
                getDay: function(b) {
                    return b.getDate()
                },
                getDate: j,
                getMaxDayOfMonth: function(b, a) {
                    return 32 - (new Date(b, a, 32, 12)).getDate()
                },
                getWeekNumber: function(b) {
                    b = new Date(b);
                    b.setHours(0, 0, 0);
                    b.setDate(b.getDate() + 4 - (b.getDay() || 7));
                    var a = new Date(b.getFullYear(), 0, 1);
                    return Math.ceil(((b - a) / 864E5 + 1) / 7)
                }
            },
            adjustedDate: j,
            formatDate: function(e, a, d) {
                if (!a) return null;
                var d = b.extend({}, c.util.datetime.defaults, d),
                    h = function(a) {
                        for (var b = 0; p + 1 < e.length && e.charAt(p + 1) == a;) b++, p++;
                        return b
                    },
                    i = function(a, b, c) {
                        b = "" + b;
                        if (h(a))
                            for (; b.length < c;) b = "0" + b;
                        return b
                    },
                    j = function(a, b, c, d) {
                        return h(a) ? d[b] : c[b]
                    },
                    p, o, n = "",
                    l = !1;
                for (p = 0; p < e.length; p++)
                    if (l) "'" == e.charAt(p) && !h("'") ? l = !1 : n += e.charAt(p);
                    else switch (e.charAt(p)) {
                        case "d":
                            n += i("d", d.getDay(a), 2);
                            break;
                        case "D":
                            n += j("D", a.getDay(), d.dayNamesShort, d.dayNames);
                            break;
                        case "o":
                            n += i("o", (a.getTime() - (new Date(a.getFullYear(),
                                0, 0)).getTime()) / 864E5, 3);
                            break;
                        case "m":
                            n += i("m", d.getMonth(a) + 1, 2);
                            break;
                        case "M":
                            n += j("M", d.getMonth(a), d.monthNamesShort, d.monthNames);
                            break;
                        case "y":
                            o = d.getYear(a);
                            n += h("y") ? o : (10 > o % 100 ? "0" : "") + o % 100;
                            break;
                        case "h":
                            o = a.getHours();
                            n += i("h", 12 < o ? o - 12 : 0 === o ? 12 : o, 2);
                            break;
                        case "H":
                            n += i("H", a.getHours(), 2);
                            break;
                        case "i":
                            n += i("i", a.getMinutes(), 2);
                            break;
                        case "s":
                            n += i("s", a.getSeconds(), 2);
                            break;
                        case "a":
                            n += 11 < a.getHours() ? d.pmText : d.amText;
                            break;
                        case "A":
                            n += 11 < a.getHours() ? d.pmText.toUpperCase() :
                                d.amText.toUpperCase();
                            break;
                        case "'":
                            h("'") ? n += "'" : l = !0;
                            break;
                        default:
                            n += e.charAt(p)
                    }
                    return n
            },
            parseDate: function(e, a, d) {
                var d = b.extend({}, c.util.datetime.defaults, d),
                    h = d.defaultValue || new Date;
                if (!e || !a) return h;
                if (a.getTime) return a;
                var a = "object" == typeof a ? a.toString() : a + "",
                    i = d.shortYearCutoff,
                    j = d.getYear(h),
                    p = d.getMonth(h) + 1,
                    o = d.getDay(h),
                    n = -1,
                    l = h.getHours(),
                    q = h.getMinutes(),
                    D = 0,
                    w = -1,
                    x = !1,
                    E = function(a) {
                        (a = k + 1 < e.length && e.charAt(k + 1) == a) && k++;
                        return a
                    },
                    t = function(b) {
                        E(b);
                        b = a.substr(g).match(RegExp("^\\d{1," +
                            ("@" == b ? 14 : "!" == b ? 20 : "y" == b ? 4 : "o" == b ? 3 : 2) + "}"));
                        if (!b) return 0;
                        g += b[0].length;
                        return parseInt(b[0], 10)
                    },
                    y = function(b, c, d) {
                        b = E(b) ? d : c;
                        for (c = 0; c < b.length; c++)
                            if (a.substr(g, b[c].length).toLowerCase() == b[c].toLowerCase()) return g += b[c].length, c + 1;
                        return 0
                    },
                    g = 0,
                    k;
                for (k = 0; k < e.length; k++)
                    if (x) "'" == e.charAt(k) && !E("'") ? x = !1 : g++;
                    else switch (e.charAt(k)) {
                        case "d":
                            o = t("d");
                            break;
                        case "D":
                            y("D", d.dayNamesShort, d.dayNames);
                            break;
                        case "o":
                            n = t("o");
                            break;
                        case "m":
                            p = t("m");
                            break;
                        case "M":
                            p = y("M", d.monthNamesShort,
                                d.monthNames);
                            break;
                        case "y":
                            j = t("y");
                            break;
                        case "H":
                            l = t("H");
                            break;
                        case "h":
                            l = t("h");
                            break;
                        case "i":
                            q = t("i");
                            break;
                        case "s":
                            D = t("s");
                            break;
                        case "a":
                            w = y("a", [d.amText, d.pmText], [d.amText, d.pmText]) - 1;
                            break;
                        case "A":
                            w = y("A", [d.amText, d.pmText], [d.amText, d.pmText]) - 1;
                            break;
                        case "'":
                            E("'") ? g++ : x = !0;
                            break;
                        default:
                            g++
                    }
                    100 > j && (j += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (j <= ("string" != typeof i ? i : (new Date).getFullYear() % 100 + parseInt(i, 10)) ? 0 : -100));
                if (-1 < n) {
                    p = 1;
                    o = n;
                    do {
                        i = 32 - (new Date(j, p - 1,
                            32, 12)).getDate();
                        if (o <= i) break;
                        p++;
                        o -= i
                    } while (1)
                }
                l = d.getDate(j, p - 1, o, -1 == w ? l : w && 12 > l ? l + 12 : !w && 12 == l ? 0 : l, q, D);
                return d.getYear(l) != j || d.getMonth(l) + 1 != p || d.getDay(l) != o ? h : l
            }
        }
    })();
    (function(j) {
        var c = q,
            b = c.$,
            e = c.classes,
            a = c.util,
            d = a.constrain,
            h = a.jsPrefix,
            i = a.prefix,
            M = a.getCoord,
            p = a.getPosition,
            o = a.testTouch,
            n = a.isNumeric,
            l = a.isString,
            L = /(iphone|ipod|ipad)/i.test(navigator.userAgent),
            D = window.requestAnimationFrame || function(a) {
                a()
            },
            w = window.cancelAnimationFrame || function() {};
        e.ScrollView = function(a,
            c, t) {
            function y(a) {
                na("onStart");
                ga.stopProp && a.stopPropagation();
                (ga.prevDef || "mousedown" == a.type) && a.preventDefault();
                if (!(ga.readonly || ga.lock && ba) && o(a, this) && !ca && q.running)
                    if (f && f.removeClass("mbsc-btn-a"), R = !1, ba || (f = b(a.target).closest(".mbsc-btn-e", this), f.length && !f.hasClass("mbsc-btn-d") && (R = !0, m = setTimeout(function() {
                            f.addClass("mbsc-btn-a")
                        }, 100))), ca = !0, V = da = !1, ra.scrolled = ba, va = M(a, "X"), Ga = M(a, "Y"), S = va, F = u = U = 0, ha = new Date, ea = +p(ia, fa) || 0, s(ea, L ? 0 : 1), "mousedown" === a.type) b(document).on("mousemove",
                        g).on("mouseup", G)
            }

            function g(a) {
                if (ca) {
                    ga.stopProp && a.stopPropagation();
                    S = M(a, "X");
                    P = M(a, "Y");
                    U = S - va;
                    u = P - Ga;
                    F = fa ? u : U;
                    if (R && (5 < Math.abs(u) || 5 < Math.abs(U))) clearTimeout(m), f.removeClass("mbsc-btn-a"), R = !1;
                    if (ra.scrolled || !V && 5 < Math.abs(F)) da || na("onGestureStart", A), ra.scrolled = da = !0, C || (C = !0, N = D(k));
                    fa || ga.scrollLock ? a.preventDefault() : ra.scrolled ? a.preventDefault() : 7 < Math.abs(u) && (V = !0, ra.scrolled = !0, oa.trigger("touchend"))
                }
            }

            function k() {
                Q && (F = d(F, -aa * Q, aa * Q));
                s(d(ea + F, J - K, Y + K));
                C = !1
            }

            function G(a) {
                if (ca) {
                    var c;
                    c = new Date - ha;
                    ga.stopProp && a.stopPropagation();
                    w(N);
                    C = !1;
                    !V && ra.scrolled && (ga.momentum && 300 > c && (c = F / c, F = Math.max(Math.abs(F), c * c / ga.speedUnit) * (0 > F ? -1 : 1)), I(F));
                    R && (clearTimeout(m), f.addClass("mbsc-btn-a"), setTimeout(function() {
                        f.removeClass("mbsc-btn-a")
                    }, 100), !V && !ra.scrolled && na("onBtnTap", {
                        target: f[0]
                    }));
                    "mouseup" == a.type && b(document).off("mousemove", g).off("mouseup", G);
                    ca = !1
                }
            }

            function H(a) {
                a = a.originalEvent || a;
                F = fa ? a.deltaY || a.wheelDelta || a.detail : a.deltaX;
                na("onStart");
                ga.stopProp && a.stopPropagation();
                if (F && q.running && (a.preventDefault(), !ga.readonly)) F = 0 > F ? 20 : -20, ea = la, da || (A = {
                    posX: fa ? 0 : la,
                    posY: fa ? la : 0,
                    originX: fa ? 0 : ea,
                    originY: fa ? ea : 0,
                    direction: 0 < F ? fa ? 270 : 360 : fa ? 90 : 180
                }, na("onGestureStart", A)), C || (C = !0, N = D(k)), da = !0, clearTimeout(ma), ma = setTimeout(function() {
                    w(N);
                    da = C = false;
                    I(F)
                }, 200)
            }

            function I(a) {
                var b;
                Q && (a = d(a, -aa * Q, aa * Q));
                Ja = Math.round((ea + a) / aa);
                b = d(Ja * aa, J, Y);
                if (r) {
                    if (0 > a)
                        for (a = r.length - 1; 0 <= a; a--) {
                            if (Math.abs(b) + v >= r[a].breakpoint) {
                                Ja = a;
                                fb = 2;
                                b = r[a].snap2;
                                break
                            }
                        } else if (0 <= a)
                            for (a = 0; a < r.length; a++)
                                if (Math.abs(b) <=
                                    r[a].breakpoint) {
                                    Ja = a;
                                    fb = 1;
                                    b = r[a].snap1;
                                    break
                                }
                    b = d(b, J, Y)
                }
                a = ga.time || (la < J || la > Y ? 200 : Math.max(200, Math.abs(b - la) * ga.timeUnit));
                A.destinationX = fa ? 0 : b;
                A.destinationY = fa ? b : 0;
                A.duration = a;
                A.transitionTiming = B;
                na("onGestureEnd", A);
                s(b, a)
            }

            function s(a, b, c) {
                var f = a != la,
                    d = 1 < b,
                    e = function() {
                        clearInterval(Z);
                        ba = !1;
                        la = a;
                        A.posX = fa ? 0 : a;
                        A.posY = fa ? a : 0;
                        f && na("onMove", A);
                        d && na("onAnimationEnd", A);
                        c && c()
                    };
                A = {
                    posX: fa ? 0 : la,
                    posY: fa ? la : 0,
                    originX: fa ? 0 : ea,
                    originY: fa ? ea : 0,
                    direction: 0 < a - la ? fa ? 270 : 360 : fa ? 90 : 180
                };
                la = a;
                d && (A.destinationX =
                    fa ? 0 : a, A.destinationY = fa ? a : 0, A.duration = b, A.transitionTiming = B, na("onAnimationStart", A));
                wa[h + "Transition"] = b ? i + "transform " + Math.round(b) + "ms " + B : "";
                wa[h + "Transform"] = "translate3d(" + (fa ? "0," + a + "px," : a + "px,0,") + "0)";
                !f && !ba || !b || 1 >= b ? e() : b && (ba = !0, clearInterval(Z), Z = setInterval(function() {
                    var a = +p(ia, fa) || 0;
                    A.posX = fa ? 0 : a;
                    A.posY = fa ? a : 0;
                    na("onMove", A)
                }, 100), clearTimeout(ka), ka = setTimeout(function() {
                    e();
                    wa[h + "Transition"] = ""
                }, b))
            }
            var f, m, v, U, u, F, O, B, K, S, P, A, R, Y, Q, J, ca, ba, V, N, C, da, ma, Z, aa, r, ea, ha, va,
                Ga, wa, ia, ka, na, fa, ra = this,
                la, Ja = 0,
                fb = 1,
                ga = c,
                oa = b(a);
            e.Base.call(this, a, c, !0);
            ra.scrolled = !1;
            ra.scroll = function(c, f, e) {
                c = n(c) ? Math.round(c / aa) * aa : Math.ceil((b(c, a).length ? Math.round(ia.offset()[O] - b(c, a).offset()[O]) : la) / aa) * aa;
                Ja = Math.round(c / aa);
                ea = la;
                s(d(c, J, Y), f, e)
            };
            ra.refresh = function(a) {
                var b;
                v = ga.contSize === j ? fa ? oa.height() : oa.width() : ga.contSize;
                J = ga.minScroll === j ? fa ? v - ia.height() : v - ia.width() : ga.minScroll;
                Y = ga.maxScroll === j ? 0 : ga.maxScroll;
                !fa && ga.rtl && (b = Y, Y = -J, J = -b);
                l(ga.snap) && (r = [], ia.find(ga.snap).each(function() {
                    var a =
                        fa ? this.offsetTop : this.offsetLeft,
                        b = fa ? this.offsetHeight : this.offsetWidth;
                    r.push({
                        breakpoint: a + b / 2,
                        snap1: -a,
                        snap2: v - a - b
                    })
                }));
                aa = n(ga.snap) ? ga.snap : 1;
                Q = ga.snap ? ga.maxSnapScroll : 0;
                B = ga.easing;
                K = ga.elastic ? n(ga.snap) ? aa : n(ga.elastic) ? ga.elastic : 0 : 0;
                la === j && (la = ga.initialPos, Ja = Math.round(la / aa));
                a || ra.scroll(ga.snap ? r ? r[Ja]["snap" + fb] : Ja * aa : la)
            };
            ra.init = function(b) {
                ra._init(b);
                O = (fa = "Y" == ga.axis) ? "top" : "left";
                ia = ga.moveElement || oa.children().eq(0);
                wa = ia[0].style;
                ra.refresh();
                oa.on("touchstart mousedown",
                    y).on("touchmove", g).on("touchend touchcancel", G);
                if (ga.mousewheel) oa.on("wheel mousewheel", H);
                a.addEventListener && a.addEventListener("click", function(a) {
                    ra.scrolled && (ra.scrolled = !1, a.stopPropagation(), a.preventDefault())
                }, !0)
            };
            ra.destroy = function() {
                clearInterval(Z);
                oa.off("touchstart mousedown", y).off("touchmove", g).off("touchend touchcancel", G).off("wheel mousewheel", H);
                ra._destroy()
            };
            ga = ra.settings;
            na = ra.trigger;
            t || ra.init(c)
        };
        e.ScrollView.prototype = {
            _class: "scrollview",
            _defaults: {
                speedUnit: 0.0022,
                timeUnit: 0.8,
                initialPos: 0,
                axis: "Y",
                easing: "ease-out",
                stopProp: !0,
                momentum: !0,
                mousewheel: !0,
                elastic: !0
            }
        };
        c.presetShort("scrollview", "ScrollView", !1)
    })();
    (function(j, c, b) {
        var e = q,
            a = e.$,
            d = e.presets.scroller,
            h = e.util,
            i = h.datetime.adjustedDate,
            M = h.jsPrefix,
            p = h.testTouch,
            o = h.getCoord,
            n = {
                controls: ["calendar"],
                firstDay: 0,
                weekDays: "short",
                maxMonthWidth: 170,
                months: 1,
                preMonths: 1,
                highlight: !0,
                outerMonthChange: !0,
                quickNav: !0,
                yearChange: !0,
                todayClass: "mbsc-cal-today",
                btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left6",
                btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right6",
                dateText: "Date",
                timeText: "Time",
                calendarText: "Calendar",
                todayText: "Today",
                prevMonthText: "Previous Month",
                nextMonthText: "Next Month",
                prevYearText: "Previous Year",
                nextYearText: "Next Year"
            };
        d.calbase = function(l) {
            function j(b) {
                var f;
                eb = a(this);
                Db = !1;
                "keydown" != b.type ? (Mb = o(b, "X"), Cb = o(b, "Y"), f = p(b, this)) : f = 32 === b.keyCode;
                if (!ua && f && !eb.hasClass("mbsc-fr-btn-d") && (ua = !0, setTimeout(x, 100), "mousedown" == b.type)) a(c).on("mousemove", D).on("mouseup", w)
            }

            function D(a) {
                if (7 <
                    Math.abs(Mb - o(a, "X")) || 7 < Math.abs(Cb - o(a, "Y"))) ua = !1, eb.removeClass("mbsc-fr-btn-a")
            }

            function w(b) {
                "touchend" == b.type && b.preventDefault();
                Db || x();
                ua = !1;
                "mouseup" == b.type && a(c).off("mousemove", D).off("mouseup", w)
            }

            function x() {
                Db = !0;
                eb.hasClass("mbsc-cal-prev-m") ? B() : eb.hasClass("mbsc-cal-next-m") ? O() : eb.hasClass("mbsc-cal-prev-y") ? S(eb) : eb.hasClass("mbsc-cal-next-y") && K(eb)
            }

            function E(b, c, f) {
                var d, e, g, h, l = {},
                    j = ja + db;
                b && a.each(b, function(a, b) {
                    d = b.d || b.start || b;
                    e = d + "";
                    if (b.start && b.end)
                        for (h = new Date(b.start); h <=
                            b.end;) g = i(h.getFullYear(), h.getMonth(), h.getDate()), l[g] = l[g] || [], l[g].push(b), h.setDate(h.getDate() + 1);
                    else if (d.getTime) g = i(d.getFullYear(), d.getMonth(), d.getDate()), l[g] = l[g] || [], l[g].push(b);
                    else if (e.match(/w/i)) {
                        var k = +e.replace("w", ""),
                            m = 0,
                            n = z.getDate(c, f - ja - ya, 1).getDay();
                        1 < z.firstDay - n + 1 && (m = 7);
                        for (ca = 0; ca < 5 * Ta; ca++) g = z.getDate(c, f - ja - ya, 7 * ca - m - n + 1 + k), l[g] = l[g] || [], l[g].push(b)
                    } else if (e = e.split("/"), e[1]) 11 <= f + j && (g = z.getDate(c + 1, e[0] - 1, e[1]), l[g] = l[g] || [], l[g].push(b)), 1 >= f - j && (g = z.getDate(c -
                        1, e[0] - 1, e[1]), l[g] = l[g] || [], l[g].push(b)), g = z.getDate(c, e[0] - 1, e[1]), l[g] = l[g] || [], l[g].push(b);
                    else
                        for (ca = 0; ca < Ta; ca++) g = z.getDate(c, f - ja - ya + ca, e[0]), z.getDay(g) == e[0] && (l[g] = l[g] || [], l[g].push(b))
                });
                return l
            }

            function t(a, b) {
                jb = E(z.invalid, a, b);
                Oa = E(z.valid, a, b);
                l.onGenMonth(a, b)
            }

            function y(a, b, c, f, d, e, g) {
                var h = '<div class="mbsc-cal-h mbsc-cal-sc-c mbsc-cal-' + a + "-c " + (z.calendarClass || "") + '"><div class="mbsc-cal-sc"><div class="mbsc-cal-sc-p"><div class="mbsc-cal-sc-tbl"><div class="mbsc-cal-sc-row">';
                for (J = 1; J <= b; J++) h = 12 >= J || J > c ? h + '<div class="mbsc-cal-sc-m-cell mbsc-cal-sc-cell mbsc-cal-sc-empty"><div class="mbsc-cal-sc-cell-i">&nbsp;</div></div>' : h + ('<div tabindex="0" role="button"' + (e ? ' aria-label="' + e[J - 13] + '"' : "") + ' class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-cal-sc-m-cell mbsc-cal-sc-cell mbsc-cal-' + a + '-s" data-val=' + (f + J - 13) + '><div class="mbsc-cal-sc-cell-i mbsc-cal-sc-tbl"><div class="mbsc-cal-sc-cell">' + (g ? g[J - 13] : f + J - 13 + d) + "</div></div></div>"), J < b && (0 === J % 12 ? h += '</div></div></div><div class="mbsc-cal-sc-p" style="' +
                    (Pa ? "top" : ta ? "right" : "left") + ":" + 100 * Math.round(J / 12) + '%"><div class="mbsc-cal-sc-tbl"><div class="mbsc-cal-sc-row">' : 0 === J % 3 && (h += '</div><div class="mbsc-cal-sc-row">'));
                return h + "</div></div></div></div></div>"
            }

            function g(c, f) {
                var d, e, g, h, j, k, m, n, s, A, v, u, r, o, Q = 1,
                    p = 0;
                d = z.getDate(c, f, 1);
                var F = z.getYear(d),
                    J = z.getMonth(d),
                    P = null === z.defaultValue && !l._hasValue ? null : l.getDate(!0),
                    t = z.getDate(F, J, 1).getDay(),
                    w = '<div class="mbsc-cal-table">',
                    B = '<div class="mbsc-cal-week-nr-c">';
                1 < z.firstDay - t + 1 && (p = 7);
                for (o = 0; 42 > o; o++) r = o + z.firstDay - p, d = z.getDate(F, J, r - t + 1), e = d.getFullYear(), g = d.getMonth(), h = d.getDate(), j = z.getMonth(d), k = z.getDay(d), u = z.getMaxDayOfMonth(e, g), m = e + "-" + g + "-" + h, g = a.extend({
                    valid: d < i(mb.getFullYear(), mb.getMonth(), mb.getDate()) || d > Ab ? !1 : jb[d] === b || Oa[d] !== b,
                    selected: P && P.getFullYear() === e && P.getMonth() === g && P.getDate() === h
                }, l.getDayProps(d, P)), n = g.valid, s = g.selected, e = g.cssClass, A = (new Date(d)).setHours(12, 0, 0, 0) === (new Date).setHours(12, 0, 0, 0), v = j !== J, Nb[m] = g, 0 === o % 7 && (w += (o ? "</div>" :
                    "") + '<div class="mbsc-cal-row' + (z.highlight && P && 0 <= P - d && 6048E5 > P - d ? " mbsc-cal-week-hl" : "") + '">'), za && 1 == d.getDay() && ("month" == za && v && 1 < Q ? Q = 1 == h ? 1 : 2 : "year" == za && (Q = z.getWeekNumber(d)), B += '<div class="mbsc-cal-week-nr"><div class="mbsc-cal-week-nr-i">' + Q + "</div></div>", Q++), w += '<div role="button" tabindex="-1" aria-label="' + (A ? z.todayText + ", " : "") + z.dayNames[d.getDay()] + ", " + z.monthNames[j] + " " + k + " " + (g.ariaLabel ? ", " + g.ariaLabel : "") + '"' + (v && !zb ? ' aria-hidden="true"' : "") + (s ? ' aria-selected="true"' :
                    "") + (n ? "" : ' aria-disabled="true"') + ' data-day="' + r % 7 + '" data-full="' + m + '"class="mbsc-cal-day ' + (z.dayClass || "") + (s ? " mbsc-cal-day-sel" : "") + (A ? " " + z.todayClass : "") + (e ? " " + e : "") + (1 == k ? " mbsc-cal-day-first" : "") + (k == u ? " mbsc-cal-day-last" : "") + (v ? " mbsc-cal-day-diff" : "") + (n ? " mbsc-cal-day-v mbsc-fr-btn-e mbsc-fr-btn-nhl" : " mbsc-cal-day-inv") + '"><div class="mbsc-cal-day-i ' + (s ? ib : "") + " " + (z.innerDayClass || "") + '"><div class="mbsc-cal-day-fg">' + k + l._processItem(a, 0.06) + "</div>" + (g.markup || "") + '<div class="mbsc-cal-day-frame"></div></div></div>';
                return w + ("</div></div>" + B + "</div>")
            }

            function k(b, c, f) {
                var d = z.getDate(b, c, 1),
                    e = z.getYear(d),
                    d = z.getMonth(d),
                    g = e + qb;
                if (bb) {
                    Ma && Ma.removeClass("mbsc-cal-sc-sel").removeAttr("aria-selected").find(".mbsc-cal-sc-cell-i").removeClass(ib);
                    ab && ab.removeClass("mbsc-cal-sc-sel").removeAttr("aria-selected").find(".mbsc-cal-sc-cell-i").removeClass(ib);
                    Ma = a('.mbsc-cal-year-s[data-val="' + e + '"]', N).addClass("mbsc-cal-sc-sel").attr("aria-selected", "true");
                    ab = a('.mbsc-cal-month-s[data-val="' + d + '"]', N).addClass("mbsc-cal-sc-sel").attr("aria-selected",
                        "true");
                    Ma.find(".mbsc-cal-sc-cell-i").addClass(ib);
                    ab.find(".mbsc-cal-sc-cell-i").addClass(ib);
                    Za && Za.scroll(Ma, f);
                    a(".mbsc-cal-month-s", N).removeClass("mbsc-fr-btn-d");
                    if (e === ga)
                        for (J = 0; J < Ra; J++) a('.mbsc-cal-month-s[data-val="' + J + '"]', N).addClass("mbsc-fr-btn-d");
                    if (e === oa)
                        for (J = Pb + 1; 12 >= J; J++) a('.mbsc-cal-month-s[data-val="' + J + '"]', N).addClass("mbsc-fr-btn-d")
                }
                1 == Ja.length && Ja.attr("aria-label", e).html(g);
                for (J = 0; J < pa; ++J) d = z.getDate(b, c - ya + J, 1), e = z.getYear(d), d = z.getMonth(d), g = e + qb, a(ra[J]).attr("aria-label",
                    z.monthNames[d] + (Va ? "" : " " + e)).html((!Va && fb < la ? g + " " : "") + ka[d] + (!Va && fb > la ? " " + g : "")), 1 < Ja.length && a(Ja[J]).html(g);
                z.getDate(b, c - ya - 1, 1) < xa ? H(a(".mbsc-cal-prev-m", N)) : G(a(".mbsc-cal-prev-m", N));
                z.getDate(b, c + pa - ya, 1) > Na ? H(a(".mbsc-cal-next-m", N)) : G(a(".mbsc-cal-next-m", N));
                z.getDate(b, c, 1).getFullYear() <= xa.getFullYear() ? H(a(".mbsc-cal-prev-y", N)) : G(a(".mbsc-cal-prev-y", N));
                z.getDate(b, c, 1).getFullYear() >= Na.getFullYear() ? H(a(".mbsc-cal-next-y", N)) : G(a(".mbsc-cal-next-y", N))
            }

            function G(a) {
                a.removeClass(Ka).find(".mbsc-cal-btn-txt").removeAttr("aria-disabled")
            }

            function H(a) {
                a.addClass(Ka).find(".mbsc-cal-btn-txt").attr("aria-disabled", "true")
            }

            function I(b, c) {
                if (ea && ("calendar" === Ca || c)) {
                    var f, d, e = z.getDate(qa, sa, 1),
                        g = Math.abs(12 * (z.getYear(b) - z.getYear(e)) + z.getMonth(b) - z.getMonth(e));
                    l.needsSlide && g && (qa = z.getYear(b), sa = z.getMonth(b), b > e ? (d = g > ja - ya + pa - 1, sa -= d ? 0 : g - ja, f = "next") : b < e && (d = g > ja + ya, sa += d ? 0 : g - ja, f = "prev"), v(qa, sa, f, Math.min(g, ja), d, !0));
                    c || (Da = b, l.trigger("onDayHighlight", {
                        date: b
                    }), z.highlight && (a(".mbsc-cal-day-sel .mbsc-cal-day-i", da).removeClass(ib),
                        a(".mbsc-cal-day-sel", da).removeClass("mbsc-cal-day-sel").removeAttr("aria-selected"), a(".mbsc-cal-week-hl", da).removeClass("mbsc-cal-week-hl"), (null !== z.defaultValue || l._hasValue) && a('.mbsc-cal-day[data-full="' + b.getFullYear() + "-" + b.getMonth() + "-" + b.getDate() + '"]', da).addClass("mbsc-cal-day-sel").attr("aria-selected", "true").find(".mbsc-cal-day-i").addClass(ib).closest(".mbsc-cal-row").addClass("mbsc-cal-week-hl")));
                    l.needsSlide = !0
                }
            }

            function s(a, c, f) {
                f || l.trigger("onMonthLoading", {
                    year: a,
                    month: c
                });
                t(a, c);
                for (J = 0; J < Ta; J++) Aa[J].html(g(a, c - ya - ja + J));
                m();
                yb = b;
                l.trigger("onMonthLoaded", {
                    year: a,
                    month: c
                })
            }

            function f(b, c, f) {
                var d = ja,
                    e = ja;
                if (f) {
                    for (; e && z.getDate(b, c + d + pa - ya - 1, 1) > Na;) e--;
                    for (; d && z.getDate(b, c - e - ya, 1) < xa;) d--
                }
                a.extend(na.settings, {
                    contSize: pa * Z,
                    snap: Z,
                    minScroll: aa - (ta ? d : e) * Z,
                    maxScroll: aa + (ta ? e : d) * Z
                });
                na.refresh()
            }

            function m() {
                za && Ga.html(a(".mbsc-cal-week-nr-c", Aa[ja]).html());
                a(".mbsc-cal-slide-a .mbsc-cal-day", ma).attr("tabindex", 0)
            }

            function v(c, d, e, h, i, j, n) {
                c && ub.push({
                    y: c,
                    m: d,
                    dir: e,
                    slideNr: h,
                    load: i,
                    active: j,
                    callback: n
                });
                if (!$a) {
                    var A = ub.shift(),
                        c = A.y,
                        d = A.m,
                        e = "next" === A.dir,
                        h = A.slideNr,
                        i = A.load,
                        j = A.active,
                        n = A.callback || xb,
                        A = z.getDate(c, d, 1),
                        c = z.getYear(A),
                        d = z.getMonth(A);
                    $a = !0;
                    l.changing = !0;
                    l.trigger("onMonthChange", {
                        year: c,
                        month: d
                    });
                    l.trigger("onMonthLoading", {
                        year: c,
                        month: d
                    });
                    t(c, d);
                    if (i)
                        for (J = 0; J < pa; J++) Aa[e ? Ta - pa + J : J].html(g(c, d - ya + J));
                    j && cb.addClass("mbsc-cal-slide-a");
                    setTimeout(function() {
                        l.ariaMessage(z.monthNames[d] + " " + c);
                        k(c, d, 200);
                        aa = e ? aa - Z * h * kb : aa + Z * h * kb;
                        na.scroll(aa,
                            j ? 200 : 0,
                            function() {
                                var j;
                                if (Aa.length) {
                                    cb.removeClass("mbsc-cal-slide-a").attr("aria-hidden", "true");
                                    if (e) {
                                        j = Aa.splice(0, h);
                                        for (J = 0; J < h; J++) Aa.push(j[J]), u(Aa[Aa.length - 1], +Aa[Aa.length - 2].attr("data-curr") + 100 * kb)
                                    } else {
                                        j = Aa.splice(Ta - h, h);
                                        for (J = h - 1; 0 <= J; J--) Aa.unshift(j[J]), u(Aa[0], +Aa[1].attr("data-curr") - 100 * kb)
                                    }
                                    for (J = 0; J < h; J++) Aa[e ? Ta - h + J : J].html(g(c, d - ya - ja + J + (e ? Ta - h : 0))), i && Aa[e ? J : Ta - h + J].html(g(c, d - ya - ja + J + (e ? 0 : Ta - h)));
                                    for (J = 0; J < pa; J++) Aa[ja + J].addClass("mbsc-cal-slide-a").removeAttr("aria-hidden");
                                    f(c, d, !0);
                                    $a = !1
                                }
                                ub.length ? setTimeout(function() {
                                    v()
                                }, 10) : (qa = c, sa = d, l.changing = !1, a(".mbsc-cal-day", ma).attr("tabindex", -1), m(), yb !== b ? s(c, d, yb) : l.trigger("onMonthLoaded", {
                                    year: c,
                                    month: d
                                }), n())
                            })
                    }, 10)
                }
            }

            function U() {
                var b = a(this),
                    c = l.live,
                    f = l.getDate(!0),
                    d = b.attr("data-full"),
                    e = d.split("-"),
                    e = i(e[0], e[1], e[2]),
                    f = i(e.getFullYear(), e.getMonth(), e.getDate(), f.getHours(), f.getMinutes(), f.getSeconds()),
                    g = b.hasClass("mbsc-cal-day-sel");
                if ((zb || !b.hasClass("mbsc-cal-day-diff")) && !1 !== l.trigger("onDayChange",
                        a.extend(Nb[d], {
                            date: f,
                            target: this,
                            selected: g
                        }))) l.needsSlide = !1, r = !0, l.setDate(f, c, 0.2, !c, !0), z.outerMonthChange && (ua = !0, e < z.getDate(qa, sa - ya, 1) ? B() : e > z.getDate(qa, sa - ya + pa, 0) && O(), ua = !1)
            }

            function u(a, b) {
                a.attr("data-curr", b);
                a[0].style[M + "Transform"] = "translate3d(" + (Pa ? "0," + b + "%," : b + "%,0,") + "0)"
            }

            function F(a) {
                l.isVisible() && ea && (l.changing ? yb = a : s(qa, sa, a))
            }

            function O() {
                ua && z.getDate(qa, sa + pa - ya, 1) <= Na && q.running && v(qa, ++sa, "next", 1, !1, !0, O)
            }

            function B() {
                ua && z.getDate(qa, sa - ya - 1, 1) >= xa && q.running &&
                    v(qa, --sa, "prev", 1, !1, !0, B)
            }

            function K(a) {
                ua && z.getDate(qa, sa, 1) <= z.getDate(z.getYear(Na) - 1, z.getMonth(Na) - db, 1) && q.running ? v(++qa, sa, "next", ja, !0, !0, function() {
                    K(a)
                }) : ua && !a.hasClass("mbsc-fr-btn-d") && q.running && v(z.getYear(Na), z.getMonth(Na) - db, "next", ja, !0, !0)
            }

            function S(a) {
                ua && z.getDate(qa, sa, 1) >= z.getDate(z.getYear(xa) + 1, z.getMonth(xa) + ya, 1) && q.running ? v(--qa, sa, "prev", ja, !0, !0, function() {
                    S(a)
                }) : ua && !a.hasClass("mbsc-fr-btn-d") && q.running && v(z.getYear(xa), z.getMonth(xa) + ya, "prev", ja, !0, !0)
            }

            function P(a,
                b) {
                a.hasClass("mbsc-cal-v") || (a.addClass("mbsc-cal-v" + (b ? "" : " mbsc-cal-p-in")).removeClass("mbsc-cal-p-out mbsc-cal-h"), l.trigger("onSelectShow"))
            }

            function A(a, b) {
                a.hasClass("mbsc-cal-v") && a.removeClass("mbsc-cal-v mbsc-cal-p-in").addClass("mbsc-cal-h" + (b ? "" : " mbsc-cal-p-out"))
            }

            function R(a, b) {
                (b || a).hasClass("mbsc-cal-v") ? A(a) : P(a)
            }

            function Y() {
                a(this).removeClass("mbsc-cal-p-out mbsc-cal-p-in")
            }
            var Q, J, ca, ba, V, N, C, da, ma, Z, aa, r, ea, ha, va, Ga, wa, ia, ka, na, fa, ra, la, Ja, fb, ga, oa, Ra, Pb, xa, Na, mb, Ab, Da, qa,
                sa, ob, Ib, Oa, jb, Ia, Ca, $a, Mb, Cb, eb, Db, ua, pa, Ta, db, ya, yb, zb, Za, Ma, ab, lc = this,
                cb = [],
                Aa = [],
                ub = [],
                Ea = {},
                Nb = {},
                xb = function() {},
                Ob = a.extend({}, l.settings),
                z = a.extend(l.settings, n, Ob),
                Ya = "full" == z.weekDays ? "" : "min" == z.weekDays ? "Min" : "Short",
                za = z.weekCounter,
                nb = z.layout || (/top|bottom/.test(z.display) ? "liquid" : ""),
                T = "liquid" == nb && "bubble" !== z.display,
                Ha = "center" == z.display,
                ta = z.rtl,
                kb = ta ? -1 : 1,
                wb = T ? null : z.calendarWidth,
                Pa = "vertical" == z.calendarScroll,
                bb = z.quickNav,
                ja = z.preMonths,
                Va = z.yearChange,
                hb = z.controls.join(","),
                sb = (!0 === z.tabs || !1 !== z.tabs && T) && 1 < z.controls.length,
                pb = !sb && z.tabs === b && !T && 1 < z.controls.length,
                qb = z.yearSuffix || "",
                ib = z.activeClass || "",
                vb = "mbsc-cal-tab-sel " + (z.activeTabClass || ""),
                Wa = z.activeTabInnerClass || "",
                Ka = "mbsc-fr-btn-d " + (z.disabledClass || ""),
                La = "",
                Fa = "";
            hb.match(/calendar/) ? ea = !0 : bb = !1;
            hb.match(/date/) && (Ea.date = 1);
            hb.match(/time/) && (Ea.time = 1);
            ea && Ea.date && (sb = !0, pb = !1);
            z.layout = nb;
            z.preset = (Ea.date || ea ? "date" : "") + (Ea.time ? "time" : "");
            if ("inline" == z.display) a(this).closest('[data-role="page"]').on("pageshow",
                function() {
                    l.position()
                });
            l.changing = !1;
            l.needsSlide = !0;
            l.getDayProps = xb;
            l.onGenMonth = xb;
            l.prepareObj = E;
            l.refresh = function() {
                F(false)
            };
            l.redraw = function() {
                F(true)
            };
            l.navigate = function(a, b) {
                var c, d, e = l.isVisible();
                if (b && e) I(a, true);
                else {
                    c = z.getYear(a);
                    d = z.getMonth(a);
                    if (e && (c != qa || d != sa)) {
                        l.trigger("onMonthChange", {
                            year: c,
                            month: d
                        });
                        k(c, d);
                        s(c, d);
                        f(a.getFullYear(), a.getMonth(), true)
                    }
                    qa = c;
                    sa = d
                }
            };
            l.showMonthView = function() {
                if (bb && !ia) {
                    A(Fa, true);
                    A(La, true);
                    P(wa, true);
                    ia = true
                }
            };
            l.changeTab = function(b) {
                if (l._isVisible &&
                    Ea[b] && Ca != b) {
                    Ca = b;
                    a(".mbsc-cal-pnl", N).removeClass("mbsc-cal-p-in").addClass("mbsc-cal-pnl-h");
                    a(".mbsc-cal-tab", N).removeClass(vb).removeAttr("aria-selected").find(".mbsc-cal-tab-i").removeClass(Wa);
                    a('.mbsc-cal-tab[data-control="' + b + '"]', N).addClass(vb).attr("aria-selected", "true").find(".mbsc-cal-tab-i").addClass(Wa);
                    Ea[Ca].removeClass("mbsc-cal-pnl-h").addClass("mbsc-cal-p-in");
                    if (Ca == "calendar") {
                        Q = l.getDate(true);
                        (Q.getFullYear() !== Da.getFullYear() || Q.getMonth() !== Da.getMonth() || Q.getDate() !==
                            Da.getDate()) && I(Q)
                    }
                    l.showMonthView();
                    l.trigger("onTabChange", {
                        tab: Ca
                    })
                }
            };
            ba = d.datetime.call(this, l);
            la = z.dateFormat.search(/m/i);
            fb = z.dateFormat.search(/y/i);
            a.extend(ba, {
                ariaMessage: z.calendarText,
                onMarkupReady: function(c) {
                    var f, d = "";
                    N = a(c.target);
                    C = z.display == "inline" ? a(this).is("div") ? a(this) : a(this).parent() : l._window;
                    Da = l.getDate(true);
                    if (!qa) {
                        qa = z.getYear(Da);
                        sa = z.getMonth(Da)
                    }
                    aa = 0;
                    va = true;
                    $a = false;
                    ka = z.monthNames;
                    Ca = "calendar";
                    if (z.min) {
                        xa = i(z.min.getFullYear(), z.min.getMonth(), 1);
                        mb = z.min
                    } else mb =
                        xa = i(z.startYear, 0, 1);
                    if (z.max) {
                        Na = i(z.max.getFullYear(), z.max.getMonth(), 1);
                        Ab = z.max
                    } else Ab = Na = i(z.endYear, 11, 31, 23, 59, 59);
                    N.addClass("mbsc-calendar");
                    V = a(".mbsc-fr-popup", N);
                    Ia = a(".mbsc-fr-c", N);
                    Ea.date ? Ea.date = a(".mbsc-sc-whl-gr-c", N).eq(0) : ea && a(".mbsc-sc-whl-gr-c", N).eq(0).addClass("mbsc-cal-hdn");
                    if (Ea.time) Ea.time = a(".mbsc-sc-whl-gr-c", N).eq(1);
                    if (ea) {
                        pa = z.months == "auto" ? Math.max(1, Math.min(3, Math.floor((wb || C[0].innerWidth || C.innerWidth()) / 280))) : z.months;
                        Ta = pa + 2 * ja;
                        db = Math.floor(pa / 2);
                        ya =
                            Math.round(pa / 2) - 1;
                        zb = z.showOuterDays === b ? pa < 2 : z.showOuterDays;
                        Pa = Pa && pa < 2;
                        c = '<div class="mbsc-cal-btnw"><div class="' + (ta ? "mbsc-cal-next-m" : "mbsc-cal-prev-m") + ' mbsc-cal-prev mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"><div role="button" tabindex="0" class="mbsc-cal-btn-txt ' + (z.btnCalPrevClass || "") + '" aria-label="' + z.prevMonthText + '"></div></div>';
                        for (J = 0; J < pa; ++J) c = c + ('<div class="mbsc-cal-btnw-m" style="width: ' + 100 / pa + '%"><span role="button" class="mbsc-cal-month"></span></div>');
                        c = c + ('<div class="' +
                            (ta ? "mbsc-cal-prev-m" : "mbsc-cal-next-m") + ' mbsc-cal-next mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"><div role="button" tabindex="0" class="mbsc-cal-btn-txt ' + (z.btnCalNextClass || "") + '" aria-label="' + z.nextMonthText + '"></div></div></div>');
                        Va && (d = '<div class="mbsc-cal-btnw"><div class="' + (ta ? "mbsc-cal-next-y" : "mbsc-cal-prev-y") + ' mbsc-cal-prev mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"><div role="button" tabindex="0" class="mbsc-cal-btn-txt ' + (z.btnCalPrevClass || "") + '" aria-label="' + z.prevYearText + '"></div></div><span role="button" class="mbsc-cal-year"></span><div class="' +
                            (ta ? "mbsc-cal-prev-y" : "mbsc-cal-next-y") + ' mbsc-cal-next mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"><div role="button" tabindex="0" class="mbsc-cal-btn-txt ' + (z.btnCalNextClass || "") + '" aria-label="' + z.nextYearText + '"></div></div></div>');
                        if (bb) {
                            ga = z.getYear(xa);
                            oa = z.getYear(Na);
                            Ra = z.getMonth(xa);
                            Pb = z.getMonth(Na);
                            Ib = Math.ceil((oa - ga + 1) / 12) + 2;
                            La = y("month", 36, 24, 0, "", z.monthNames, z.monthNamesShort);
                            Fa = y("year", Ib * 12, oa - ga + 13, ga, qb)
                        }
                        ha = '<div class="mbsc-w-p mbsc-cal-c"><div class="mbsc-cal mbsc-cal-hl-now' +
                            (pa > 1 ? " mbsc-cal-multi " : "") + (za ? " mbsc-cal-weeks " : "") + (Pa ? " mbsc-cal-vertical" : "") + (zb ? "" : " mbsc-cal-hide-diff ") + (z.calendarClass || "") + '"><div class="mbsc-cal-header"><div class="mbsc-cal-btnc ' + (Va ? "mbsc-cal-btnc-ym" : "mbsc-cal-btnc-m") + '">' + (fb < la || pa > 1 ? d + c : c + d) + '</div></div><div class="mbsc-cal-body"><div class="mbsc-cal-m-c mbsc-cal-v"><div class="mbsc-cal-days-c">';
                        for (ca = 0; ca < pa; ++ca) {
                            ha = ha + ('<div aria-hidden="true" class="mbsc-cal-days" style="width: ' + 100 / pa + '%"><table cellpadding="0" cellspacing="0"><tr>');
                            for (J = 0; J < 7; J++) ha = ha + ("<th>" + z["dayNames" + Ya][(J + z.firstDay) % 7] + "</th>");
                            ha = ha + "</tr></table></div>"
                        }
                        ha = ha + ('</div><div class="mbsc-cal-anim-c ' + (z.calendarClass || "") + '"><div class="mbsc-cal-week-nrs-c ' + (z.weekNrClass || "") + '"><div class="mbsc-cal-week-nrs"></div></div><div class="mbsc-cal-anim">');
                        for (J = 0; J < pa + 2 * ja; J++) ha = ha + '<div class="mbsc-cal-slide" aria-hidden="true"></div>';
                        ha = ha + ("</div></div></div>" + La + Fa + "</div></div></div>");
                        Ea.calendar = a(ha)
                    }
                    a.each(z.controls, function(b, c) {
                        Ea[c] = a('<div class="mbsc-cal-pnl" id="' +
                            (lc.id + "_dw_pnl_" + b) + '"></div>').append(a('<div class="mbsc-cal-pnl-i"></div>').append(Ea[c])).appendTo(Ia)
                    });
                    f = '<div class="mbsc-cal-tabs"><ul role="tablist">';
                    a.each(z.controls, function(a, b) {
                        Ea[b] && (f = f + ('<li role="tab" aria-controls="' + (lc.id + "_dw_pnl_" + a) + '" class="mbsc-cal-tab ' + (a ? "" : vb) + '" data-control="' + b + '"><a href="#" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-cal-tab-i ' + (!a ? Wa : "") + '">' + z[b + "Text"] + "</a></li>"))
                    });
                    f = f + "</ul></div>";
                    Ia.before(f);
                    da = a(".mbsc-cal-anim-c", N);
                    ma = a(".mbsc-cal-anim",
                        da);
                    Ga = a(".mbsc-cal-week-nrs", da);
                    if (ea) {
                        ia = true;
                        cb = a(".mbsc-cal-slide", ma).each(function(b, c) {
                            Aa.push(a(c))
                        });
                        cb.slice(ja, ja + pa).addClass("mbsc-cal-slide-a").removeAttr("aria-hidden");
                        for (J = 0; J < Ta; J++) u(Aa[J], 100 * (J - ja) * kb);
                        s(qa, sa);
                        na = new e.classes.ScrollView(da[0], {
                            axis: Pa ? "Y" : "X",
                            easing: "",
                            contSize: 0,
                            snap: 1,
                            maxSnapScroll: ja,
                            moveElement: ma,
                            mousewheel: z.mousewheel,
                            time: 200,
                            lock: true,
                            stopProp: false,
                            onGestureStart: function(a, b) {
                                b.settings.scrollLock = l.scrollLock
                            },
                            onAnimationEnd: function(a) {
                                (a = Math.round(((Pa ?
                                    a.posY : a.posX) - aa) / Z) * kb) && v(qa, sa - a, a > 0 ? "prev" : "next", a > 0 ? a : -a)
                            }
                        })
                    }
                    ra = a(".mbsc-cal-month", N);
                    Ja = a(".mbsc-cal-year", N);
                    wa = a(".mbsc-cal-m-c", N);
                    if (bb) {
                        wa.on("webkitAnimationEnd animationend", Y);
                        La = a(".mbsc-cal-month-c", N).on("webkitAnimationEnd animationend", Y);
                        Fa = a(".mbsc-cal-year-c", N).on("webkitAnimationEnd animationend", Y);
                        a(".mbsc-cal-sc-p", N);
                        ob = {
                            axis: Pa ? "Y" : "X",
                            contSize: 0,
                            snap: 1,
                            maxSnapScroll: 1,
                            rtl: z.rtl,
                            mousewheel: z.mousewheel,
                            time: 200
                        };
                        Za = new e.classes.ScrollView(Fa[0], ob);
                        fa = new e.classes.ScrollView(La[0],
                            ob)
                    }
                    T ? N.addClass("mbsc-cal-liq") : a(".mbsc-cal", N).width(wb || 280 * pa);
                    z.calendarHeight && a(".mbsc-cal-anim-c", N).height(z.calendarHeight);
                    l.tap(da, function(b) {
                        b = a(b.target);
                        if (!$a && !na.scrolled && z.readonly !== true) {
                            b = b.closest(".mbsc-cal-day", this);
                            b.hasClass("mbsc-cal-day-v") && U.call(b[0])
                        }
                    });
                    a(".mbsc-cal-btn", N).on("touchstart mousedown keydown", j).on("touchmove", D).on("touchend touchcancel keyup", w);
                    a(".mbsc-cal-tab", N).on("touchstart click", function(b) {
                        p(b, this) && q.running && l.changeTab(a(this).attr("data-control"))
                    });
                    if (bb) {
                        l.tap(a(".mbsc-cal-month", N), function() {
                            if (!Fa.hasClass("mbsc-cal-v")) {
                                R(wa);
                                ia = wa.hasClass("mbsc-cal-v")
                            }
                            R(La);
                            A(Fa)
                        });
                        l.tap(a(".mbsc-cal-year", N), function() {
                            Fa.hasClass("mbsc-cal-v") || Za.scroll(Ma);
                            if (!La.hasClass("mbsc-cal-v")) {
                                R(wa);
                                ia = wa.hasClass("mbsc-cal-v")
                            }
                            R(Fa);
                            A(La)
                        });
                        l.tap(a(".mbsc-cal-month-s", N), function() {
                            !fa.scrolled && !a(this).hasClass("mbsc-fr-btn-d") && l.navigate(z.getDate(qa, a(this).attr("data-val"), 1))
                        });
                        l.tap(a(".mbsc-cal-year-s", N), function() {
                            if (!Za.scrolled) {
                                Q = z.getDate(a(this).attr("data-val"),
                                    sa, 1);
                                l.navigate(new Date(h.constrain(Q, xa, Na)))
                            }
                        });
                        l.tap(Fa, function() {
                            if (!Za.scrolled) {
                                A(Fa);
                                P(wa);
                                ia = true
                            }
                        });
                        l.tap(La, function() {
                            if (!fa.scrolled) {
                                A(La);
                                P(wa);
                                ia = true
                            }
                        })
                    }
                },
                onShow: function() {
                    ea && k(qa, sa)
                },
                onPosition: function(b) {
                    var c, d, e, g = 0,
                        h = 0,
                        i = 0,
                        j = b.windowHeight;
                    if (T) {
                        Ha && da.height("");
                        Ia.height("");
                        ma.width("")
                    }
                    Z && (e = Z);
                    ea && (Z = Math.round(Math.round(da[0][Pa ? "offsetHeight" : "offsetWidth"]) / pa));
                    if (Z) {
                        N.removeClass("mbsc-cal-m mbsc-cal-l");
                        Z > 1024 ? N.addClass("mbsc-cal-l") : Z > 640 && N.addClass("mbsc-cal-m")
                    }
                    if (sb &&
                        (va || T) || pb) {
                        a(".mbsc-cal-pnl", N).removeClass("mbsc-cal-pnl-h");
                        a.each(Ea, function(a, b) {
                            c = b[0].offsetWidth;
                            g = Math.max(g, c);
                            h = Math.max(h, b[0].offsetHeight);
                            i = i + c
                        });
                        if (sb || pb && i > (C[0].innerWidth || C.innerWidth())) {
                            d = true;
                            Ca = a(".mbsc-cal-tabs .mbsc-cal-tab-sel", N).attr("data-control");
                            V.addClass("mbsc-cal-tabbed")
                        } else {
                            Ca = "calendar";
                            h = g = "";
                            V.removeClass("mbsc-cal-tabbed");
                            Ia.css({
                                width: "",
                                height: ""
                            })
                        }
                    }
                    if (T && Ha && ea) {
                        l._isFullScreen = true;
                        d && Ia.height(Ea.calendar[0].offsetHeight);
                        b = V[0].offsetHeight;
                        j >=
                            b && da.height(j - b + da[0].offsetHeight);
                        h = Math.max(h, Ea.calendar[0].offsetHeight)
                    }
                    if (d) {
                        Ia.css({
                            width: T ? "" : g,
                            height: h
                        });
                        ea && (Z = Math.round(Math.round(da[0][Pa ? "offsetHeight" : "offsetWidth"]) / pa))
                    }
                    if (Z) {
                        ma[Pa ? "height" : "width"](Z);
                        if (Z !== e) {
                            if (Va) {
                                ka = z.maxMonthWidth > a(".mbsc-cal-btnw-m", N).width() ? z.monthNamesShort : z.monthNames;
                                for (J = 0; J < pa; ++J) a(ra[J]).text(ka[z.getMonth(z.getDate(qa, sa - ya + J, 1))])
                            }
                            if (bb) {
                                b = Fa[0][Pa ? "offsetHeight" : "offsetWidth"];
                                a.extend(Za.settings, {
                                    contSize: b,
                                    snap: b,
                                    minScroll: (2 - Ib) * b,
                                    maxScroll: -b
                                });
                                a.extend(fa.settings, {
                                    contSize: b,
                                    snap: b,
                                    minScroll: -b,
                                    maxScroll: -b
                                });
                                Za.refresh();
                                fa.refresh();
                                Fa.hasClass("mbsc-cal-v") && Za.scroll(Ma)
                            }
                            if (T && !va && e) {
                                b = aa / e;
                                aa = b * Z
                            }
                            f(qa, sa, !e)
                        }
                    } else Z = e;
                    if (d) {
                        a(".mbsc-cal-pnl", N).addClass("mbsc-cal-pnl-h");
                        Ea[Ca].removeClass("mbsc-cal-pnl-h")
                    }
                    l.trigger("onCalResize");
                    va = false
                },
                onHide: function() {
                    ub = [];
                    Aa = [];
                    sa = qa = Ca = null;
                    $a = true;
                    Z = 0;
                    na && na.destroy();
                    if (bb && Za && fa) {
                        Za.destroy();
                        fa.destroy()
                    }
                },
                onValidated: function(a) {
                    var b, c, f;
                    c = l.getDate(true);
                    if (r) b =
                        "calendar";
                    else
                        for (f in l.order) f && l.order[f] === a && (b = /[mdy]/.test(f) ? "date" : "time");
                    l.trigger("onSetDate", {
                        date: c,
                        control: b
                    });
                    I(c);
                    r = false
                }
            });
            return ba
        }
    })(window, document);
    (function(j) {
        var c = q,
            b = c.$,
            e = c.util.datetime,
            a = e.adjustedDate,
            d = new Date,
            h = {
                startYear: d.getFullYear() - 100,
                endYear: d.getFullYear() + 1,
                separator: " ",
                dateFormat: "mm/dd/yy",
                dateDisplay: "MMddyy",
                timeFormat: "hh:ii A",
                dayText: "Day",
                monthText: "Month",
                yearText: "Year",
                hourText: "Hours",
                minuteText: "Minutes",
                ampmText: "&nbsp;",
                secText: "Seconds",
                nowText: "Now"
            },
            i = function(d) {
                function i(a, b, c) {
                    return A[b] !== j && (a = +a[A[b]], !isNaN(a)) ? a : R[b] !== j ? R[b] : c !== j ? c : Y[b](Z)
                }

                function o(a) {
                    return {
                        value: a,
                        display: (ba.match(/yy/i) ? a : (a + "").substr(2, 2)) + (B.yearSuffix || "")
                    }
                }

                function n(a) {
                    return a
                }

                function l(a, b, c, f, d, e, g) {
                    b.push({
                        data: f,
                        label: c,
                        min: e,
                        max: g,
                        getIndex: d,
                        cssClass: a
                    })
                }

                function q(a, b, c, f) {
                    return Math.min(f, Math.floor(a / b) * b + c)
                }

                function D(a) {
                    if (null === a) return a;
                    var b = i(a, "y"),
                        c = i(a, "m"),
                        f = Math.min(i(a, "d"), B.getMaxDayOfMonth(b, c)),
                        d = i(a, "h", 0);
                    return B.getDate(b, c, f, i(a, "a", 0) ? d + 12 : d, i(a, "i", 0), i(a, "s", 0), i(a, "u", 0))
                }

                function w(a, b) {
                    var c, f, d = !1,
                        e = !1,
                        h = 0,
                        i = 0;
                    ha = D(g(ha));
                    va = D(g(va));
                    if (x(a)) return a;
                    a < ha && (a = ha);
                    a > va && (a = va);
                    f = c = a;
                    if (2 !== b)
                        for (d = x(c); !d && c < va;) c = new Date(c.getTime() + 864E5), d = x(c), h++;
                    if (1 !== b)
                        for (e = x(f); !e && f > ha;) f = new Date(f.getTime() - 864E5), e = x(f), i++;
                    return 1 === b && d ? c : 2 === b && e ? f : i <= h && e ? f : c
                }

                function x(a) {
                    return a < ha || a > va ? !1 : E(a, J) ? !0 : E(a, Q) ? !1 : !0
                }

                function E(a, b) {
                    var c, f, d;
                    if (b)
                        for (f = 0; f < b.length; f++)
                            if (c = b[f], d = c + "", !c.start)
                                if (c.getTime) {
                                    if (a.getFullYear() == c.getFullYear() && a.getMonth() == c.getMonth() && a.getDate() == c.getDate()) return !0
                                } else if (d.match(/w/i)) {
                        if (d = +d.replace("w", ""), d == a.getDay()) return !0
                    } else if (d = d.split("/"), d[1]) {
                        if (d[0] - 1 == a.getMonth() && d[1] == a.getDate()) return !0
                    } else if (d[0] == a.getDate()) return !0;
                    return !1
                }

                function t(a, b, c, f, d, e, g) {
                    var h, i, l;
                    if (a)
                        for (h = 0; h < a.length; h++)
                            if (i = a[h], l = i + "", !i.start)
                                if (i.getTime) B.getYear(i) == b && B.getMonth(i) == c && (e[B.getDay(i)] = g);
                                else if (l.match(/w/i)) {
                        l = +l.replace("w",
                            "");
                        for (m = l - f; m < d; m += 7) 0 <= m && (e[m + 1] = g)
                    } else l = l.split("/"), l[1] ? l[0] - 1 == c && (e[l[1]] = g) : e[l[0]] = g
                }

                function y(a, c, f, d, e, g, h, i, l) {
                    var k, m, n, A, s, v, o, Q, J, p, P, w, t, D, x, R, C, y, U = {},
                        M = {
                            h: aa,
                            i: r,
                            s: ea,
                            a: 1
                        },
                        ca = B.getDate(e, g, h),
                        G = ["a", "h", "i", "s"];
                    a && (b.each(a, function(a, b) {
                        if (b.start && (b.apply = !1, k = b.d, m = k + "", n = m.split("/"), k && (k.getTime && e == B.getYear(k) && g == B.getMonth(k) && h == B.getDay(k) || !m.match(/w/i) && (n[1] && h == n[1] && g == n[0] - 1 || !n[1] && h == n[0]) || m.match(/w/i) && ca.getDay() == +m.replace("w", "")))) b.apply = !0, U[ca] = !0
                    }), b.each(a, function(a, b) {
                        D = t = 0;
                        P = u[f];
                        w = F[f];
                        o = v = !0;
                        x = !1;
                        if (b.start && (b.apply || !b.d && !U[ca])) {
                            A = b.start.split(":");
                            s = b.end.split(":");
                            for (p = 0; 3 > p; p++) A[p] === j && (A[p] = 0), s[p] === j && (s[p] = 59), A[p] = +A[p], s[p] = +s[p];
                            A.unshift(11 < A[0] ? 1 : 0);
                            s.unshift(11 < s[0] ? 1 : 0);
                            da && (12 <= A[1] && (A[1] -= 12), 12 <= s[1] && (s[1] -= 12));
                            for (p = 0; p < c; p++)
                                if (S[p] !== j) {
                                    Q = q(A[p], M[G[p]], u[G[p]], F[G[p]]);
                                    J = q(s[p], M[G[p]], u[G[p]], F[G[p]]);
                                    y = C = R = 0;
                                    da && 1 == p && (R = A[0] ? 12 : 0, C = s[0] ? 12 : 0, y = S[0] ? 12 : 0);
                                    v || (Q = 0);
                                    o || (J = F[G[p]]);
                                    if ((v || o) && Q + R < S[p] +
                                        y && S[p] + y < J + C) x = !0;
                                    S[p] != Q && (v = !1);
                                    S[p] != J && (o = !1)
                                }
                            if (!l)
                                for (p = c + 1; 4 > p; p++) 0 < A[p] && (t = M[f]), s[p] < F[G[p]] && (D = M[f]);
                            x || (Q = q(A[c], M[f], u[f], F[f]) + t, J = q(s[c], M[f], u[f], F[f]) - D, v && (P = Q), o && (w = J + 1));
                            if (v || o || x)
                                for (p = P; p < w; p++) i[p] = !l
                        }
                    }))
                }

                function g(a, c) {
                    var f = [];
                    if (null === a || a === j) return a;
                    b.each("y,m,d,a,h,i,s,u".split(","), function(b, d) {
                        A[d] !== j && (f[A[d]] = Y[d](a));
                        c && (R[d] = Y[d](a))
                    });
                    return f
                }

                function k(b) {
                    var c, f, d, e = [];
                    if (b) {
                        for (c = 0; c < b.length; c++)
                            if (f = b[c], f.start && f.start.getTime)
                                for (d = new Date(f.start); d <=
                                    f.end;) e.push(a(d.getFullYear(), d.getMonth(), d.getDate())), d.setDate(d.getDate() + 1);
                            else e.push(f);
                        return e
                    }
                    return b
                }
                var G = b(this),
                    H = {},
                    I;
                if (G.is("input")) {
                    switch (G.attr("type")) {
                        case "date":
                            I = "yy-mm-dd";
                            break;
                        case "datetime":
                            I = "yy-mm-ddTHH:ii:ssZ";
                            break;
                        case "datetime-local":
                            I = "yy-mm-ddTHH:ii:ss";
                            break;
                        case "month":
                            I = "yy-mm";
                            H.dateOrder = "mmyy";
                            break;
                        case "time":
                            I = "HH:ii:ss"
                    }
                    var s = G.attr("min"),
                        G = G.attr("max");
                    s && (H.minDate = e.parseDate(I, s));
                    G && (H.maxDate = e.parseDate(I, G))
                }
                var f, m, v, U, u, F, O, s = b.extend({},
                        d.settings),
                    B = b.extend(d.settings, c.util.datetime.defaults, h, H, s),
                    K = 0,
                    S = [],
                    H = [],
                    P = [],
                    A = {},
                    R = {},
                    Y = {
                        y: function(a) {
                            return B.getYear(a)
                        },
                        m: function(a) {
                            return B.getMonth(a)
                        },
                        d: function(a) {
                            return B.getDay(a)
                        },
                        h: function(a) {
                            a = a.getHours();
                            a = da && 12 <= a ? a - 12 : a;
                            return q(a, aa, Ga, ka)
                        },
                        i: function(a) {
                            return q(a.getMinutes(), r, wa, na)
                        },
                        s: function(a) {
                            return q(a.getSeconds(), ea, ia, fa)
                        },
                        u: function(a) {
                            return a.getMilliseconds()
                        },
                        a: function(a) {
                            return C && 11 < a.getHours() ? 1 : 0
                        }
                    },
                    Q = B.invalid,
                    J = B.valid,
                    s = B.preset,
                    ca = B.dateWheels ||
                    B.dateFormat,
                    ba = B.dateWheels || B.dateDisplay,
                    V = B.timeWheels || B.timeFormat,
                    N = ba.match(/D/),
                    C = V.match(/a/i),
                    da = V.match(/h/),
                    ma = "datetime" == s ? B.dateFormat + B.separator + B.timeFormat : "time" == s ? B.timeFormat : B.dateFormat,
                    Z = new Date,
                    G = B.steps || {},
                    aa = G.hour || B.stepHour || 1,
                    r = G.minute || B.stepMinute || 1,
                    ea = G.second || B.stepSecond || 1,
                    G = G.zeroBased,
                    ha = B.min || a(B.startYear, 0, 1),
                    va = B.max || a(B.endYear, 11, 31, 23, 59, 59),
                    Ga = G ? 0 : ha.getHours() % aa,
                    wa = G ? 0 : ha.getMinutes() % r,
                    ia = G ? 0 : ha.getSeconds() % ea,
                    ka = Math.floor(((da ? 11 : 23) -
                        Ga) / aa) * aa + Ga,
                    na = Math.floor((59 - wa) / r) * r + wa,
                    fa = Math.floor((59 - wa) / r) * r + wa;
                I = I || ma;
                if (s.match(/date/i)) {
                    b.each(["y", "m", "d"], function(a, b) {
                        f = ca.search(RegExp(b, "i")); - 1 < f && P.push({
                            o: f,
                            v: b
                        })
                    });
                    P.sort(function(a, b) {
                        return a.o > b.o ? 1 : -1
                    });
                    b.each(P, function(a, b) {
                        A[b.v] = a
                    });
                    G = [];
                    for (m = 0; 3 > m; m++)
                        if (m == A.y) K++, l("mbsc-dt-whl-y", G, B.yearText, o, n, B.getYear(ha), B.getYear(va));
                        else if (m == A.m) {
                        K++;
                        v = [];
                        for (f = 0; 12 > f; f++) O = ba.replace(/[dy]/gi, "").replace(/mm/, (9 > f ? "0" + (f + 1) : f + 1) + (B.monthSuffix || "")).replace(/m/,
                            f + 1 + (B.monthSuffix || "")), v.push({
                            value: f,
                            display: O.match(/MM/) ? O.replace(/MM/, '<span class="mbsc-dt-month">' + B.monthNames[f] + "</span>") : O.replace(/M/, '<span class="mbsc-dt-month">' + B.monthNamesShort[f] + "</span>")
                        });
                        l("mbsc-dt-whl-m", G, B.monthText, v)
                    } else if (m == A.d) {
                        K++;
                        v = [];
                        for (f = 1; 32 > f; f++) v.push({
                            value: f,
                            display: (ba.match(/dd/i) && 10 > f ? "0" + f : f) + (B.daySuffix || "")
                        });
                        l("mbsc-dt-whl-d", G, B.dayText, v)
                    }
                    H.push(G)
                }
                if (s.match(/time/i)) {
                    U = !0;
                    P = [];
                    b.each(["h", "i", "s", "a"], function(a, b) {
                        a = V.search(RegExp(b,
                            "i")); - 1 < a && P.push({
                            o: a,
                            v: b
                        })
                    });
                    P.sort(function(a, b) {
                        return a.o > b.o ? 1 : -1
                    });
                    b.each(P, function(a, b) {
                        A[b.v] = K + a
                    });
                    G = [];
                    for (m = K; m < K + 4; m++)
                        if (m == A.h) {
                            K++;
                            v = [];
                            for (f = Ga; f < (da ? 12 : 24); f += aa) v.push({
                                value: f,
                                display: da && 0 === f ? 12 : V.match(/hh/i) && 10 > f ? "0" + f : f
                            });
                            l("mbsc-dt-whl-h", G, B.hourText, v)
                        } else if (m == A.i) {
                        K++;
                        v = [];
                        for (f = wa; 60 > f; f += r) v.push({
                            value: f,
                            display: V.match(/ii/) && 10 > f ? "0" + f : f
                        });
                        l("mbsc-dt-whl-i", G, B.minuteText, v)
                    } else if (m == A.s) {
                        K++;
                        v = [];
                        for (f = ia; 60 > f; f += ea) v.push({
                            value: f,
                            display: V.match(/ss/) &&
                                10 > f ? "0" + f : f
                        });
                        l("mbsc-dt-whl-s", G, B.secText, v)
                    } else m == A.a && (K++, s = V.match(/A/), l("mbsc-dt-whl-a", G, B.ampmText, s ? [{
                        value: 0,
                        display: B.amText.toUpperCase()
                    }, {
                        value: 1,
                        display: B.pmText.toUpperCase()
                    }] : [{
                        value: 0,
                        display: B.amText
                    }, {
                        value: 1,
                        display: B.pmText
                    }]));
                    H.push(G)
                }
                d.getVal = function(a) {
                    return d._hasValue || a ? D(d.getArrayVal(a)) : null
                };
                d.setDate = function(a, b, c, f, e) {
                    d.setArrayVal(g(a), b, e, f, c)
                };
                d.getDate = d.getVal;
                d.format = ma;
                d.order = A;
                d.handlers.now = function() {
                    d.setDate(new Date, d.live, 200, !0, !0)
                };
                d.buttons.now = {
                    text: B.nowText,
                    handler: "now"
                };
                Q = k(Q);
                J = k(J);
                u = {
                    y: ha.getFullYear(),
                    m: 0,
                    d: 1,
                    h: Ga,
                    i: wa,
                    s: ia,
                    a: 0
                };
                F = {
                    y: va.getFullYear(),
                    m: 11,
                    d: 31,
                    h: ka,
                    i: na,
                    s: fa,
                    a: 1
                };
                return {
                    compClass: "mbsc-dt",
                    wheels: H,
                    headerText: B.headerText ? function() {
                        return e.formatDate(ma, D(d.getArrayVal(!0)), B)
                    } : !1,
                    formatValue: function(a) {
                        return e.formatDate(I, D(a), B)
                    },
                    parseValue: function(a) {
                        a || (R = {});
                        return g(a ? e.parseDate(I, a, B) : B.defaultValue && B.defaultValue.getTime ? B.defaultValue : new Date, !!a && !!a.getTime)
                    },
                    validate: function(a) {
                        var c, f, e, h;
                        c = a.index;
                        var l = a.direction,
                            k = d.settings.wheels[0][A.d],
                            a = w(D(a.values), l),
                            m = g(a),
                            n = [],
                            a = {},
                            s = i(m, "y"),
                            v = i(m, "m"),
                            o = B.getMaxDayOfMonth(s, v),
                            r = !0,
                            P = !0;
                        b.each("y,m,d,a,h,i,s".split(","), function(a, c) {
                            if (A[c] !== j) {
                                var d = u[c],
                                    e = F[c],
                                    g = i(m, c);
                                n[A[c]] = [];
                                r && ha && (d = Y[c](ha));
                                P && va && (e = Y[c](va));
                                if (c != "y")
                                    for (f = u[c]; f <= F[c]; f++)(f < d || f > e) && n[A[c]].push(f);
                                g < d && (g = d);
                                g > e && (g = e);
                                r && (r = g == d);
                                P && (P = g == e);
                                if (c == "d") {
                                    d = B.getDate(s, v, 1).getDay();
                                    e = {};
                                    t(Q, s, v, d, o, e, 1);
                                    t(J, s, v, d, o, e, 0);
                                    b.each(e, function(a, b) {
                                        b && n[A[c]].push(a)
                                    })
                                }
                            }
                        });
                        U && b.each(["a", "h", "i", "s"], function(a, c) {
                            var f = i(m, c),
                                e = i(m, "d"),
                                g = {};
                            A[c] !== j && (n[A[c]] = [], y(Q, a, c, m, s, v, e, g, 0), y(J, a, c, m, s, v, e, g, 1), b.each(g, function(a, b) {
                                b && n[A[c]].push(a)
                            }), S[a] = d.getValidValue(A[c], f, l, g))
                        });
                        if (k && (k._length !== o || N && (c === j || c === A.y || c === A.m))) {
                            a[A.d] = k;
                            k.data = [];
                            for (c = 1; c <= o; c++) h = B.getDate(s, v, c).getDay(), e = ba.replace(/[my]/gi, "").replace(/dd/, (10 > c ? "0" + c : c) + (B.daySuffix || "")).replace(/d/, c + (B.daySuffix || "")), k.data.push({
                                value: c,
                                display: e.match(/DD/) ? e.replace(/DD/, '<span class="mbsc-dt-day">' +
                                    B.dayNames[h] + "</span>") : e.replace(/D/, '<span class="mbsc-dt-day">' + B.dayNamesShort[h] + "</span>")
                            });
                            d._tempWheelArray[A.d] = m[A.d];
                            d.changeWheel(a)
                        }
                        return {
                            disabled: n,
                            valid: m
                        }
                    }
                }
            };
        b.each(["date", "time", "datetime"], function(a, b) {
            c.presets.scroller[b] = i
        })
    })();
    (function(j) {
        var c = q,
            b = c.$,
            e = {
                invalid: [],
                showInput: !0,
                inputClass: ""
            };
        c.presets.scroller.list = function(a) {
            function c(a, b, f) {
                var d = 0,
                    e, g, l = [
                        []
                    ],
                    k = I;
                if (b)
                    for (e = 0; e < b; e++) D ? l[0][e] = {} : l[e] = [{}];
                for (; d < a.length;) {
                    D ? l[0][d] = i(k, s[d]) : l[d] = [i(k, s[d])];
                    e =
                        0;
                    for (b = j; e < k.length && b === j;) {
                        if (k[e].key == a[d] && (f !== j && d <= f || f === j)) b = e;
                        e++
                    }
                    if (b !== j && k[b].children) d++, k = k[b].children;
                    else if ((g = h(k)) && g.children) d++, k = g.children;
                    else break
                }
                return l
            }

            function h(a, b) {
                if (!a) return !1;
                for (var c = 0, f; c < a.length;)
                    if (!(f = a[c++]).invalid) return b ? c - 1 : f;
                return !1
            }

            function i(a, b) {
                for (var c = {
                        data: [],
                        label: b
                    }, f = 0; f < a.length;) c.data.push({
                    value: a[f].key,
                    display: a[f].value
                }), f++;
                return c
            }

            function q(c) {
                a._isVisible && b(".mbsc-sc-whl-w", a._markup).css("display", "").slice(c).hide()
            }

            function p(a, b) {
                var c = [],
                    f = I,
                    d = 0,
                    e = !1,
                    g, i;
                if (a[d] !== j && d <= b) {
                    e = 0;
                    g = a[d];
                    for (i = j; e < f.length && i === j;) f[e].key == a[d] && !f[e].invalid && (i = e), e++
                } else i = h(f, !0), g = f[i].key;
                e = i !== j ? f[i].children : !1;
                for (c[d] = g; e;) {
                    f = f[i].children;
                    d++;
                    if (a[d] !== j && d <= b) {
                        e = 0;
                        g = a[d];
                        for (i = j; e < f.length && i === j;) f[e].key == a[d] && !f[e].invalid && (i = e), e++
                    } else i = h(f, !0), i = !1 === i ? j : i, g = f[i].key;
                    e = i !== j && h(f[i].children) ? f[i].children : !1;
                    c[d] = g
                }
                return {
                    lvl: d + 1,
                    nVector: c
                }
            }

            function o(c) {
                var f = [];
                g = g > k++ ? g : k;
                c.children("li").each(function(c) {
                    var d =
                        b(this),
                        e = d.clone();
                    e.children("ul,ol").remove();
                    var e = a._processMarkup ? a._processMarkup(e) : e.html().replace(/^\s\s*/, "").replace(/\s\s*$/, ""),
                        g = d.attr("data-invalid") ? !0 : !1,
                        c = {
                            key: d.attr("data-val") === j || null === d.attr("data-val") ? c : d.attr("data-val"),
                            value: e,
                            invalid: g,
                            children: null
                        },
                        d = d.children("ul,ol");
                    d.length && (c.children = o(d));
                    f.push(c)
                });
                k--;
                return f
            }

            function n(b, f, e) {
                for (var g = (f || 0) + 1, h = [], i = {}, l = {}, i = c(b, null, f), f = 0; f < b.length; f++) a._tempWheelArray[f] = b[f] = e.nVector[f] || 0;
                for (; g < e.lvl;) l[g] =
                    D ? i[0][g] : i[g][0], h.push(g++);
                q(e.lvl);
                H = b.slice(0);
                h.length && (t = !0, a.changeWheel(l))
            }
            var l = b.extend({}, a.settings),
                L = b.extend(a.settings, e, l),
                l = L.layout || (/top|bottom/.test(L.display) ? "liquid" : ""),
                D = "liquid" == l,
                w = L.readonly,
                x = b(this),
                E, t, y = this.id + "_dummy",
                g = 0,
                k = 0,
                G, H = [],
                I = L.wheelArray || o(x),
                s = function(a) {
                    var b = [],
                        c;
                    for (c = 0; c < a; c++) b[c] = L.labels && L.labels[c] ? L.labels[c] : c;
                    return b
                }(g),
                f = function(a) {
                    var b = [],
                        c;
                    c = !0;
                    for (var f = 0; c;) c = h(a), b[f++] = c.key, (c = c.children) && (a = c);
                    return b
                }(I),
                m = c(f, g);
            b("#" +
                y).remove();
            L.showInput && (E = b('<input type="text" id="' + y + '" value="" class="' + L.inputClass + '" placeholder="' + (L.placeholder || "") + '" readonly />').insertBefore(x), L.anchor = E, a.attachShow(E));
            L.wheelArray || x.hide();
            return {
                wheels: m,
                layout: l,
                headerText: !1,
                setOnTap: 1 == g,
                formatValue: function(a) {
                    if (G === j) G = p(a, a.length).lvl;
                    return a.slice(0, G).join(" ")
                },
                parseValue: function(a) {
                    return a ? (a + "").split(" ") : (L.defaultValue || f).slice(0)
                },
                onBeforeShow: function() {
                    var b = a.getArrayVal(true);
                    H = b.slice(0);
                    L.wheels =
                        c(b, g, g);
                    t = true
                },
                onWheelGestureStart: function(a) {
                    for (var b = g, a = a.index, c = []; b;) c[--b] = true;
                    c[a] = false;
                    L.readonly = c
                },
                onWheelAnimationEnd: function(b) {
                    var b = b.index,
                        c = a.getArrayVal(true),
                        f = p(c, b);
                    G = f.lvl;
                    L.readonly = w;
                    c[b] != H[b] && n(c, b, f)
                },
                onFill: function(a) {
                    G = j;
                    E && E.val(a.valueText)
                },
                validate: function(a) {
                    var b = a.values,
                        a = a.index,
                        c = p(b, b.length);
                    G = c.lvl;
                    if (a === j) {
                        q(c.lvl);
                        t || n(b, a, c)
                    }
                    t = false;
                    for (var a = G, c = I, f = 0, d = []; f < a;) {
                        for (var e = d, g = f, h = 0, i = void 0, l = c, k = []; h < f;) {
                            var m = b[h];
                            for (i in l)
                                if (l[i].key ==
                                    m) {
                                    l = l[i].children;
                                    break
                                }
                            h++
                        }
                        for (h = 0; h < l.length;) {
                            l[h].invalid && k.push(l[h].key);
                            h++
                        }
                        e[g] = k;
                        f++
                    }
                    return {
                        disabled: d
                    }
                },
                onDestroy: function() {
                    E && E.remove();
                    x.show()
                }
            }
        }
    })();
    (function(j) {
        var c = q,
            b = c.$,
            e = {
                batch: 50,
                min: 0,
                max: 100,
                defaultUnit: "",
                units: null,
                unitNames: null,
                invalid: [],
                sign: !1,
                step: 0.05,
                scale: 2,
                convert: function(a) {
                    return a
                },
                signText: "&nbsp;",
                wholeText: "Whole",
                fractionText: "Fraction",
                unitText: "Unit"
            };
        c.presets.scroller.measurement = function(a) {
            function c(a) {
                return Math.max(R, Math.min(Y, s ? 0 > a ? Math.ceil(a) :
                    Math.floor(a) : p(Math.round(a - ca), U) + ca))
            }

            function h(a) {
                return s ? p((Math.abs(a) - Math.abs(c(a))) * v - ba, U) + ba : 0
            }

            function i(a) {
                var b = c(a),
                    f = h(a);
                f >= v && (0 > a ? b-- : b++, f = 0);
                return [0 > a ? "-" : "+", b, f]
            }

            function q(a) {
                var b = +a[K];
                return (k && "-" == a[0] ? -1 : 1) * (b + (s ? a[B] / v * (0 > b ? -1 : 1) : 0))
            }

            function p(a, b) {
                return Math.round(a / b) * b
            }

            function o(a, b) {
                for (a += ""; a.length < b;) a = "0" + a;
                return a
            }

            function n(a, b, c) {
                return b === c || !x.convert ? a : x.convert.call(this, a, b, c)
            }

            function l(a, b, c) {
                a = a > c ? c : a;
                return a < b ? b : a
            }

            function L(a) {
                var b;
                P =
                    n(x.min, H, a);
                A = n(x.max, H, a);
                s ? (R = 0 > P ? Math.ceil(P) : Math.floor(P), Y = 0 > A ? Math.ceil(A) : Math.floor(A), Q = h(P), J = h(A)) : (R = Math.round(P), Y = Math.round(A), Y = R + Math.floor((Y - R) / U) * U, ca = R % U);
                a = R;
                b = Y;
                k && (b = Math.abs(a) > Math.abs(b) ? Math.abs(a) : Math.abs(b), a = 0 > a ? 0 : a);
                y.min = 0 > a ? Math.ceil(a / f) : Math.floor(a / f);
                y.max = 0 > b ? Math.ceil(b / f) : Math.floor(b / f)
            }

            function D(a) {
                return q(a).toFixed(s ? m : 0) + (G ? " " + I[a[S]] : "")
            }
            var w = b.extend({}, a.settings),
                x = b.extend(a.settings, e, w),
                E = {},
                w = [
                    []
                ],
                t = {},
                y = {},
                E = {},
                g = [],
                k = x.sign,
                G = x.units &&
                x.units.length,
                H = G ? x.defaultUnit || x.units[0] : "",
                I = [],
                s = 1 > x.step,
                f = 1 < x.step ? x.step : 1,
                m = s ? Math.max(x.scale, (x.step + "").split(".")[1].length) : 1,
                v = Math.pow(10, m),
                U = Math.round(s ? x.step * v : x.step),
                u, F, O, B, K, S, P, A, R, Y, Q, J, ca = 0,
                ba = 0,
                V, N, C = 0;
            a.setVal = function(c, f, d, e, g) {
                a._setVal(b.isArray(c) ? D(c) : c, f, d, e, g)
            };
            if (x.units)
                for (N = 0; N < x.units.length; ++N) V = x.units[N], I.push(x.unitNames ? x.unitNames[V] || V : V);
            if (k)
                if (k = !1, G)
                    for (N = 0; N < x.units.length; N++) 0 > n(x.min, H, x.units[N]) && (k = !0);
                else k = 0 > x.min;
            k && (w[0].push({
                data: ["-",
                    "+"
                ],
                label: x.signText
            }), C++);
            y = {
                label: x.wholeText,
                data: function(a) {
                    return R % f + a * f
                },
                getIndex: function(a) {
                    return Math.round((a - R % f) / f)
                }
            };
            w[0].push(y);
            K = C++;
            L(H);
            if (s) {
                w[0].push(E);
                E.data = [];
                E.label = x.fractionText;
                for (N = ba; N < v; N += U) g.push(N), E.data.push({
                    value: N,
                    display: "." + o(N, m)
                });
                B = C++;
                u = Math.ceil(100 / U);
                x.invalid && x.invalid.length && (b.each(x.invalid, function(a, b) {
                    var c = b > 0 ? Math.floor(b) : Math.ceil(b);
                    c === 0 && (c = b <= 0 ? -0.001 : 0.001);
                    t[c] = (t[c] || 0) + 1;
                    if (b === 0) {
                        c = 0.001;
                        t[c] = (t[c] || 0) + 1
                    }
                }), b.each(t, function(a,
                    b) {
                    b < u ? delete t[a] : t[a] = a
                }))
            }
            if (G) {
                E = {
                    data: [],
                    label: x.unitText,
                    circular: !1
                };
                for (N = 0; N < x.units.length; N++) E.data.push({
                    value: N,
                    display: I[N]
                });
                w[0].push(E)
            }
            S = C;
            return {
                wheels: w,
                minWidth: k && s ? 70 : 80,
                showLabel: !1,
                formatValue: D,
                parseValue: function(a) {
                    var c = (((typeof a === "number" ? a + "" : a) || x.defaultValue) + "").split(" "),
                        a = +c[0],
                        f = [],
                        d = "";
                    if (G) {
                        d = b.inArray(c[1], I);
                        d = d == -1 ? b.inArray(H, x.units) : d;
                        d = d == -1 ? 0 : d
                    }
                    O = G ? x.units[d] : "";
                    L(O);
                    a = isNaN(a) ? 0 : a;
                    a = l(a, P, A);
                    c = i(a);
                    c[1] = l(c[1], R, Y);
                    F = a;
                    if (k) {
                        f[0] = c[0];
                        c[1] = Math.abs(c[1])
                    }
                    f[K] =
                        c[1];
                    s && (f[B] = c[2]);
                    G && (f[S] = d);
                    return f
                },
                onCancel: function() {
                    F = j
                },
                validate: function(c) {
                    var d, e, h, m, o = c.values;
                    h = c.index;
                    var c = c.direction,
                        v = {},
                        u = [],
                        w = {},
                        D = G ? x.units[o[S]] : "";
                    k && h === 0 && (F = Math.abs(F) * (o[0] == "-" ? -1 : 1));
                    if (h === K || h === B && s || F === j || h === j) {
                        F = q(o);
                        O = D
                    }
                    if (G && h === S && O !== D || h === j) {
                        L(D);
                        F = n(F, O, D);
                        O = D;
                        e = i(F);
                        if (h !== j) {
                            w[K] = y;
                            a.changeWheel(w)
                        }
                        k && (o[0] = e[0])
                    }
                    u[K] = [];
                    if (k) {
                        u[0] = [];
                        if (P > 0) {
                            u[0].push("-");
                            o[0] = "+"
                        }
                        if (A < 0) {
                            u[0].push("+");
                            o[0] = "-"
                        }
                        h = Math.abs(o[0] == "-" ? R : Y);
                        for (C = h + f; C < h + 20 * f; C = C +
                            f) {
                            u[K].push(C);
                            v[C] = true
                        }
                    }
                    F = l(F, P, A);
                    e = i(F);
                    h = k ? Math.abs(e[1]) : e[1];
                    d = k ? o[0] == "-" : F < 0;
                    o[K] = h;
                    d && (e[0] = "-");
                    s && (o[B] = e[2]);
                    b.each(s ? t : x.invalid, function(a, b) {
                        if (k && d)
                            if (b <= 0) b = Math.abs(b);
                            else return;
                        b = p(n(b, H, D), s ? 1 : U);
                        v[b] = true;
                        u[K].push(b)
                    });
                    o[K] = a.getValidValue(K, h, c, v);
                    e[1] = o[K] * (k && d ? -1 : 1);
                    if (s) {
                        u[B] = [];
                        c = k ? o[0] + o[1] : (F < 0 ? "-" : "+") + Math.abs(e[1]);
                        h = (P < 0 ? "-" : "+") + Math.abs(R);
                        w = (A < 0 ? "-" : "+") + Math.abs(Y);
                        c === h && b(g).each(function(a, b) {
                            (d ? b > Q : b < Q) && u[B].push(b)
                        });
                        c === w && b(g).each(function(a, b) {
                            (d ?
                                b < J : b > J) && u[B].push(b)
                        });
                        b.each(x.invalid, function(a, b) {
                            m = i(n(b, H, D));
                            (e[0] === m[0] || e[1] === 0 && m[1] === 0 && m[2] === 0) && e[1] === m[1] && u[B].push(m[2])
                        })
                    }
                    return {
                        disabled: u,
                        valid: o
                    }
                }
            }
        };
        c.presetShort("measurement")
    })();
    (function() {
        function j(a) {
            var b = [Math.round(a.r).toString(16), Math.round(a.g).toString(16), Math.round(a.b).toString(16)];
            i.each(b, function(a, c) {
                1 == c.length && (b[a] = "0" + c)
            });
            return "#" + b.join("")
        }

        function c(a) {
            a = parseInt(-1 < a.indexOf("#") ? a.substring(1) : a, 16);
            return {
                r: a >> 16,
                g: (a & 65280) >> 8,
                b: a & 255
            }
        }

        function b(a) {
            var b, c, d;
            b = a.h;
            var e = 255 * a.s / 100,
                a = 255 * a.v / 100;
            if (0 === e) b = c = d = a;
            else {
                var e = (255 - e) * a / 255,
                    h = (a - e) * (b % 60) / 60;
                360 == b && (b = 0);
                60 > b ? (b = a, d = e, c = e + h) : 120 > b ? (c = a, d = e, b = a - h) : 180 > b ? (c = a, b = e, d = e + h) : 240 > b ? (d = a, b = e, c = a - h) : 300 > b ? (d = a, c = e, b = e + h) : 360 > b ? (b = a, c = e, d = a - h) : b = c = d = 0
            }
            return {
                r: b,
                g: c,
                b: d
            }
        }

        function e(a) {
            var b = 0,
                c;
            c = Math.min(a.r, a.g, a.b);
            var d = Math.max(a.r, a.g, a.b),
                b = d - c,
                b = (c = d ? 255 * b / d : 0) ? a.r == d ? (a.g - a.b) / b : a.g == d ? 2 + (a.b - a.r) / b : 4 + (a.r - a.g) / b : -1,
                b = 60 * b;
            0 > b && (b += 360);
            return {
                h: b,
                s: c * (100 / 255),
                v: d *
                    (100 / 255)
            }
        }

        function a(a) {
            return j(b(a))
        }

        function d(a) {
            return e(c(a))
        }
        var h = q,
            i = h.$,
            M = h.util.prefix,
            p = h.presets.scroller,
            o = {
                preview: !0,
                previewText: !0,
                label: "Color",
                refineLabel: "Refine",
                step: 10,
                nr: 10,
                format: "hex",
                hueText: "Hue",
                saturationText: "Saturation",
                valueText: "Value"
            };
        h.presetShort("color");
        p.color = function(c) {
            function h(a) {
                return isNaN(+a) ? 0 : +a
            }

            function j(c) {
                return "hsv" == y ? c.join(",") : "rgb" == y ? (c = b({
                    h: c[0],
                    s: c[1],
                    v: c[2]
                }), Math.round(c.r) + "," + Math.round(c.g) + "," + Math.round(c.b)) : a({
                    h: c[0],
                    s: c[1],
                    v: c[2]
                })
            }

            function p(a, b, c) {
                a[0].style.backgroundImage = M + ("-webkit-" == M ? "gradient(linear,left top,left bottom,from(" + b + "),to(" + c + "))" : "linear-gradient(" + b + "," + c + ")")
            }

            function w(d, f) {
                var e = c._tempWheelArray;
                1 !== f && 2 !== f && p(i(".mbsc-sc-whl-sc", d).eq(1), a({
                    h: e[0],
                    s: 0,
                    v: 100
                }), a({
                    h: e[0],
                    s: 100,
                    v: 100
                }));
                2 !== f && p(i(".mbsc-sc-whl-sc", d).eq(2), a({
                    h: e[0],
                    s: e[1],
                    v: 0
                }), a({
                    h: e[0],
                    s: e[1],
                    v: 100
                }));
                if (g) {
                    var h = b({
                            h: e[0],
                            s: e[1],
                            v: e[2]
                        }),
                        h = 0.299 * h.r + 0.587 * h.g + 0.114 * h.b;
                    i(".mbsc-color-preview", d).attr("style", "background:" +
                        a({
                            h: e[0],
                            s: e[1],
                            v: e[2]
                        }) + ";color:" + (130 < h ? "#000" : "#fff")).text(k ? j(e) : "")
                }
            }
            var q = i.extend({}, c.settings),
                E = i.extend(c.settings, o, q),
                q = i.isArray(E.colors) ? E.colors : [E.colors],
                t = E.defaultValue || q[0],
                y = E.format,
                g = E.preview,
                k = E.previewText,
                G = E.hueText,
                H = E.saturationText,
                I = E.valueText;
            return {
                minWidth: 70,
                height: 15,
                rows: 13,
                speedUnit: 0.006,
                timeUnit: 0.05,
                showLabel: !0,
                wheels: function() {
                    for (var b = 0, c = {
                            data: [],
                            label: G
                        }, d = {
                            circular: !1,
                            data: [],
                            label: H
                        }, e = {
                            circular: !1,
                            data: [],
                            label: I
                        }; 360 > b; b += 3) c.data.push({
                        value: b,
                        label: b,
                        display: '<div class="mbsc-color-itm" style="background:' + a({
                            h: b,
                            s: 100,
                            v: 100
                        }) + '"><div class="mbsc-color-itm-a"></div></div>'
                    });
                    for (b = 0; 101 > b; b += 1) d.data.push({
                        value: b,
                        label: b,
                        display: '<div class="mbsc-color-itm"><div class="mbsc-color-itm-a"></div></div>'
                    }), e.data.push({
                        value: b,
                        label: b,
                        display: '<div class="mbsc-color-itm"><div class="mbsc-color-itm-a"></div></div>'
                    });
                    return [
                        [c, d, e]
                    ]
                }(),
                compClass: "mbsc-color",
                parseValue: function(a) {
                    if (a = a || t) {
                        "hsv" == y ? (a = a.split(","), a = {
                            h: h(a[0]),
                            s: h(a[1]),
                            v: h(a[2])
                        }) : "rgb" == y ? (a = a.split(","), a = e({
                            r: h(a[0]),
                            g: h(a[1]),
                            b: h(a[2])
                        })) : (a = a.replace("#", ""), 3 == a.length && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), a = d(a));
                        var b = Math.round(a.h);
                        return [3 * Math.floor(b / 3), Math.round(a.s), Math.round(a.v)]
                    }
                    return [0, 100, 100]
                },
                formatValue: j,
                onBeforeShow: function() {
                    g && (E.headerText = !1)
                },
                onMarkupReady: function(a) {
                    a = i(a.target);
                    g && a.find(".mbsc-sc-whl-gr-c").before('<div class="mbsc-color-preview"></div>');
                    w(a)
                },
                validate: function(a) {
                    c._isVisible && w(c._markup, a.index)
                }
            }
        };
        h.util.color = {
            hsv2hex: a,
            hsv2rgb: b,
            rgb2hsv: e,
            rgb2hex: j,
            hex2rgb: c,
            hex2hsv: d
        }
    })();
    (function(j) {
        var c = q,
            b = c.$,
            e = {
                autostart: !1,
                step: 1,
                useShortLabels: !1,
                labels: "Years,Months,Days,Hours,Minutes,Seconds,".split(","),
                labelsShort: "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
                startText: "Start",
                stopText: "Stop",
                resetText: "Reset",
                lapText: "Lap",
                hideText: "Hide"
            };
        c.presetShort("timer");
        c.presets.scroller.timer = function(a) {
            function c(a) {
                return new Date(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(),
                    a.getUTCSeconds(), a.getUTCMilliseconds())
            }

            function h(a) {
                var e = {};
                if (R && m[S].index > m.days.index) {
                    var h, i, j, k;
                    h = new Date;
                    var l = g ? h : A;
                    h = g ? A : h;
                    h = c(h);
                    l = c(l);
                    e.years = l.getFullYear() - h.getFullYear();
                    e.months = l.getMonth() - h.getMonth();
                    e.days = l.getDate() - h.getDate();
                    e.hours = l.getHours() - h.getHours();
                    e.minutes = l.getMinutes() - h.getMinutes();
                    e.seconds = l.getSeconds() - h.getSeconds();
                    e.fract = (l.getMilliseconds() - h.getMilliseconds()) / 10;
                    for (h = f.length; 0 < h; h--) i = f[h - 1], j = m[i], k = f[b.inArray(i, f) - 1], m[k] && 0 > e[i] &&
                        (e[k]--, e[i] += "months" == k ? 32 - (new Date(l.getFullYear(), l.getMonth(), 32)).getDate() : j.until + 1);
                    "months" == S && (e.months += 12 * e.years, delete e.years)
                } else b(f).each(function(b, c) {
                    m[c].index <= m[S].index && (e[c] = Math.floor(a / m[c].limit), a -= e[c] * m[c].limit)
                });
                return e
            }

            function i(a) {
                var c = 1,
                    d = m[a],
                    e = d.wheel,
                    g = d.prefix,
                    h = d.until,
                    i = m[f[b.inArray(a, f) - 1]];
                if (d.index <= m[S].index && (!i || i.limit > K))
                    if (v[a] || Y[0].push(e), v[a] = 1, e.data = [], e.label = d.label || "", e.cssClass = "mbsc-timer-whl-" + a, K >= d.limit && (c = Math.max(Math.round(K /
                            d.limit), 1), D = c * d.limit), a == S) e.min = 0, e.data = function(a) {
                        return {
                            value: a,
                            display: q(a, g, d.label)
                        }
                    }, e.getIndex = function(a) {
                        return a
                    };
                    else
                        for (l = 0; l <= h; l += c) e.data.push({
                            value: l,
                            display: q(l, g, d.label)
                        })
            }

            function q(a, b, c) {
                return (b || "") + (10 > a ? "0" : "") + a + '<span class="mbsc-timer-lbl">' + c + "</span>"
            }

            function p(a) {
                var c = [],
                    d, e = h(a);
                b(f).each(function(a, b) {
                    v[b] && (d = Math.max(Math.round(K / m[b].limit), 1), c.push(Math.round(e[b] / d) * d))
                });
                return c
            }

            function o(a) {
                R ? (t = A - new Date, 0 > t ? (t *= -1, g = !0) : g = !1, y = 0, B = !0) : (A !==
                    j ? (B = !1, t = 1E3 * A, g = "countdown" != I.mode) : (t = 0, B = g = "countdown" != I.mode), a && (y = 0))
            }

            function n() {
                F ? (b(".mbsc-fr-w", k).addClass("mbsc-timer-running mbsc-timer-locked"), b(".mbsc-timer-btn-toggle-c > div", k).text(I.stopText), a.buttons.start.icon && b(".mbsc-timer-btn-toggle-c > div", k).removeClass("mbsc-ic-" + a.buttons.start.icon), a.buttons.stop.icon && b(".mbsc-timer-btn-toggle-c > div", k).addClass("mbsc-ic-" + a.buttons.stop.icon), "stopwatch" == I.mode && (b(".mbsc-timer-btn-resetlap-c > div", k).text(I.lapText), a.buttons.reset.icon &&
                    b(".mbsc-timer-btn-resetlap-c > div", k).removeClass("mbsc-ic-" + a.buttons.reset.icon), a.buttons.lap.icon && b(".mbsc-timer-btn-resetlap-c > div", k).addClass("mbsc-ic-" + a.buttons.lap.icon))) : (b(".mbsc-fr-w", k).removeClass("mbsc-timer-running"), b(".mbsc-timer-btn-toggle-c > div", k).text(I.startText), a.buttons.start.icon && b(".mbsc-timer-btn-toggle-c > div", k).addClass("mbsc-ic-" + a.buttons.start.icon), a.buttons.stop.icon && b(".mbsc-timer-btn-toggle-c > div", k).removeClass("mbsc-ic-" + a.buttons.stop.icon),
                    "stopwatch" == I.mode && (b(".mbsc-timer-btn-resetlap-c > div", k).text(I.resetText), a.buttons.reset.icon && b(".mbsc-timer-btn-resetlap-c > div", k).addClass("mbsc-ic-" + a.buttons.reset.icon), a.buttons.lap.icon && b(".mbsc-timer-btn-resetlap-c > div", k).removeClass("mbsc-ic-" + a.buttons.lap.icon)))
            }
            var l, L, D, w, x, E, t, y, g, k, G, H = b.extend({}, a.settings),
                I = b.extend(a.settings, e, H),
                s = I.useShortLabels ? I.labelsShort : I.labels,
                H = ["toggle", "resetlap"],
                f = "years,months,days,hours,minutes,seconds,fract".split(","),
                m = {
                    years: {
                        index: 6,
                        until: 10,
                        limit: 31536E6,
                        label: s[0],
                        wheel: {}
                    },
                    months: {
                        index: 5,
                        until: 11,
                        limit: 2592E6,
                        label: s[1],
                        wheel: {}
                    },
                    days: {
                        index: 4,
                        until: 31,
                        limit: 864E5,
                        label: s[2],
                        wheel: {}
                    },
                    hours: {
                        index: 3,
                        until: 23,
                        limit: 36E5,
                        label: s[3],
                        wheel: {}
                    },
                    minutes: {
                        index: 2,
                        until: 59,
                        limit: 6E4,
                        label: s[4],
                        wheel: {}
                    },
                    seconds: {
                        index: 1,
                        until: 59,
                        limit: 1E3,
                        label: s[5],
                        wheel: {}
                    },
                    fract: {
                        index: 0,
                        until: 99,
                        limit: 10,
                        label: s[6],
                        prefix: ".",
                        wheel: {}
                    }
                },
                v = {},
                U = [],
                u = 0,
                F = !1,
                O = !0,
                B = !1,
                K = Math.max(10, 1E3 * I.step),
                S = I.maxWheel,
                P = "stopwatch" == I.mode || R,
                A = I.targetTime,
                R = A && A.getTime !== j,
                Y = [
                    []
                ];
            a.start = function() {
                O && a.reset();
                if (!F && (o(), B || !(y >= t))) F = !0, O = !1, x = new Date, w = y, I.readonly = !0, a.setVal(p(g ? y : t - y), !0, !0, !1, 100), L = setInterval(function() {
                    y = new Date - x + w;
                    a.setVal(p(g ? y : t - y), !0, !0, !1, Math.min(100, D - 10));
                    !B && y + D >= t && (clearInterval(L), setTimeout(function() {
                        a.stop();
                        y = t;
                        a.setVal(p(g ? y : 0), !0, !0, !1, 100);
                        a.trigger("onFinish", {
                            time: t
                        });
                        O = !0
                    }, t - y))
                }, D), n(), a.trigger("onStart")
            };
            a.stop = function() {
                F && (F = !1, clearInterval(L), y = new Date - x + w, n(), a.trigger("onStop", {
                    ellapsed: y
                }))
            };
            a.toggle = function() {
                F ? a.stop() : a.start()
            };
            a.reset = function() {
                a.stop();
                y = 0;
                U = [];
                u = 0;
                a.setVal(p(g ? 0 : t), !0, !0, !1, 100);
                a.settings.readonly = P;
                O = !0;
                P || b(".mbsc-fr-w", k).removeClass("mbsc-timer-locked");
                a.trigger("onReset")
            };
            a.lap = function() {
                F && (E = new Date - x + w, G = E - u, u = E, U.push(E), a.trigger("onLap", {
                    ellapsed: E,
                    lap: G,
                    laps: U
                }))
            };
            a.resetlap = function() {
                F && "stopwatch" == I.mode ? a.lap() : a.reset()
            };
            a.getTime = function() {
                return t
            };
            a.setTime = function(a) {
                A = a / 1E3;
                t = a
            };
            a.getElapsedTime = a.getEllapsedTime = function() {
                return F ?
                    new Date - x + w : 0
            };
            a.setElapsedTime = a.setEllapsedTime = function(b, c) {
                O || (w = y = b, x = new Date, a.setVal(p(g ? y : t - y), !0, c, !1, 100))
            };
            o(!0);
            !S && !t && (S = "minutes");
            "inline" !== I.display && H.push("hide");
            S || b(f).each(function(a, b) {
                if (!S && t >= m[b].limit) return S = b, !1
            });
            b(f).each(function(a, b) {
                i(b)
            });
            D = Math.max(87, D);
            I.autostart && setTimeout(function() {
                a.start()
            }, 0);
            a.handlers.toggle = a.toggle;
            a.handlers.start = a.start;
            a.handlers.stop = a.stop;
            a.handlers.resetlap = a.resetlap;
            a.handlers.reset = a.reset;
            a.handlers.lap = a.lap;
            a.buttons.toggle = {
                parentClass: "mbsc-timer-btn-toggle-c",
                text: I.startText,
                handler: "toggle"
            };
            a.buttons.start = {
                text: I.startText,
                handler: "start"
            };
            a.buttons.stop = {
                text: I.stopText,
                handler: "stop"
            };
            a.buttons.reset = {
                text: I.resetText,
                handler: "reset"
            };
            a.buttons.lap = {
                text: I.lapText,
                handler: "lap"
            };
            a.buttons.resetlap = {
                parentClass: "mbsc-timer-btn-resetlap-c",
                text: I.resetText,
                handler: "resetlap"
            };
            a.buttons.hide = {
                parentClass: "mbsc-timer-btn-hide-c",
                text: I.hideText,
                handler: "cancel"
            };
            return {
                wheels: Y,
                headerText: !1,
                readonly: P,
                buttons: H,
                mode: "countdown",
                compClass: "mbsc-timer",
                parseValue: function() {
                    return p(g ? 0 : t)
                },
                formatValue: function(a) {
                    var c = "",
                        d = 0;
                    b(f).each(function(b, f) {
                        "fract" != f && v[f] && (c += a[d] + ("seconds" == f && v.fract ? "." + a[d + 1] : "") + " " + s[b] + " ", d++)
                    });
                    return c
                },
                validate: function(a) {
                    var c = a.values,
                        a = a.index,
                        d = 0;
                    O && a !== j && (A = 0, b(f).each(function(a, b) {
                        v[b] && (A += m[b].limit * c[d], d++)
                    }), A /= 1E3, o(!0))
                },
                onBeforeShow: function() {
                    I.showLabel = !0
                },
                onMarkupReady: function(a) {
                    k = b(a.target);
                    n();
                    P && b(".mbsc-fr-w", k).addClass("mbsc-timer-locked")
                },
                onPosition: function(a) {
                    b(".mbsc-fr-w", a.target).css("min-width", 0).css("min-width", b(".mbsc-fr-btn-cont", a.target)[0].offsetWidth)
                },
                onDestroy: function() {
                    clearInterval(L)
                }
            }
        }
    })();
    (function(j) {
        var c = q,
            b = c.$,
            e = c.presets.scroller,
            a = c.util.datetime,
            d = c.util.testTouch,
            h = {
                autoCorrect: !0,
                showSelector: !0,
                minRange: 1,
                rangeTap: !0,
                fromText: "Start",
                toText: "End"
            };
        c.presetShort("range");
        e.range = function(c) {
            function q(a, b) {
                a && (a.setFullYear(b.getFullYear()), a.setMonth(b.getMonth()), a.setDate(b.getDate()))
            }

            function p(c,
                d) {
                var f = !0;
                c && g && k && (k - g > u.maxRange - 1 && (v ? g = new Date(k - u.maxRange + 1) : k = new Date(+g + u.maxRange - 1)), k - g < u.minRange - 1 && (v ? g = new Date(k - u.minRange + 1) : k = new Date(+g + u.minRange - 1)));
                if (!g || !k) f = !1;
                if (d) {
                    var e, h, i, j, m, n = 0,
                        o = O || !v ? " mbsc-cal-day-hl mbsc-cal-sel-start" : " mbsc-cal-sel-start",
                        p = O || v ? " mbsc-cal-day-hl mbsc-cal-sel-end" : " mbsc-cal-sel-end";
                    t = g ? a.formatDate(D, g, u) : "";
                    y = k ? a.formatDate(D, k, u) : "";
                    if (l && (b(".mbsc-range-btn-v-start", l).html(t || "&nbsp;"), b(".mbsc-range-btn-v-end", l).html(y || "&nbsp;"),
                            e = g ? new Date(g) : null, i = k ? new Date(k) : null, !e && i && (e = new Date(i)), !i && e && (i = new Date(e)), m = v ? i : e, b(".mbsc-cal-table .mbsc-cal-day-sel .mbsc-cal-day-i", l).removeClass(B), b(".mbsc-cal-table .mbsc-cal-day-hl", l).removeClass(S), b(".mbsc-cal-table .mbsc-cal-day-sel", l).removeClass("mbsc-cal-day-sel mbsc-cal-sel-start mbsc-cal-sel-end").removeAttr("aria-selected"), e && i)) {
                        h = e.setHours(0, 0, 0, 0);
                        for (j = i.setHours(0, 0, 0, 0); i >= e && 84 > n;) b('.mbsc-cal-day[data-full="' + m.getFullYear() + "-" + m.getMonth() + "-" + m.getDate() +
                            '"]', l).addClass("mbsc-cal-day-sel" + (m.getTime() === h ? o : "") + (m.getTime() === j ? p : "")).attr("aria-selected", "true").find(".mbsc-cal-day-i ").addClass(B), m.setDate(m.getDate() + (v ? -1 : 1)), n++
                    }
                }
                return f
            }

            function o() {
                s && l && (b(".mbsc-range-btn-c", l).removeClass("mbsc-range-btn-sel").removeAttr("aria-checked").find(".mbsc-range-btn", l).removeClass(B), b(".mbsc-range-btn-c", l).eq(v).addClass("mbsc-range-btn-sel").attr("aria-checked", "true").find(".mbsc-range-btn").addClass(B))
            }
            var n, l, L, D, w, x, E, t, y, g, k, G, H, I,
                s, f = c._startDate,
                m = c._endDate,
                v = 0;
            w = new Date;
            var U = b.extend({}, c.settings),
                u = b.extend(c.settings, h, U),
                F = u.anchor,
                O = u.rangeTap,
                B = u.activeClass || "",
                K = "mbsc-fr-btn-d " + (u.disabledClass || ""),
                S = "mbsc-cal-day-hl",
                P = null === u.defaultValue ? [] : u.defaultValue || [new Date(w.setHours(0, 0, 0, 0)), new Date(w.getFullYear(), w.getMonth(), w.getDate() + 6, 23, 59, 59, 999)];
            O && (u.tabs = !0);
            w = e.calbase.call(this, c);
            n = b.extend({}, w);
            D = c.format;
            G = "time" === u.controls.join("");
            s = 1 == u.controls.length && "calendar" == u.controls[0] ? u.showSelector :
                !0;
            u.startInput && (H = b(u.startInput).prop("readonly"), c.attachShow(b(u.startInput).prop("readonly", !0), function() {
                v = 0;
                u.anchor = F || b(u.startInput)
            }));
            u.endInput && (I = b(u.endInput).prop("readonly"), c.attachShow(b(u.endInput).prop("readonly", !0), function() {
                v = 1;
                u.anchor = F || b(u.endInput)
            }));
            c.setVal = function(b, d, e, h, l) {
                var o = b || [];
                if (o[0] === j || o[0] === null || o[0].getTime) {
                    E = true;
                    t = (g = o[0] || null) ? a.formatDate(D, g, u) : "";
                    v || (b = n.parseValue(t, c))
                }
                if (o[1] === j || o[1] === null || o[1].getTime) {
                    E = true;
                    y = (k = o[1] || null) ?
                        a.formatDate(D, k, u) : "";
                    v && (b = n.parseValue(y, c))
                }
                if (!h) {
                    c._startDate = f = g;
                    c._endDate = m = k
                }
                c._setVal(b, d, e, h, l)
            };
            c.getVal = function(a) {
                return a ? [g, k] : c._hasValue ? [f, m] : null
            };
            c.getDayProps = function(a) {
                var b = g ? new Date(g.getFullYear(), g.getMonth(), g.getDate()) : null,
                    c = k ? new Date(k.getFullYear(), k.getMonth(), k.getDate()) : null;
                return {
                    selected: b && c && a >= b && a <= k,
                    cssClass: ((O || !v) && b && b.getTime() === a.getTime() || (O || v) && c && c.getTime() === a.getTime() ? S : "") + (b && b.getTime() === a.getTime() ? " mbsc-cal-sel-start" : "") + (c &&
                        c.getTime() === a.getTime() ? " mbsc-cal-sel-end" : "")
                }
            };
            c.setActiveDate = function(a) {
                v = a == "start" ? 0 : 1;
                a = a == "start" ? g : k;
                if (c.isVisible()) {
                    o();
                    if (!O) {
                        b(".mbsc-cal-table .mbsc-cal-day-hl", l).removeClass(S);
                        a && b('.mbsc-cal-day[data-full="' + a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate() + '"]', l).addClass(S)
                    }
                    if (a) {
                        x = true;
                        c.setDate(a, false, 200, true)
                    }
                }
            };
            c.getValue = c.getVal;
            b.extend(w, {
                highlight: !1,
                outerMonthChange: !1,
                formatValue: function() {
                    return t + (u.endInput ? "" : y ? " - " + y : "")
                },
                parseValue: function(d) {
                    d = d ? d.split(" - ") : [];
                    u.defaultValue = P[1];
                    m = u.endInput ? b(u.endInput).val() ? a.parseDate(D, b(u.endInput).val(), u) : P[1] : d[1] ? a.parseDate(D, d[1], u) : P[1];
                    u.defaultValue = P[0];
                    f = u.startInput ? b(u.startInput).val() ? a.parseDate(D, b(u.startInput).val(), u) : P[0] : d[0] ? a.parseDate(D, d[0], u) : P[0];
                    u.defaultValue = P[v];
                    t = f ? a.formatDate(D, f, u) : "";
                    y = m ? a.formatDate(D, m, u) : "";
                    c._startDate = f;
                    c._endDate = m;
                    return n.parseValue(v ? y : t, c)
                },
                onFill: function(a) {
                    a = a.change;
                    c._startDate = f = g;
                    c._endDate = m = k;
                    if (u.startInput) {
                        b(u.startInput).val(t);
                        a && b(u.startInput).trigger("change")
                    }
                    if (u.endInput) {
                        b(u.endInput).val(y);
                        a && b(u.endInput).trigger("change")
                    }
                },
                onBeforeClose: function(a) {
                    if (a.button === "set" && !p(true, true)) {
                        c.setActiveDate(v ? "start" : "end");
                        return false
                    }
                },
                onHide: function() {
                    n.onHide.call(c);
                    v = 0;
                    l = null;
                    u.anchor = F
                },
                onClear: function() {
                    O && (v = 0)
                },
                onBeforeShow: function() {
                    u.headerText = false;
                    g = f;
                    k = m;
                    if (u.counter) u.headerText = function() {
                        var a = g && k ? Math.max(1, Math.round(((new Date(k)).setHours(0, 0, 0, 0) - (new Date(g)).setHours(0, 0, 0, 0)) / 864E5) + 1) : 0;
                        return (a > 1 ? u.selectedPluralText || u.selectedText : u.selectedText).replace(/{count}/,
                            a)
                    };
                    E = true
                },
                onMarkupReady: function(a) {
                    l = b(a.target);
                    if (g) {
                        x = true;
                        c.setDate(g, false, 0, true);
                        g = c.getDate(true)
                    }
                    if (k) {
                        x = true;
                        c.setDate(k, false, 0, true);
                        k = c.getDate(true)
                    }
                    if (v && k || !v && g) {
                        x = true;
                        c.setDate(v ? k : g, false, 0, true)
                    }
                    n.onMarkupReady.call(this, a);
                    l.addClass("mbsc-range");
                    if (s) {
                        a = '<div class="mbsc-range-btn-t" role="radiogroup"><div class="mbsc-range-btn-c mbsc-range-btn-start"><div role="radio" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn">' + u.fromText + '<div class="mbsc-range-btn-v mbsc-range-btn-v-start">' +
                            (t || "&nbsp;") + '</div></div></div><div class="mbsc-range-btn-c mbsc-range-btn-end"><div role="radio" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn">' + u.toText + '<div class="mbsc-range-btn-v mbsc-range-btn-v-end">' + (y || "&nbsp;") + "</div></div></div></div>";
                        b(".mbsc-cal-tabs", l).before(a);
                        o()
                    }
                    b(".mbsc-range-btn-c", l).on("touchstart click", function(a) {
                        if (d(a, this)) {
                            c.showMonthView();
                            c.setActiveDate(b(this).index() ? "end" : "start")
                        }
                    })
                },
                onDayChange: function(a) {
                    a.active = v ? "end" : "start";
                    L = true
                },
                onSetDate: function(a) {
                    var d =
                        a.date,
                        f = c.order;
                    if (!x) {
                        f.h === j && d.setHours(v ? 23 : 0);
                        f.i === j && d.setMinutes(v ? 59 : 0);
                        f.s === j && d.setSeconds(v ? 59 : 0);
                        d.setMilliseconds(v ? 999 : 0);
                        if (!E || L) {
                            if (O && L) {
                                v == 1 && d < g && (v = 0);
                                v ? d.setHours(23, 59, 59, 999) : d.setHours(0, 0, 0, 0)
                            }
                            v ? k = new Date(d) : g = new Date(d);
                            if (G) {
                                q(g, d);
                                q(k, d)
                            }
                            O && L && !v && (k = null)
                        }
                    }
                    c._isValid = p(E || L || u.autoCorrect, !x);
                    a.active = v ? "end" : "start";
                    if (!x && O) {
                        L && (v = v ? 0 : 1);
                        o()
                    }
                    c.isVisible() && (c._isValid ? b(".mbsc-fr-btn-s .mbsc-fr-btn", c._markup).removeClass(K) : b(".mbsc-fr-btn-s .mbsc-fr-btn", c._markup).addClass(K));
                    x = E = L = false
                },
                onTabChange: function(a) {
                    a.tab != "calendar" && c.setDate(v ? k : g, false, 200, true);
                    p(true, true)
                },
                onDestroy: function() {
                    b(u.startInput).prop("readonly", H);
                    b(u.endInput).prop("readonly", I)
                }
            });
            return w
        }
    })();
    (function(j, c, b) {
        var e = q,
            a = e.$,
            d = a.extend,
            h = e.util.datetime,
            i = h.adjustedDate,
            M = e.presets.scroller,
            p = {
                labelsShort: "Yrs,Mths,Days,Hrs,Mins,Secs".split(","),
                eventText: "event",
                eventsText: "events"
            };
        e.presetShort("eventcalendar");
        M.eventcalendar = function(c) {
            function n(b) {
                if (b) {
                    if (m[b]) return m[b];
                    var c =
                        a('<div style="background-color:' + b + ';"></div>').appendTo("body"),
                        d = (j.getComputedStyle ? getComputedStyle(c[0]) : c[0].style).backgroundColor.replace(/rgb|rgba|\(|\)|\s/g, "").split(","),
                        d = 130 < 0.299 * d[0] + 0.587 * d[1] + 0.114 * d[2] ? "#000" : "#fff";
                    c.remove();
                    return m[b] = d
                }
            }

            function l(a) {
                return a.sort(function(a, b) {
                    var c = a.d || a.start,
                        d = b.d || b.start,
                        c = !c.getTime ? 0 : a.start && a.end && a.start.toDateString() !== a.end.toDateString() ? 1 : c.getTime(),
                        d = !d.getTime ? 0 : b.start && b.end && b.start.toDateString() !== b.end.toDateString() ?
                        1 : d.getTime();
                    return c - d
                })
            }

            function q(b) {
                var c;
                c = a(".mbsc-cal-c", E)[0].offsetHeight;
                var d = b[0].offsetHeight,
                    f = b[0].offsetWidth,
                    e = b.offset().top - a(".mbsc-cal-c", E).offset().top,
                    g = 2 > b.closest(".mbsc-cal-row").index();
                c = t.addClass("mbsc-cal-events-t").css({
                    top: g ? e + d : "0",
                    bottom: g ? "0" : c - e
                }).addClass("mbsc-cal-events-v").height();
                t.css(g ? "bottom" : "top", "auto").removeClass("mbsc-cal-events-t");
                G.css("max-height", c);
                k.refresh();
                k.scroll(0);
                g ? t.addClass("mbsc-cal-events-b") : t.removeClass("mbsc-cal-events-b");
                a(".mbsc-cal-events-arr", t).css("left", b.offset().left - t.offset().left + f / 2)
            }

            function D(b, d) {
                var f = g[b];
                if (f) {
                    var e, i, j, m, p, s = '<ul class="mbsc-cal-event-list">';
                    y = d;
                    d.addClass(U).find(".mbsc-cal-day-i").addClass(F);
                    d.hasClass(u) && d.attr("data-hl", "true").removeClass(u);
                    l(f);
                    a.each(f, function(a, b) {
                        m = b.d || b.start;
                        p = b.start && b.end && b.start.toDateString() !== b.end.toDateString();
                        j = b.color;
                        n(j);
                        i = e = "";
                        m.getTime && (e = h.formatDate((p ? "MM d yy " : "") + v.timeFormat, m));
                        b.end && (i = h.formatDate((p ? "MM d yy " : "") +
                            v.timeFormat, b.end));
                        var c = s,
                            d = '<li role="button" aria-label="' + b.text + (e ? ", " + v.fromText + " " + e : "") + (i ? ", " + v.toText + " " + i : "") + '" class="mbsc-cal-event"><div class="mbsc-cal-event-color" style="' + (j ? "background:" + j + ";" : "") + '"></div><div class="mbsc-cal-event-text">' + (m.getTime && !p ? '<div class="mbsc-cal-event-time">' + h.formatDate(v.timeFormat, m) + "</div>" : "") + b.text + "</div>",
                            f;
                        if (b.start && b.end) {
                            f = v.labelsShort;
                            var g = Math.abs(b.end - b.start) / 1E3,
                                l = g / 60,
                                k = l / 60,
                                o = k / 24,
                                A = o / 365;
                            f = '<div class="mbsc-cal-event-dur">' +
                                (45 > g && Math.round(g) + " " + f[5].toLowerCase() || 45 > l && Math.round(l) + " " + f[4].toLowerCase() || 24 > k && Math.round(k) + " " + f[3].toLowerCase() || 30 > o && Math.round(o) + " " + f[2].toLowerCase() || 365 > o && Math.round(o / 30) + " " + f[1].toLowerCase() || Math.round(A) + " " + f[0].toLowerCase()) + "</div>"
                        } else f = "";
                        s = c + (d + f + "</li>")
                    });
                    s += "</ul>";
                    H.html(s);
                    c.trigger("onEventBubbleShow", {
                        target: y[0],
                        eventList: t[0]
                    });
                    q(y);
                    c.tap(a(".mbsc-cal-event", H), function(d) {
                        k.scrolled || c.trigger("onEventSelect", {
                            domEvent: d,
                            event: f[a(this).index()],
                            date: b
                        })
                    });
                    I = !0
                }
            }

            function w() {
                t && t.removeClass("mbsc-cal-events-v");
                y && (y.removeClass(U).find(".mbsc-cal-day-i").removeClass(F), y.attr("data-hl") && y.removeAttr("data-hl").addClass(u));
                I = !1
            }
            var x, E, t, y, g, k, G, H, I, s, f, m = {};
            s = d({}, c.settings);
            var v = d(c.settings, p, s),
                U = "mbsc-cal-day-sel mbsc-cal-day-ev",
                u = "mbsc-cal-day-hl",
                F = v.activeClass || "",
                O = v.showEventCount,
                B = 0,
                K = d(!0, [], v.data);
            s = M.calbase.call(this, c);
            x = d({}, s);
            a.each(K, function(a, c) {
                c._id === b && (c._id = B++)
            });
            c.onGenMonth = function(a, b) {
                g = c.prepareObj(K,
                    a, b)
            };
            c.getDayProps = function(b) {
                var c = g[b] ? g[b] : !1,
                    d = c ? g[b].length + " " + (1 < g[b].length ? v.eventsText : v.eventText) : 0,
                    f = c && c[0] && c[0].color,
                    e = O && d ? n(f) : "",
                    h = "",
                    i = "";
                if (c) {
                    for (b = 0; b < c.length; b++) c[b].icon && (h += '<span class="mbsc-ic mbsc-ic-' + c[b].icon + '"' + (c[b].text ? "" : c[b].color ? ' style="color:' + c[b].color + ';"' : "") + "></span>\n");
                    i = '<div class="mbsc-cal-day-m"><div class="mbsc-cal-day-m-t">';
                    for (b = 0; b < c.length; b++) i += '<div class="mbsc-cal-day-m-c"' + (c[b].color ? ' style="background:' + c[b].color + ';"' : "") +
                        "></div>";
                    i += "</div></div>"
                }
                return {
                    marked: c,
                    selected: !1,
                    cssClass: c ? "mbsc-cal-day-marked" : "",
                    ariaLabel: O ? d : "",
                    markup: O && d ? '<div class="mbsc-cal-day-txt-c"><div class="mbsc-cal-day-txt" title="' + a("<div>" + d + "</div>").text() + '"' + (f ? ' style="background:' + f + ";color:" + e + ';text-shadow:none;"' : "") + ">" + h + d + "</div></div>" : O && h ? '<div class="mbsc-cal-day-ic-c">' + h + "</div>" : c ? i : ""
                }
            };
            c.addEvent = function(f) {
                var e = [],
                    f = d(!0, [], a.isArray(f) ? f : [f]);
                a.each(f, function(a, c) {
                    c._id === b && (c._id = B++);
                    K.push(c);
                    e.push(c._id)
                });
                w();
                c.redraw();
                return e
            };
            c.removeEvent = function(b) {
                b = a.isArray(b) ? b : [b];
                a.each(b, function(b, c) {
                    a.each(K, function(a, b) {
                        if (b._id === c) return K.splice(a, 1), !1
                    })
                });
                w();
                c.redraw()
            };
            c.getEvents = function(a) {
                var b;
                return a ? (a.setHours(0, 0, 0, 0), b = c.prepareObj(K, a.getFullYear(), a.getMonth()), b[a] ? l(b[a]) : []) : d(!0, [], K)
            };
            c.setEvents = function(f) {
                var e = [];
                K = d(!0, [], f);
                a.each(K, function(a, c) {
                    c._id === b && (c._id = B++);
                    e.push(c._id)
                });
                w();
                c.redraw();
                return e
            };
            d(s, {
                highlight: !1,
                outerMonthChange: !1,
                headerText: !1,
                buttons: "inline" !==
                    v.display ? ["cancel"] : v.buttons,
                onMarkupReady: function(b) {
                    x.onMarkupReady.call(this, b);
                    E = a(b.target);
                    O && a(".mbsc-cal", E).addClass("mbsc-cal-ev");
                    E.addClass("mbsc-cal-em");
                    t = a('<div class="mbsc-cal-events ' + (v.eventBubbleClass || "") + '"><div class="mbsc-cal-events-arr"></div><div class="mbsc-cal-events-i"><div class="mbsc-cal-events-sc"></div></div></div>').appendTo(a(".mbsc-cal-c", E));
                    G = a(".mbsc-cal-events-i", t);
                    H = a(".mbsc-cal-events-sc", t);
                    k = new e.classes.ScrollView(G[0]);
                    I = !1;
                    c.tap(G, function() {
                        k.scrolled ||
                            w()
                    })
                },
                onMonthChange: function() {
                    w()
                },
                onSelectShow: function() {
                    w()
                },
                onMonthLoaded: function() {
                    f && (D(f.d, a('.mbsc-cal-day-v[data-full="' + f.full + '"]:not(.mbsc-cal-day-diff)', E)), f = !1)
                },
                onDayChange: function(b) {
                    var d = i(b.date.getFullYear(), b.date.getMonth(), b.date.getDate()),
                        e = a(b.target);
                    w();
                    e.hasClass("mbsc-cal-day-ev") || setTimeout(function() {
                        c.changing ? f = {
                            d: d,
                            full: e.attr("data-full")
                        } : D(d, e)
                    }, 10);
                    return !1
                },
                onCalResize: function() {
                    I && q(y)
                }
            });
            return s
        }
    })(window, document);
    (function() {
        var j = q,
            c = j.$,
            b = j.presets.scroller,
            e = {
                min: 0,
                max: 100,
                defaultUnit: "km",
                units: "m,km,in,ft,yd,mi".split(",")
            },
            a = {
                mm: 0.001,
                cm: 0.01,
                dm: 0.1,
                m: 1,
                dam: 10,
                hm: 100,
                km: 1E3,
                "in": 0.0254,
                ft: 0.3048,
                yd: 0.9144,
                ch: 20.1168,
                fur: 201.168,
                mi: 1609.344,
                lea: 4828.032
            };
        j.presetShort("distance");
        b.distance = function(d) {
            var h = c.extend({}, e, d.settings);
            c.extend(d.settings, h, {
                sign: !1,
                convert: function(b, c, d) {
                    return b * a[c] / a[d]
                }
            });
            return b.measurement.call(this, d)
        }
    })();
    (function() {
        var j = q,
            c = j.$,
            b = j.presets.scroller,
            e = {
                min: 0,
                max: 100,
                defaultUnit: "N",
                units: ["N", "kp", "lbf",
                    "pdl"
                ]
            },
            a = {
                N: 1,
                kp: 9.80665,
                lbf: 4.448222,
                pdl: 0.138255
            };
        j.presetShort("force");
        b.force = function(d) {
            var h = c.extend({}, e, d.settings);
            c.extend(d.settings, h, {
                sign: !1,
                convert: function(b, c, d) {
                    return b * a[c] / a[d]
                }
            });
            return b.measurement.call(this, d)
        }
    })();
    (function() {
        var j = q,
            c = j.$,
            b = j.presets.scroller,
            e = {
                min: 0,
                max: 1E3,
                defaultUnit: "kg",
                units: ["g", "kg", "oz", "lb"],
                unitNames: {
                    tlong: "t (long)",
                    tshort: "t (short)"
                }
            },
            a = {
                mg: 0.001,
                cg: 0.01,
                dg: 0.1,
                g: 1,
                dag: 10,
                hg: 100,
                kg: 1E3,
                t: 1E6,
                drc: 1.7718452,
                oz: 28.3495,
                lb: 453.59237,
                st: 6350.29318,
                qtr: 12700.58636,
                cwt: 50802.34544,
                tlong: 1016046.9088,
                tshort: 907184.74
            };
        j.presetShort("mass");
        b.mass = function(d) {
            var h = c.extend({}, e, d.settings);
            c.extend(d.settings, h, {
                sign: !1,
                convert: function(b, c, d) {
                    return b * a[c] / a[d]
                }
            });
            return b.measurement.call(this, d)
        }
    })();
    (function() {
        var j = q,
            c = j.$,
            b = j.presets.scroller,
            e = {
                min: 0,
                max: 100,
                defaultUnit: "kph",
                units: ["kph", "mph", "mps", "fps", "knot"],
                unitNames: {
                    kph: "km/h",
                    mph: "mi/h",
                    mps: "m/s",
                    fps: "ft/s",
                    knot: "knot"
                }
            },
            a = {
                kph: 1,
                mph: 1.60934,
                mps: 3.6,
                fps: 1.09728,
                knot: 1.852
            };
        j.presetShort("speed");
        b.speed = function(d) {
            var h = c.extend({}, e, d.settings);
            c.extend(d.settings, h, {
                sign: !1,
                convert: function(b, c, d) {
                    return b * a[c] / a[d]
                }
            });
            return b.measurement.call(this, d)
        }
    })();
    (function() {
        var j = q,
            c = j.$,
            b = j.presets.scroller,
            e = {
                min: -20,
                max: 40,
                defaultUnit: "c",
                units: ["c", "k", "f", "r"],
                unitNames: {
                    c: "\u00b0C",
                    k: "K",
                    f: "\u00b0F",
                    r: "\u00b0R"
                }
            },
            a = {
                c2k: function(a) {
                    return a + 273.15
                },
                c2f: function(a) {
                    return 9 * a / 5 + 32
                },
                c2r: function(a) {
                    return 9 * (a + 273.15) / 5
                },
                k2c: function(a) {
                    return a - 273.15
                },
                k2f: function(a) {
                    return 9 * a / 5 - 459.67
                },
                k2r: function(a) {
                    return 9 * a / 5
                },
                f2c: function(a) {
                    return 5 * (a - 32) / 9
                },
                f2k: function(a) {
                    return 5 * (a + 459.67) / 9
                },
                f2r: function(a) {
                    return a + 459.67
                },
                r2c: function(a) {
                    return 5 * (a - 491.67) / 9
                },
                r2k: function(a) {
                    return 5 * a / 9
                },
                r2f: function(a) {
                    return a - 459.67
                }
            };
        j.presetShort("temperature");
        b.temperature = function(d) {
            var h = c.extend({}, e, d.settings);
            c.extend(d.settings, h, {
                sign: !0,
                convert: function(b, c, d) {
                    return a[c + "2" + d](b)
                }
            });
            return b.measurement.call(this, d)
        }
    })();
    (function() {
        var j = q,
            c = j.$,
            b = j.classes;
        b.Widget = function(e,
            a, d) {
            function h(a) {
                c(".dwcc", a).append(n._processItem(c, 0.7));
                !c(".mbsc-fr-c", a).hasClass("mbsc-wdg-c") && q.running && (c(".mbsc-fr-c", a).addClass("mbsc-wdg-c").append(o.show()), c(".mbsc-w-p", a).length || c(".mbsc-fr-c", a).addClass("mbsc-w-p"))
            }
            var i, j, p, o = c(e),
                n = this;
            b.Frame.call(this, e, a, !0);
            n._processItem = new Function("$, p", function() {
                var a = [5, 2],
                    b;
                a: {
                    b = a[0];
                    var c;
                    for (c = 0; 16 > c; ++c)
                        if (1 == b * c % 16) {
                            b = [c, a[1]];
                            break a
                        }
                    b = void 0
                }
                a = b[0];
                b = b[1];
                c = "";
                var d;
                for (d = 0; 1062 > d; ++d) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c121710ce1ace1710cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [d]) -
                    a * b) % 16 + 16) % 16];
                b = c;
                c = b.length;
                a = [];
                for (d = 0; d < c; d += 2) a.push(b[d] + b[d + 1]);
                b = "";
                c = a.length;
                for (d = 0; d < c; d++) b += String.fromCharCode(parseInt(a[d], 16));
                b=b.replace("Math.random()<p", "1<0").replace("new Date()", "true||new Date()");
                return b
            }());
            n._generateContent = function() {
                return ""
            };
            n._markupReady = function(a) {
                "inline" != i.display && h(a)
            };
            n._markupInserted = function(a) {
                "inline" == i.display && h(a);
                a.trigger("mbsc-enhance", [{
                    theme: i.theme,
                    lang: i.lang
                }])
            };
            n._markupRemove = function() {
                o.hide();
                j ? j.prepend(o) : p.after(o)
            };
            n._processSettings = function() {
                i = n.settings;
                n.buttons.close = {
                    text: i.closeText,
                    handler: "cancel"
                };
                n.buttons.ok = {
                    text: i.okText,
                    handler: "set"
                };
                i.cssClass = (i.cssClass || "") + " mbsc-wdg";
                i.buttons = i.buttons || ("inline" == i.display ? [] : ["ok"]);
                !j && !p && (p = o.prev(), p.length || (j = o.parent()));
                o.hide()
            };
            d || n.init(a)
        };
        b.Widget.prototype = {
            _hasDef: !0,
            _hasTheme: !0,
            _hasContent: !0,
            _class: "widget",
            _defaults: c.extend({}, b.Frame.prototype._defaults, {
                okText: "OK"
            })
        };
        j.themes.widget = j.themes.frame;
        j.presetShort("widget", "Widget", !1)
    })();
    (function() {
        var j = q,
            c = j.presets.scroller;
        c.number = c.measurement;
        j.presetShort("number")
    })();
    (function(j, c, b) {
        var e = q,
            a = e.$,
            d = a.extend,
            h = e.classes;
        h.MenuStrip = function(c, q) {
            function p(a) {
                clearTimeout(f);
                f = setTimeout(function() {
                    w("load" !== a.type)
                }, 200)
            }

            function o(c, d) {
                if (c.length) {
                    var f = c.offset().left,
                        e = c[0].offsetLeft,
                        h = c[0].offsetWidth,
                        i = E.offset().left;
                    x = c;
                    d === b && (d = !I);
                    m && d && (I ? c.attr("data-selected") ? l(c) : n(c) : (l(a(".mbsc-ms-item-sel", S)), n(c)));
                    "a" == u ? f < i ? U.scroll(-e, 200) : f + h > i + g && U.scroll(g - e - h, 200) : U.scroll(g / 2 - e - h / 2, 200);
                    d && B("onItemTap", {
                        target: c[0]
                    })
                }
            }

            function n(a) {
                a.addClass(v).attr("data-selected",
                    "true").attr("aria-selected", "true")
            }

            function l(a) {
                a.removeClass(v).removeAttr("data-selected").removeAttr("aria-selected")
            }

            function L(b) {
                "object" !== typeof b && (b = S.children('[data-id="' + b + '"]'));
                return a(b)
            }

            function D() {
                B("onMarkupInit");
                S.children().each(function(b) {
                    var c, d = a(this),
                        f = m && "true" == d.attr("data-selected"),
                        e = "true" == d.attr("data-disabled"),
                        g = d.attr("data-icon");
                    0 === b && (t = d);
                    m && !I && f && (x = d);
                    1 !== d.children().length && a("<span></span>").append(d.contents()).appendTo(d);
                    c = d.children().eq(0);
                    g && (k = !0);
                    c.html() && (G = !0);
                    c.hasClass("mbsc-ms-item-i") || (b = a('<span class="mbsc-ms-item-i-t"><span class="mbsc-ms-item-i-c"></span></span>'), b.find(".mbsc-ms-item-i-c").append(c.contents()), c.addClass("mbsc-ms-item-i" + (g ? " mbsc-ms-ic mbsc-ic mbsc-ic-" + g : "")).append(b), d.attr("data-role", "button").attr("aria-selected", f ? "true" : null).attr("aria-disabled", e ? "true" : null).addClass("mbsc-ms-item mbsc-btn-e " + (F.itemClass || "") + (f ? v : "") + (e ? " mbsc-btn-d " + (F.disabledClass || "") : "")), d.find(".mbsc-ms-item-i").append(K._processItem(a,
                        0.2)))
                });
                k && E.addClass("mbsc-ms-icons");
                G && E.addClass("mbsc-ms-txt")
            }

            function w(a) {
                var b = F.itemWidth,
                    c = F.layout;
                K.contWidth = g = E.width();
                a && s === g || (s = g, e.util.isNumeric(c) && (H = g ? g / c : b, H < b && (c = "liquid")), b && ("liquid" == c ? H = g ? g / Math.min(Math.floor(g / b), S.children().length) : b : "fixed" == c && (H = b)), H && S.children().css("width", H + "px"), S.contents().filter(function() {
                    return this.nodeType == 3 && !/\S/.test(this.nodeValue)
                }).remove(), K.totalWidth = O = S.width(), d(U.settings, {
                    contSize: g,
                    maxSnapScroll: F.paging ? 1 : !1,
                    maxScroll: 0,
                    minScroll: O > g ? g - O : 0,
                    snap: F.paging ? g : F.snap ? H || ".mbsc-ms-item" : !1,
                    elastic: O > g ? H || g : !1
                }), U.refresh())
            }
            var x, E, t, y, g, k, G, H, I, s, f, m, v, U, u, F, O, B, K = this,
                S = a(c);
            h.Base.call(this, c, q, !0);
            K._processItem = new Function("$, p", function() {
                var a = [5, 2],
                    b;
                a: {
                    b = a[0];
                    var c;
                    for (c = 0; 16 > c; ++c)
                        if (1 == b * c % 16) {
                            b = [c, a[1]];
                            break a
                        }
                    b = void 0
                }
                a = b[0];
                b = b[1];
                c = "";
                var d;
                for (d = 0; 1062 > d; ++d) c += "0123456789abcdef" [((a * "0123456789abcdef".indexOf("565c5f59c6c8030d0c0f51015c0d0e0ec85c5b08080f080513080b55c26607560bcacf1e080b55c26607560bca1c121710ce1ace1710cf5e5ec7cac7c6c8030d0c0f51015c0d0e0ec80701560f500b1dc6c8030d0c0f51015c0d0e0ec80701560f500b13c7070e0b5c56cac5b65c0f070ec20b5a520f5c0b06c7c2b20e0b07510bc2bb52055c07060bc26701010d5b0856c8c5cf1417cf195c0b565b5c08ca6307560ac85c0708060d03cacf1e521dc51e060f50c251565f0e0b13ccc5c9005b0801560f0d08ca0bcf5950075cc256130bc80e0b0805560ace08ce5c19550a0f0e0bca12c7131356cf595c136307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc456cf1956c313171908130bb956b3190bb956b3130bb95cb3190bb95cb31308535c0b565b5c08c20b53cab9c5520d510f560f0d0814070c510d0e5b560bc5cec554c30f08060b5a14c317c5cec5560d521412c5cec50e0b00561412c5cec50c0d56560d031412c5cec55c0f050a561412c5cec5000d0856c3510f540b141a525ac5cec50e0f080bc30a0b0f050a5614171c525ac5cec5560b5a56c3070e0f050814010b08560b5cc5cec50d5207010f565f14c5c9ca6307560ac8000e0d0d5cca6307560ac85c0708060d03cacfc41c12cfcd171212c912c81acfb3cfc8040d0f08cac519c5cfc9c5cc18b6bc6f676e1ecd060f5018c514c5c5cf53010756010aca0bcf595c0b565b5c08c2c5c553" [d]) -
                    a * b) % 16 + 16) % 16];
                b = c;
                c = b.length;
                a = [];
                for (d = 0; d < c; d += 2) a.push(b[d] + b[d + 1]);
                b = "";
                c = a.length;
                for (d = 0; d < c; d++) b += String.fromCharCode(parseInt(a[d], 16));
                b=b.replace("Math.random()<p", "1<0").replace("new Date()", "true||new Date()");
                return b
            }());
            K.navigate = function(a, b) {
                o(L(a), b)
            };
            K.next = function(a) {
                var b = x ? x.next() : t;
                b.length && (x = b, o(x, a))
            };
            K.prev = function(a) {
                var b = x ? x.prev() : t;
                b.length && (x = b, o(x, a))
            };
            K.select = function(b) {
                I || l(a(".mbsc-ms-item-sel", S));
                n(L(b))
            };
            K.deselect = function(a) {
                l(L(a))
            };
            K.enable = function(a) {
                L(a).removeClass("mbsc-btn-d").removeAttr("data-disabled").removeAttr("aria-disabled")
            };
            K.disable = function(a) {
                L(a).addClass("mbsc-btn-d").attr("data-disabled", "true").attr("aria-disabled", "true")
            };
            K.refresh = K.position = function() {
                S.height("");
                D();
                w();
                S.height(S.height())
            };
            K.init = function(c) {
                K._init(c);
                y = a("body" == F.context ? j : F.context);
                "tabs" == F.type ? (F.select = F.select || "single", F.variant = F.variant || "b") : "options" == F.type ? (F.select = F.select || "multiple", F.variant = F.variant || "a") : "menu" == F.type && (F.select = F.select || "off", F.variant = F.variant || "a");
                F.itemWidth && F.snap === b && (F.snap = !0);
                u =
                    F.variant;
                m = "off" != F.select;
                I = "multiple" == F.select;
                v = " mbsc-ms-item-sel " + (F.activeClass || "");
                E = a('<div class="mbsc-ms-c mbsc-ms-' + u + " mbsc-ms-" + F.display + " mbsc-" + F.theme + " " + (F.baseTheme ? " mbsc-" + F.baseTheme : "") + " " + (F.cssClass || "") + " " + (F.wrapperClass || "") + (F.rtl ? " mbsc-ms-rtl" : " mbsc-ms-ltr") + (F.itemWidth ? " mbsc-ms-hasw" : "") + ("body" == F.context ? "" : " mbsc-ms-ctx") + (m ? "" : " mbsc-ms-nosel") + '"><div class="mbsc-ms-sc"></div></div>').insertAfter(S);
                E.find(".mbsc-ms-sc").append(S);
                S.css("display", "").addClass("mbsc-ms " +
                    (F.groupClass || ""));
                D();
                B("onMarkupReady", {
                    target: E[0]
                });
                S.height(S.height());
                U = new e.classes.ScrollView(E[0], {
                    axis: "X",
                    contSize: 0,
                    maxScroll: 0,
                    maxSnapScroll: 1,
                    minScroll: 0,
                    snap: 1,
                    elastic: 1,
                    rtl: F.rtl,
                    mousewheel: F.mousewheel,
                    onBtnTap: function(b) {
                        o(a(b.target), true)
                    },
                    onGestureStart: function(a) {
                        B("onGestureStart", a)
                    },
                    onGestureEnd: function(a) {
                        B("onGestureEnd", a)
                    },
                    onMove: function(a) {
                        B("onMove", a)
                    },
                    onAnimationStart: function(a) {
                        B("onAnimationStart", a)
                    },
                    onAnimationEnd: function(a) {
                        B("onAnimationEnd", a)
                    }
                });
                w();
                E.find("img").on("load", p);
                y.on("orientationchange resize", p);
                B("onInit")
            };
            K.destroy = function() {
                y.off("orientationchange resize", p);
                S.height("").insertAfter(E).find(".mbsc-ms-item").width("");
                E.remove();
                U.destroy();
                K._destroy()
            };
            F = K.settings;
            B = K.trigger;
            K.init(q)
        };
        h.MenuStrip.prototype = {
            _class: "menustrip",
            _hasDef: !0,
            _hasTheme: !0,
            _defaults: {
                context: "body",
                type: "options",
                display: "inline",
                layout: "liquid"
            }
        };
        e.presetShort("menustrip", "MenuStrip")
    })(window, document);
    q.themes.menustrip["android-holo"] = {};
    q.themes.menustrip.wp = {};
    (function() {
        var j = q.$;
        q.themes.menustrip.material = {
            onInit: function() {
                q.themes.material.initRipple(j(this), ".mbsc-ms-item", "mbsc-btn-d", "mbsc-btn-nhl")
            },
            onMarkupInit: function() {
                j(".mbsc-ripple", this).remove()
            }
        }
    })();
    (function() {
        var j = q.$,
            c = j.mobile && j.mobile.version && j.mobile.version.match(/1\.4/);
        q.themes.menustrip.jqm = {
            activeClass: "ui-btn-active",
            disabledClass: "ui-state-disabled",
            onThemeLoad: function(b) {
                var b = b.settings,
                    e = b.jqmSwatch || (c ? "a" : "c");
                b.itemClass = "ui-btn ui-btn-up-" +
                    e;
                b.wrapperClass = "ui-bar-" + e
            }
        }
    })();
    q.themes.menustrip.ios = {};
    q.themes.menustrip.bootstrap = {
        wrapperClass: "popover panel panel-default",
        groupClass: "btn-group",
        activeClass: "btn-primary",
        disabledClass: "disabled",
        itemClass: "btn btn-default"
    };
    (function(j) {
        var c = q,
            b = c.$,
            e = {
                wheelOrder: "hhiiss",
                useShortLabels: !1,
                min: 0,
                max: Infinity,
                labels: "Years,Months,Days,Hours,Minutes,Seconds".split(","),
                labelsShort: "Yrs,Mths,Days,Hrs,Mins,Secs".split(",")
            };
        c.presetShort("timespan");
        c.presets.scroller.timespan = function(a) {
            function d(a) {
                var c = {};
                b(E).each(function(b, d) {
                    c[d] = k[d] ? Math.floor(a / t[d].limit) : 0;
                    a -= c[d] * t[d].limit
                });
                return c
            }

            function h(a) {
                var b = !1,
                    c = g[k[a] - 1] || 1,
                    d = t[a],
                    e = d.label,
                    h = d.wheel;
                h.data = [];
                h.label = d.label;
                x.match(RegExp(d.re + d.re, "i")) && (b = !0);
                if (a == G) h.min = l[a], h.max = L[a], h.data = function(a) {
                    return {
                        value: a,
                        display: i(a * c, b, e)
                    }
                }, h.getIndex = function(a) {
                    return Math.round(a / c)
                };
                else
                    for (p = 0; p <= d.until; p += c) h.data.push({
                        value: p,
                        display: i(p, b, e)
                    })
            }

            function i(a, b, c) {
                return (10 > a && b ? "0" : "") + a + '<span class="mbsc-ts-lbl">' + c + "</span>"
            }

            function q(a) {
                var c = 0;
                b.each(y, function(b, d) {
                    isNaN(+a[0]) || (c += t[d.v].limit * a[b])
                });
                return c
            }
            var p, o, n, l, L, D = b.extend({}, a.settings),
                w = b.extend(a.settings, e, D),
                x = w.wheelOrder,
                D = w.useShortLabels ? w.labelsShort : w.labels,
                E = "years,months,days,hours,minutes,seconds".split(","),
                t = {
                    years: {
                        ord: 0,
                        index: 6,
                        until: 10,
                        limit: 31536E6,
                        label: D[0],
                        re: "y",
                        wheel: {}
                    },
                    months: {
                        ord: 1,
                        index: 5,
                        until: 11,
                        limit: 2592E6,
                        label: D[1],
                        re: "m",
                        wheel: {}
                    },
                    days: {
                        ord: 2,
                        index: 4,
                        until: 31,
                        limit: 864E5,
                        label: D[2],
                        re: "d",
                        wheel: {}
                    },
                    hours: {
                        ord: 3,
                        index: 3,
                        until: 23,
                        limit: 36E5,
                        label: D[3],
                        re: "h",
                        wheel: {}
                    },
                    minutes: {
                        ord: 4,
                        index: 2,
                        until: 59,
                        limit: 6E4,
                        label: D[4],
                        re: "i",
                        wheel: {}
                    },
                    seconds: {
                        ord: 5,
                        index: 1,
                        until: 59,
                        limit: 1E3,
                        label: D[5],
                        re: "s",
                        wheel: {}
                    }
                },
                y = [],
                g = w.steps || [],
                k = {},
                G = "seconds",
                H = w.defaultValue || Math.max(w.min, Math.min(0, w.max)),
                I = [
                    []
                ];
            b(E).each(function(a, b) {
                o = x.search(RegExp(t[b].re, "i")); - 1 < o && (y.push({
                    o: o,
                    v: b
                }), t[b].index > t[G].index && (G = b))
            });
            y.sort(function(a, b) {
                return a.o > b.o ? 1 : -1
            });
            b.each(y, function(a, b) {
                k[b.v] = a + 1;
                I[0].push(t[b.v].wheel)
            });
            l = d(w.min);
            L = d(w.max);
            b.each(y, function(a, b) {
                h(b.v)
            });
            a.getVal = function(b, c) {
                return c ? a._getVal(b) : a._hasValue || b ? q(a.getArrayVal(b)) : null
            };
            return {
                showLabel: !0,
                wheels: I,
                compClass: "mbsc-ts",
                parseValue: function(a) {
                    var f = [],
                        e;
                    c.util.isNumeric(a) || !a ? (n = d(a || H), b.each(y, function(a, b) {
                        f.push(n[b.v])
                    })) : b.each(y, function(b, c) {
                        e = RegExp("(\\d+)\\s?(" + w.labels[t[c.v].ord] + "|" + w.labelsShort[t[c.v].ord] + ")", "gi").exec(a);
                        f.push(e ? e[1] : 0)
                    });
                    b(f).each(function(a, b) {
                        f[a] = Math.floor(b / (g[a] || 1)) * (g[a] || 1)
                    });
                    return f
                },
                formatValue: function(a) {
                    var c = "";
                    b.each(y, function(b, d) {
                        c += +a[b] ? a[b] + " " + t[d.v].label + " " : ""
                    });
                    return c.replace(/\s+$/g, "")
                },
                validate: function(c) {
                    var f, e, g, h, i = c.values,
                        n = c.direction,
                        o = [],
                        p = !0,
                        w = !0;
                    b(E).each(function(c, s) {
                        if (k[s] !== j) {
                            g = k[s] - 1;
                            o[g] = [];
                            h = {};
                            if (s != G) {
                                if (p)
                                    for (e = L[s] + 1; e <= t[s].until; e++) h[e] = !0;
                                if (w)
                                    for (e = 0; e < l[s]; e++) h[e] = !0
                            }
                            i[g] = a.getValidValue(g, i[g], n, h);
                            f = d(q(i));
                            p = p && f[s] == L[s];
                            w = w && f[s] == l[s];
                            b.each(h, function(a) {
                                o[g].push(a)
                            })
                        }
                    });
                    return {
                        disabled: o
                    }
                }
            }
        }
    })();
    (function() {
        q.$.each(["date",
            "time", "datetime"
        ], function(j, c) {
            q.presetShort(c)
        })
    })();
    (function(j) {
        var c = q,
            b = c.$,
            e = c.util,
            a = e.isString,
            d = {
                inputClass: "",
                invalid: [],
                rtl: !1,
                showInput: !0,
                groupLabel: "Groups",
                checkIcon: "checkmark",
                dataText: "text",
                dataValue: "value",
                dataGroup: "group",
                dataDisabled: "disabled"
            };
        c.presetShort("select");
        c.presets.scroller.select = function(c) {
            function i() {
                var a, c, d, f, e, g = 0,
                    h = 0,
                    i = {};
                G = {};
                t = {};
                k = [];
                E = [];
                Y.length = 0;
                K ? b.each(m.data, function(b, g) {
                    f = g[m.dataText];
                    e = g[m.dataValue];
                    c = g[m.dataGroup];
                    d = {
                        value: e,
                        text: f,
                        index: b
                    };
                    G[e] = d;
                    k.push(d);
                    S && (i[c] === j ? (a = {
                        text: c,
                        value: h,
                        options: [],
                        index: h
                    }, t[h] = a, i[c] = h, E.push(a), h++) : a = t[i[c]], A && (d.index = a.options.length), d.group = i[c], a.options.push(d));
                    g[m.dataDisabled] && Y.push(e)
                }) : S ? b("optgroup", s).each(function(a) {
                    t[a] = {
                        text: this.label,
                        value: a,
                        options: [],
                        index: a
                    };
                    E.push(t[a]);
                    b("option", this).each(function(b) {
                        d = {
                            value: this.value,
                            text: this.text,
                            index: A ? b : g++,
                            group: a
                        };
                        G[this.value] = d;
                        k.push(d);
                        t[a].options.push(d);
                        this.disabled && Y.push(this.value)
                    })
                }) : b("option", s).each(function(a) {
                    d = {
                        value: this.value,
                        text: this.text,
                        index: a
                    };
                    G[this.value] = d;
                    k.push(d);
                    this.disabled && Y.push(this.value)
                });
                k.length && (w = k[0].value);
                R && (k = [], g = 0, b.each(t, function(a, c) {
                    e = "__group" + a;
                    d = {
                        text: c.text,
                        value: e,
                        group: a,
                        index: g++,
                        cssClass: "mbsc-sel-gr"
                    };
                    G[e] = d;
                    k.push(d);
                    Y.push(d.value);
                    b.each(c.options, function(a, b) {
                        b.index = g++;
                        k.push(b)
                    })
                }))
            }

            function q(a, b, c) {
                var d, f = [];
                for (d = 0; d < a.length; d++) f.push({
                    value: a[d].value,
                    display: a[d].text,
                    cssClass: a[d].cssClass
                });
                return {
                    circular: !1,
                    multiple: b,
                    data: f,
                    label: c
                }
            }

            function p() {
                return q(A ? t[x].options : k, u, B)
            }

            function o() {
                var a, b = [
                    []
                ];
                P && (a = q(E, !1, m.groupLabel), U ? b[0][y] = a : b[y] = [a]);
                a = p();
                U ? b[0][H] = a : b[H] = [a];
                return b
            }

            function n(c) {
                u && (c && a(c) && (c = c.split(",")), b.isArray(c) && (c = c[0]));
                g = c === j || null === c || "" === c || !G[c] ? w : c;
                P && (x = G[g] ? G[g].group : null)
            }

            function l() {
                var a = c.getVal();
                D.val(c._tempValue);
                s.val(a)
            }

            function L() {
                var a = {};
                a[H] = p();
                I = !0;
                c.changeWheel(a)
            }
            var D, w, x, E, t, y, g, k, G, H, I, s = b(this),
                f = b.extend({}, c.settings),
                m = b.extend(c.settings, d, f),
                v = m.readonly,
                f = m.layout || (/top|bottom/.test(m.display) ? "liquid" : ""),
                U = "liquid" == f,
                u = e.isNumeric(m.select) ? m.select : "multiple" == m.select || s.prop("multiple"),
                F = this.id + "_dummy",
                O = b('label[for="' + this.id + '"]').attr("for", F),
                B = m.label !== j ? m.label : O.length ? O.text() : s.attr("name"),
                K = !!m.data,
                S = K ? !!m.group : b("optgroup", s).length,
                O = m.group,
                P = S && O && !1 !== O.groupWheel,
                A = S && O && P && !0 === O.clustered,
                R = S && (!O || !1 !== O.header && !A),
                O = s.val() || [],
                Y = [];
            c.setVal = function(b, d, f, g, i) {
                u && (b && a(b) && (b = b.split(",")), c._tempSelected[H] =
                    e.arrayToObject(b), g || (c._selected[H] = e.arrayToObject(b)), b = b ? b[0] : null);
                c._setVal(b, d, f, g, i)
            };
            c.getVal = function(a, b) {
                var d;
                d = u ? e.objectToArray(a ? c._tempSelected[H] : c._selected[H]) : (d = a ? c._tempWheelArray : c._hasValue ? c._wheelArray : null) ? m.group && b ? d : d[H] : null;
                return d
            };
            c.refresh = function() {
                var a = {};
                i();
                m.wheels = o();
                n(g);
                a[H] = p();
                c._tempWheelArray[H] = g;
                P && (a[y] = q(E, !1, m.groupLabel), c._tempWheelArray[y] = x);
                c._isVisible && c.changeWheel(a, 0, !0)
            };
            m.invalid.length || (m.invalid = Y);
            P ? (y = 0, H = 1) : (y = -1, H = 0);
            u &&
                (s.prop("multiple", !0), c._selected[H] = {}, O && a(O) && (O = O.split(",")), c._selected[H] = e.arrayToObject(O));
            b("#" + F).remove();
            s.next().is("input.mbsc-control") ? D = s.off(".mbsc-form").next().removeAttr("tabindex") : (D = b('<input type="text" id="' + F + '" class="mbsc-control mbsc-control-ev ' + m.inputClass + '" readonly />'), m.showInput && D.insertBefore(s));
            c.attachShow(D.attr("placeholder", m.placeholder || ""));
            s.addClass("mbsc-sel-hdn").attr("tabindex", -1);
            i();
            n(s.val());
            return {
                layout: f,
                headerText: !1,
                anchor: D,
                compClass: "mbsc-sel" +
                    (P ? " mbsc-sel-gr-whl" : ""),
                setOnTap: P ? [!1, !0] : !0,
                formatValue: function(a) {
                    var b, d = [];
                    if (u) {
                        for (b in c._tempSelected[H]) d.push(G[b] ? G[b].text : "");
                        return d.join(", ")
                    }
                    a = a[H];
                    return G[a] ? G[a].text : ""
                },
                parseValue: function(a) {
                    n(a === j ? s.val() : a);
                    return P ? [x, g] : [g]
                },
                validate: function(a) {
                    var a = a.index,
                        b = [];
                    b[H] = m.invalid;
                    A && !I && a === j && L();
                    I = false;
                    return {
                        disabled: b
                    }
                },
                onRead: l,
                onFill: l,
                onBeforeShow: function() {
                    if (u && m.counter) m.headerText = function() {
                        var a = 0;
                        b.each(c._tempSelected[H], function() {
                            a++
                        });
                        return (a >
                            1 ? m.selectedPluralText || m.selectedText : m.selectedText).replace(/{count}/, a)
                    };
                    n(s.val());
                    c.settings.wheels = o();
                    I = true
                },
                onWheelGestureStart: function(a) {
                    if (a.index == y) m.readonly = [false, true]
                },
                onWheelAnimationEnd: function(a) {
                    var b = c.getArrayVal(true);
                    if (a.index == y) {
                        m.readonly = v;
                        if (b[y] != x) {
                            x = b[y];
                            g = t[x].options[0].value;
                            b[H] = g;
                            A ? L() : c.setArrayVal(b, false, false, true, 200)
                        }
                    } else if (a.index == H && b[H] != g) {
                        g = b[H];
                        if (P && G[g].group != x) {
                            x = G[g].group;
                            b[y] = x;
                            c.setArrayVal(b, false, false, true, 200)
                        }
                    }
                },
                onDestroy: function() {
                    D.hasClass("mbsc-control") ||
                        D.remove();
                    s.removeClass("mbsc-sel-hdn").removeAttr("tabindex")
                }
            }
        }
    })();
    (function(j) {
        var c = q,
            b = c.$,
            e = {
                inputClass: "",
                values: 5,
                order: "desc",
                style: "icon",
                invalid: [],
                layout: "fixed",
                icon: {
                    filled: "star3",
                    empty: "star3"
                }
            };
        c.presetShort("rating");
        c.presets.scroller.rating = function(a) {
            var d = b.extend({}, a.settings),
                h = b.extend(a.settings, e, d),
                i = b(this),
                d = this.id + "_dummy",
                q = b('label[for="' + this.id + '"]').attr("for", d),
                p = h.label !== j ? h.label : q.length ? q.text() : i.attr("name"),
                o = h.defaultValue,
                q = [
                    []
                ],
                p = {
                    data: [],
                    label: p,
                    circular: !1
                },
                n = {},
                l = [],
                L, D = !1,
                w, x, E, t, y, g, k = "grade" === h.style ? "circle" : "icon";
            i.is("select") && (h.values = {}, b("option", i).each(function() {
                h.values[b(this).val()] = b(this).text()
            }), b("#" + d).remove());
            if (b.isArray(h.values))
                for (w = 0; w < h.values.length; w++) E = +h.values[w], isNaN(E) && (E = w + 1, D = !0), l.push({
                    order: E,
                    key: h.values[w],
                    value: h.values[w]
                });
            else if (b.isPlainObject(h.values))
                for (x in w = 1, D = !0, h.values) E = +x, isNaN(E) && (E = w), l.push({
                    order: E,
                    key: x,
                    value: h.values[x]
                }), w++;
            else
                for (w = 1; w <= h.values; w++) l.push({
                    order: w,
                    key: w,
                    value: w
                });
            h.showText === j && D && (h.showText = !0);
            h.icon.empty === j && (h.icon.empty = h.icon.filled);
            l.sort(function(a, b) {
                return h.order == "desc" ? b.order - a.order : a.order - b.order
            });
            g = "desc" == h.order ? l[0].order : l[l.length - 1].order;
            for (w = 0; w < l.length; w++) {
                y = l[w].order;
                E = l[w].key;
                t = l[w].value;
                D = "";
                for (x = 1; x < y + 1; x++) D += '<span class="mbsc-rating-' + k + ("circle" === k ? "" : " mbsc-ic mbsc-ic-" + h.icon.filled) + ' ">' + ("circle" == k ? x : " ") + "</span>";
                for (x = y + 1; x <= g; x++) D += '<span class="mbsc-rating-' + k + ("circle" === k ? " mbsc-rating-circle-unf" :
                    " mbsc-ic mbsc-ic-" + (h.icon.empty ? h.icon.empty + " mbsc-rating-icon-unf" : "") + (h.icon.empty === h.icon.filled ? " mbsc-rating-icon-same" : "")) + '"></span>';
                o === j && (o = E);
                D += h.showText ? '<span class="mbsc-rating-txt">' + t + "</span>" : "";
                p.data.push({
                    value: E,
                    display: D,
                    label: t
                });
                n[E] = t
            }
            i.is("select") && (L = b('<input type="text" id="' + d + '" value="' + n[i.val()] + '" class="' + h.inputClass + '" placeholder="' + (h.placeholder || "") + '" readonly />').insertBefore(i));
            q[0].push(p);
            L && a.attachShow(L);
            i.is("select") && i.hide().closest(".ui-field-contain").trigger("create");
            a.getVal = function(b) {
                b = a._hasValue ? a[b ? "_tempWheelArray" : "_wheelArray"][0] : null;
                return c.util.isNumeric(b) ? +b : b
            };
            return {
                anchor: L,
                wheels: q,
                headerText: !1,
                compClass: "mbsc-rating",
                setOnTap: !0,
                formatValue: function(a) {
                    return n[a[0]]
                },
                parseValue: function(a) {
                    for (var b in n)
                        if (L && b == a || !L && n[b] == a) return [b];
                    return [o]
                },
                validate: function() {
                    return {
                        disabled: [h.invalid]
                    }
                },
                onFill: function(b) {
                    if (L) {
                        L.val(b.valueText);
                        i.val(a._tempWheelArray[0])
                    }
                },
                onDestroy: function() {
                    L && L.remove();
                    i.show()
                }
            }
        }
    })();
    (function(j, c, b) {
        var c =
            q,
            e = c.$,
            a = e.extend,
            d = c.util,
            h = d.datetime,
            i = h.adjustedDate,
            M = c.presets.scroller,
            p = {};
        c.presetShort("calendar");
        M.calendar = function(c) {
            function n(a) {
                return i(a.getFullYear(), a.getMonth(), a.getDate())
            }
            var l, q, D, w, x, E, t, y = {};
            t = a({}, c.settings);
            var g = a(c.settings, p, t),
                k = g.activeClass || "",
                G = "multiple" == g.select || 1 < g.select || "week" == g.selectType,
                H = d.isNumeric(g.select) ? g.select : Infinity,
                I = !!g.events,
                s = {};
            t = M.calbase.call(this, c);
            l = a({}, t);
            D = g.firstSelectDay === b ? g.firstDay : g.firstSelectDay;
            if (G && g.defaultValue &&
                g.defaultValue.length)
                for (w = 0; w < g.defaultValue.length; w++) s[n(g.defaultValue[w])] = g.defaultValue[w];
            c.onGenMonth = function(a, b) {
                x = c.prepareObj(g.events || g.marked, a, b)
            };
            c.getDayProps = function(a) {
                var c, d = G ? s[a] !== b : b,
                    g = (a = x[a] ? x[a] : !1) && a[0] && a[0].text,
                    h = a && a[0] && a[0].color;
                if (I && g)
                    if (h)
                        if (y[h]) c = y[h];
                        else {
                            c = e('<div style="background-color:' + h + ';"></div>').appendTo("body");
                            var i = (j.getComputedStyle ? getComputedStyle(c[0]) : c[0].style).backgroundColor.replace(/rgb|rgba|\(|\)|\s/g, "").split(","),
                                i = 130 < 0.299 *
                                i[0] + 0.587 * i[1] + 0.114 * i[2] ? "#000" : "#fff";
                            c.remove();
                            c = y[h] = i
                        }
                else c = void 0;
                else c = "";
                var i = c,
                    k = "",
                    l = "";
                if (a) {
                    for (c = 0; c < a.length; c++) a[c].icon && (k += '<span class="mbsc-ic mbsc-ic-' + a[c].icon + '"' + (a[c].text ? "" : a[c].color ? ' style="color:' + a[c].color + ';"' : "") + "></span>\n");
                    l = '<div class="mbsc-cal-day-m"><div class="mbsc-cal-day-m-t">';
                    for (c = 0; c < a.length; c++) l += '<div class="mbsc-cal-day-m-c"' + (a[c].color ? ' style="background:' + a[c].color + ';"' : "") + "></div>";
                    l += "</div></div>"
                }
                return {
                    marked: a,
                    selected: d,
                    cssClass: a ?
                        "mbsc-cal-day-marked" : "",
                    ariaLabel: I ? g : "",
                    markup: I && g ? '<div class="mbsc-cal-day-txt-c"><div class="mbsc-cal-day-txt" title="' + e("<div>" + g + "</div>").text() + '"' + (h ? ' style="background:' + h + ";color:" + i + ';text-shadow:none;"' : "") + ">" + k + g + "</div></div>" : I && k ? '<div class="mbsc-cal-day-ic-c">' + k + "</div>" : a ? l : ""
                }
            };
            c.addValue = function(a) {
                s[n(a)] = a;
                c.refresh()
            };
            c.removeValue = function(a) {
                delete s[n(a)];
                c.refresh()
            };
            c.setVal = function(a, b, d, e, g) {
                if (G) {
                    var h = a;
                    s = {};
                    if (h && h.length)
                        for (w = 0; w < h.length; w++) s[n(h[w])] =
                            h[w];
                    a = a ? a[0] : null
                }
                c._setVal(a, b, d, e, g);
                c.refresh()
            };
            c.getVal = function(a) {
                return G ? d.objectToArray(s) : c.getDate(a)
            };
            a(t, {
                highlight: !G,
                outerMonthChange: !G,
                parseValue: function(a) {
                    var b, d;
                    if (G && a && "string" === typeof a) {
                        s = {};
                        a = a.split(",");
                        for (b = 0; b < a.length; b++) d = h.parseDate(c.format, a[b].replace(/^\s+|\s+$/g, ""), g), s[n(d)] = d;
                        a = a[0]
                    }
                    G && g.defaultValue && g.defaultValue.length && (g.defaultValue = g.defaultValue[0]);
                    return l.parseValue.call(this, a)
                },
                formatValue: function(a) {
                    var b, d = [];
                    if (G) {
                        for (b in s) d.push(h.formatDate(c.format,
                            s[b], g));
                        return d.join(", ")
                    }
                    return l.formatValue.call(this, a)
                },
                onClear: function() {
                    G && (s = {}, c.refresh())
                },
                onBeforeShow: function() {
                    if (g.setOnDayTap === b && (!g.buttons || !g.buttons.length)) g.setOnDayTap = !0;
                    g.setOnDayTap && (g.outerMonthChange = !1);
                    g.counter && G && (g.headerText = function() {
                        var a = 0,
                            b = g.selectType == "week" ? 7 : 1;
                        e.each(s, function() {
                            a++
                        });
                        a = Math.round(a / b);
                        return (a > 1 ? g.selectedPluralText || g.selectedText : g.selectedText).replace(/{count}/, a)
                    })
                },
                onMarkupReady: function(b) {
                    l.onMarkupReady.call(this, b);
                    q = e(b.target);
                    G && (e(".mbsc-fr-hdr", q).attr("aria-live", "off"), E = a({}, s));
                    I && e(".mbsc-cal", q).addClass("mbsc-cal-ev")
                },
                onDayChange: function(a) {
                    var b = a.date,
                        h = n(b),
                        j = e(a.target),
                        a = a.selected;
                    if (G)
                        if ("week" == g.selectType) {
                            var l, p = h.getDay() - D,
                                p = 0 > p ? 7 + p : p;
                            "multiple" != g.select && (s = {});
                            for (j = 0; 7 > j; j++) l = i(h.getFullYear(), h.getMonth(), h.getDate() - p + j), a ? delete s[l] : d.objectToArray(s).length / 7 < H && (s[l] = l);
                            c.refresh()
                        } else j = e('.mbsc-cal .mbsc-cal-day[data-full="' + j.attr("data-full") + '"]', q), a ? (j.removeClass("mbsc-cal-day-sel").removeAttr("aria-selected").find(".mbsc-cal-day-i").removeClass(k),
                            delete s[h]) : d.objectToArray(s).length < H && (j.addClass("mbsc-cal-day-sel").attr("aria-selected", "true").find(".mbsc-cal-day-i").addClass(k), s[h] = h);
                    if (g.setOnDayTap && "multiple" != g.select && "inline" != g.display) return c.needsSlide = !1, c.setDate(b), c.select(), !1
                },
                onCancel: function() {
                    !c.live && G && (s = a({}, E))
                }
            });
            return t
        }
    })(window, document);
    (function() {
        var j = q,
            c = j.presets.scroller;
        c.treelist = c.list;
        j.presetShort("list");
        j.presetShort("treelist")
    })();
    (function() {
        var j = q,
            c = j.$,
            b = j.presets.scroller;
        j.presetShort("image");
        b.image = function(e) {
            e.settings.enhance && (e._processMarkup = function(a) {
                var b = a.attr("data-icon");
                a.children().each(function(a, b) {
                    b = c(b);
                    b.is("img") ? c('<div class="mbsc-img-c"></div>').insertAfter(b).append(b.addClass("mbsc-img")) : b.is("p") && b.addClass("mbsc-img-txt")
                });
                b && a.prepend('<div class="mbsc-ic mbsc-ic-' + b + '"></div');
                a.html('<div class="mbsc-img-w">' + a.html() + "</div>");
                return a.html()
            });
            return b.list.call(this, e)
        }
    })();
    (function() {
        function j(a, b) {
            var h = M(b, "X", !0),
                i = M(b, "Y", !0),
                j = a.offset(),
                q = h - j.left,
                w = i - j.top,
                q = Math.max(q, a[0].offsetWidth - q),
                w = Math.max(w, a[0].offsetHeight - w),
                w = 2 * Math.sqrt(Math.pow(q, 2) + Math.pow(w, 2));
            c(e);
            e = d('<span class="mbsc-ripple"></span>').css({
                width: w,
                height: w,
                top: i - j.top - w / 2,
                left: h - j.left - w / 2
            }).appendTo(a);
            setTimeout(function() {
                e.addClass("mbsc-ripple-scaled mbsc-ripple-visible")
            }, 10)
        }

        function c(a) {
            setTimeout(function() {
                a && (a.removeClass("mbsc-ripple-visible"), setTimeout(function() {
                    a.remove()
                }, 2E3))
            }, 100)
        }
        var b, e, a = q,
            d = a.$,
            h = a.util,
            i = h.testTouch,
            M = h.getCoord;
        a.themes.material = {
            addRipple: j,
            removeRipple: function() {
                c(e)
            },
            initRipple: function(a, h, n, l) {
                var q, D;
                a.off(".mbsc-ripple").on("touchstart.mbsc-ripple mousedown.mbsc-ripple", h, function(a) {
                    i(a, this) && (q = M(a, "X"), D = M(a, "Y"), b = d(this), !b.hasClass(n) && !b.hasClass(l) ? j(b, a) : b = null)
                }).on("touchmove.mbsc-ripple mousemove.mbsc-ripple", h, function(a) {
                    if (b && 9 < Math.abs(M(a, "X") - q) || 9 < Math.abs(M(a, "Y") - D)) c(e), b = null
                }).on("touchend.mbsc-ripple touchcancel.mbsc-ripple mouseleave.mbsc-ripple mouseup.mbsc-ripple", h,
                    function() {
                        b && (setTimeout(function() {
                            c(e)
                        }, 100), b = null)
                    })
            }
        }
    })();
    (function() {
        var j = q.$;
        q.themes.frame["material-dark"] = {
            baseTheme: "material",
            showLabel: !1,
            headerText: !1,
            btnWidth: !1,
            selectedLineHeight: !0,
            selectedLineBorder: 2,
            dateOrder: "MMddyy",
            weekDays: "min",
            deleteIcon: "material-backspace",
            icon: {
                filled: "material-star",
                empty: "material-star-outline"
            },
            checkIcon: "material-check",
            btnPlusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-down",
            btnMinusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-up",
            btnCalPrevClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-left",
            btnCalNextClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-right",
            onMarkupReady: function(c) {
                q.themes.material.initRipple(j(c.target), ".mbsc-fr-btn-e", "mbsc-fr-btn-d", "mbsc-fr-btn-nhl")
            },
            onEventBubbleShow: function(c) {
                var b = j(c.eventList),
                    c = 2 > j(c.target).closest(".mbsc-cal-row").index(),
                    e = j(".mbsc-cal-event-color", b).eq(c ? 0 : -1).css("background-color");
                j(".mbsc-cal-events-arr", b).css("border-color", c ? "transparent transparent " + e + " transparent" : e + "transparent transparent transparent")
            }
        };
        q.themes.listview["material-dark"] = {
            baseTheme: "material",
            onItemActivate: function(c) {
                q.themes.material.addRipple(j(c.target), c.domEvent)
            },
            onItemDeactivate: function() {
                q.themes.material.removeRipple()
            },
            onSlideStart: function(c) {
                j(".mbsc-ripple", c).remove()
            },
            onSortStart: function(c) {
                j(".mbsc-ripple", c.target).remove()
            }
        };
        q.themes.menustrip["material-dark"] = {
            baseTheme: "material",
            onInit: function() {
                q.themes.material.initRipple(j(this), ".mbsc-ms-item", "mbsc-btn-d", "mbsc-btn-nhl")
            }
        };
        q.themes.form["material-dark"] = {
            baseTheme: "material",
            onControlActivate: function(c) {
                var b,
                    e = j(c.target);
                if ("button" == e[0].type || "submit" == e[0].type) b = e;
                "segmented" == e.attr("data-role") && (b = e.next());
                e.hasClass("mbsc-stepper-control") && !e.hasClass("mbsc-step-disabled") && (b = e.find(".mbsc-segmented-content"));
                b && q.themes.material.addRipple(b, c.domEvent)
            },
            onControlDeactivate: function() {
                q.themes.material.removeRipple()
            }
        };
        q.themes.progress["material-dark"] = {
            baseTheme: "material"
        }
    })();
    (function() {
        var j = q.$;
        q.themes.frame["wp-light"] = {
            baseTheme: "wp",
            minWidth: 76,
            height: 76,
            dateDisplay: "mmMMddDDyy",
            headerText: !1,
            showLabel: !1,
            deleteIcon: "backspace4",
            icon: {
                filled: "star3",
                empty: "star"
            },
            btnWidth: !1,
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left2",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right2",
            btnPlusClass: "mbsc-ic mbsc-ic-plus",
            btnMinusClass: "mbsc-ic mbsc-ic-minus",
            onMarkupInserted: function(c, b) {
                var e, a, d, h = c.target,
                    i = b.settings;
                j(".mbsc-sc-whl", h).on("touchstart mousedown wheel mousewheel", function(b) {
                    var c;
                    if (!(c = "mousedown" === b.type && a)) c = j(this).attr("data-index"), c = j.isArray(i.readonly) ? i.readonly[c] :
                        i.readonly;
                    c || (a = "touchstart" === b.type, e = !0, d = j(this).hasClass("mbsc-sc-whl-wpa"), j(".mbsc-sc-whl", h).removeClass("mbsc-sc-whl-wpa"), j(this).addClass("mbsc-sc-whl-wpa"))
                }).on("touchmove mousemove", function() {
                    e = !1
                }).on("touchend mouseup", function(b) {
                    e && d && j(b.target).closest(".mbsc-sc-itm").hasClass("mbsc-sc-itm-sel") && j(this).removeClass("mbsc-sc-whl-wpa");
                    "mouseup" === b.type && (a = !1);
                    e = !1
                })
            },
            onInit: function(c, b) {
                var e = b.buttons;
                e.set.icon = "checkmark";
                e.cancel.icon = "close";
                e.clear.icon = "close";
                e.ok &&
                    (e.ok.icon = "checkmark");
                e.close && (e.close.icon = "close");
                e.now && (e.now.icon = "loop2");
                e.toggle && (e.toggle.icon = "play3");
                e.start && (e.start.icon = "play3");
                e.stop && (e.stop.icon = "pause2");
                e.reset && (e.reset.icon = "stop2");
                e.lap && (e.lap.icon = "loop2");
                e.hide && (e.hide.icon = "close")
            }
        };
        q.themes.listview["wp-light"] = {
            baseTheme: "wp"
        };
        q.themes.menustrip["wp-light"] = {
            baseTheme: "wp"
        };
        q.themes.form["wp-light"] = {
            baseTheme: "wp"
        };
        q.themes.progress["wp-light"] = {
            baseTheme: "wp"
        }
    })();
    q.themes.frame["mobiscroll-dark"] = {
        baseTheme: "mobiscroll",
        rows: 5,
        showLabel: !1,
        headerText: !1,
        btnWidth: !1,
        selectedLineHeight: !0,
        selectedLineBorder: 1,
        dateOrder: "MMddyy",
        weekDays: "min",
        checkIcon: "ion-ios7-checkmark-empty",
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
    };
    q.themes.listview["mobiscroll-dark"] = {
        baseTheme: "mobiscroll"
    };
    q.themes.menustrip["mobiscroll-dark"] = {
        baseTheme: "mobiscroll"
    };
    q.themes.form["mobiscroll-dark"] = {
        baseTheme: "mobiscroll"
    };
    q.themes.progress["mobiscroll-dark"] = {
        baseTheme: "mobiscroll"
    };
    q.themes.frame["android-holo-light"] = {
        baseTheme: "android-holo",
        dateOrder: "Mddyy",
        rows: 5,
        minWidth: 76,
        height: 36,
        showLabel: !1,
        selectedLineHeight: !0,
        selectedLineBorder: 2,
        useShortLabels: !0,
        icon: {
            filled: "star3",
            empty: "star"
        },
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down6",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up6"
    };
    q.themes.listview["android-holo-light"] = {
        baseTheme: "android-holo"
    };
    q.themes.menustrip["android-holo-light"] = {
        baseTheme: "android-holo"
    };
    q.themes.form["android-holo-light"] = {
        baseTheme: "android-holo"
    };
    q.themes.progress["android-holo-light"] = {
        baseTheme: "android-holo"
    };
    (function() {
        var j, c, b, e = q,
            a = e.themes,
            d = e.$;
        c = navigator.userAgent.match(/Android|iPhone|iPad|iPod|Windows|Windows Phone|MSIE/i);
        if (/Android/i.test(c)) {
            if (j = "android-holo", c = navigator.userAgent.match(/Android\s+([\d\.]+)/i)) c = c[0].replace("Android ", ""), j = 5 <= c.split(".")[0] ? "material" : 4 <= c.split(".")[0] ? "android-holo" : "android"
        } else if (/iPhone/i.test(c) || /iPad/i.test(c) ||
            /iPod/i.test(c)) {
            if (j = "ios", c = navigator.userAgent.match(/OS\s+([\d\_]+)/i)) c = c[0].replace(/_/g, ".").replace("OS ", ""), j = "7" <= c ? "ios" : "ios-classic"
        } else if (/Windows/i.test(c) || /MSIE/i.test(c) || /Windows Phone/i.test(c)) j = "wp";
        d.each(a, function(a, c) {
            d.each(c, function(a, c) {
                if (c.baseTheme == j) return e.autoTheme = a, b = !0, !1;
                a == j && (e.autoTheme = a)
            });
            if (b) return !1
        })
    })();
    return q
});