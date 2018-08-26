// TODO make item[0] as key
var typePool = [
    [1, 5, []],
    [2, 1, []],
    [3, 1, [1, 2]],
    [4, 1, [1, 2, 3]],
];

// 2不与其他数字联结
var forbidConcatDigitMap = {
    [15] : true,
}

// 4张不与其他4张联结
var forbidConcatSizeMap = {
    [4] : true,
}

var styleZOrder = {
    0 : 2,
    1 : 1,
    2 : 0,
    3 : 3,
}

var struct = {
    _clone : function(src, dst) {
        var defaultValue = (src instanceof Array) ? [] : {};
        var dst = dst || defaultValue;

        for (var i in src)
        {
            if (typeof src[i] === 'object')
            {
                dst[i] = (src[i].constructor === Array) ? [] : {};
                this._clone(src[i], dst[i]);
                } else
            {
                dst[i] = src[i];
            }
        }

        return dst;
    },

    _select : function(list, size, lenLimit) {
        var slots = [];
        for (var i = 0; i < 13; i++) {
            slots[i] = [];
        }

        for(var i = 0; i < list.length; i++) {
            var digit = list[i].digit;
            slots[digit-3].push(i);
        }

        var groups = [];
        var group = [];
        var newGroup = function() {
            if (group.length >= 1) {
                groups.push(group);
            }
            group = [];
        }

        for(var i = 0; i < slots.length; i++) {
            var indexArr = slots[i];
            if (indexArr.length >= size) {
                if (forbidConcatDigitMap[i+3]) {
                    newGroup();
                }

                group.push(indexArr.slice(0, size));

                if (forbidConcatSizeMap[size]) {
                    newGroup();
                }
            } else {
                newGroup();
            }
        }
        newGroup();

        if (lenLimit) {
            groups = groups.filter(function(group) {
                return group.length >= lenLimit;
            })
        }

        return groups;
    },

    _unselect : function(list, group) {
        var rt = this._clone(list);

        var rGroup = this._clone(group);
        rGroup.reverse();
        var self = this;
        rGroup.forEach(function(indexArr) {
            var rIndexArr = self._clone(indexArr);
            rIndexArr.reverse();
            rIndexArr.forEach(function(index) {
                rt.splice(index, 1);
            });
        });

        this._sort(rt);

        return rt;
    },

    _unselect_smooth : function(src, dst) {
        var rt = [];

        var srcClone = this._clone(src);
        var dstClone = this._clone(dst);
        srcClone.forEach(function(idSrc) {
            var match = false;
            for (var i = 0; i < dstClone.length; i++) {
                var idDst = dstClone[i];
                if (idSrc.digit == idDst.digit && idSrc.style == idDst.style) {
                    dstClone.splice(i, 1);
                    match = true;
                    break;
                }
            }
            if (!match) {
                rt.push(idSrc);
            }
        });

        return rt;
    },

    _sort : function(list) {
        list.sort(function(a, b) {
            var digitDiff = a.digit - b.digit;
            if (digitDiff == 0) {
                return styleZOrder[a.style] - styleZOrder[b.style];
            }
            return digitDiff;
        });
    },

    _pick : function(list, num) {
        var rt = [];
        if (list.length >= num) {
            rt = list.slice(0, num);
        }
        return rt;
    },

    pick : function(list) {
        if (list.length == 0) {
            return [];
        }

        this._sort(list);
        var globalTargetGroup = this._pickLongest(list);

        var listLeft = this._unselect(list, globalTargetGroup);

        var bonus = [];
        typePool[globalTargetGroup[0].length - 1][2].forEach(function(num) {
            var pickCount = num * globalTargetGroup.length;
            var selected = this._pick(listLeft, pickCount);
            if (selected.length > bonus.length) {
                bonus = selected;
            }
        }.bind(this));

        var smoothArr = this._smooth(globalTargetGroup, list);
        return smoothArr.concat(bonus);
    },

    pickLongest : function(list) {
        this._sort(list);

        return this._smooth(this._pickLongest(list), list);
    },

    _pickLongest : function(list) {
        var globalMaxLenth = 0;
        var globalTargetGroup;
        var tagetType = 0;
        for(var typeIndex = 0; typeIndex < typePool.length; typeIndex++) {
            var typeInfo = typePool[typeIndex];
            var groups = this._select(list, typeInfo[0], typeInfo[1]);

            var maxLength = 0;
            var targetGroup;
            groups.forEach(function(group) {
                var len = group.length * typeInfo[0];
                if (len > maxLength) {
                    targetGroup = group;
                    maxLength = len;
                }
            });

            if (maxLength > 0) {
                if (typeInfo[2].length > 0) {
                    var size = maxLength / typeInfo[0];
                    var listLeft = this._unselect(list, targetGroup);

                    var bonusLength = 0;
                    typeInfo[2].forEach(function(num) {
                        var pickCount = num * size;
                        var selected = this._pick(listLeft, pickCount);
                        var selectedLength = selected.length;
                        if (selectedLength > bonusLength) {
                            bonusLength = selected.length;
                        }
                    }.bind(this));

                    maxLength += bonusLength;
                }
            }

            if (maxLength > globalMaxLenth || (maxLength == 4 && globalMaxLenth == 4)) {
                globalMaxLenth = maxLength;
                globalTargetGroup = targetGroup;
            }
        }

        if (!globalTargetGroup) {
            globalTargetGroup = [[0]];
            globalMaxLenth = 1;
        }

        return globalTargetGroup;
    },

    // [{ digit: 3, style: 0 }]
    _smooth : function(globalTargetGroup, list) {
        var smoothArr = [];
        globalTargetGroup.forEach(function(group) {
            group.forEach(function(index) {
                smoothArr.push(list[index]);
            });
        });

        return smoothArr;
    },

    _getSortNum : function(list) {
        var slots = [];
        for (var i = 0; i < 13; i++) {
            slots[i] = 0;
        }

        for(var i = 0; i < list.length; i++) {
            var digit = list[i].digit;
            slots[digit-3] = 1;
        }

        return slots.reduce(function(a, b) {
            return a + b;
        });
    },

    _getMax : function(list) {
        var maxDigit = 0;
        list.forEach(function(identity) {
            if (identity.digit > maxDigit) {
                maxDigit = identity.digit;
            }
        })
        return maxDigit;
    },

    _isAirplane : function(list) {
        var typeInfo = typePool[2];
        var groups = this._select(list, typeInfo[0], typeInfo[1]);
        var num = list.length;

        if (groups.length > 0) {
            var dis = groups[0].length;
            var two = dis == 2 && (num == 6 || num == 8 || num == 10);
            var three = dis == 3 && (num == 9 || num == 12 || num == 15);
            return two || three;
        }

        return false;
    },

    _isBoom : function(list) {
        if (list.length != 4) {
            return false;
        }

        var sum = list.reduce(function(a, b) {
            return {digit : (a.digit + b.digit)};
        });
        return (sum.digit / list.length) == list[0].digit;
    },

    _isLIANDUI : function(list) {
        var typeInfo = typePool[1];
        var groups = this._select(list, typeInfo[0], typeInfo[1]);

        if (groups.length > 0 && list.length >= 4) {
            return groups[0].length*2 == list.length;
        }

        return false;
    },

    _isSHUNZI : function(list) {
        var typeInfo = typePool[0];
        var groups = this._select(list, typeInfo[0], typeInfo[1]);

        if (groups.length > 0) {
            return groups[0].length == list.length;
        }

        return false;
    },

    _getBoom : function(list) {
        var typeInfo = typePool[3];
        var groups = this._select(list, typeInfo[0], typeInfo[1]);

        return groups.map(function(group) {
            return this._smooth(group, list);
        }.bind(this));
    },

    check : function(src, dst) {
        var cards = this.filter(src, dst).matches;
        return cards[0] && cards[0].length == src.length;
    },

    _generateComponents : function(src, dst) {
        var numDst = dst.length / this._getSortNum(dst);

        var lSrc = src.length;
        var lDst = dst.length;

        var arr = [];
        for (var i = 0; i < lSrc; i += numDst) {
            if (src[i].digit > dst[0].digit) {
                var component = [];
                for (var j = 0; j < lDst && i + j < lSrc; j++) {
                    component.push(src[i+j]);
                }
                if (component.length == lDst) {
                    arr.push(component);
                }
            }
        }

        return arr;
    },

    filter : function(src, dst) {
        if (src.length == 0) {
            return {matches : []};
        }

        if (!dst || dst.length == 0) {
            return {matches : [this.pick(src)]};
        }

        this._sort(src);
        this._sort(dst);

        // // 单张
        if (dst.length == 1) {
            var result = src.filter(function(identity) {
                return identity.digit > dst[0].digit;
            });

            result = result.map(function(item) {
                return [item];
            });

            return {matches : result};
        }

        // 炸弹
        var lastMatch = function() {
            var booms = this._getBoom(src);
            if (booms.length > 0) {
                if (!this._isBoom(dst)) {
                    return {matches : booms};
                } else {
                    booms = booms.filter(function(boom) {
                        return boom[0].digit > dst[0].digit;
                    });
                    return {matches : booms};
                }
            } else {
                return {matches : []};
            }
        }.bind(this);

        if (src.length < dst.length) {
            return lastMatch();
        }

        var lDst = this.pickLongest(dst);
        var numDst = this._getSortNum(lDst);
        var maxDst = this._getMax(lDst);
        var type = lDst.length / numDst;

        var typeInfo = typePool[type - 1];
        var groups = this._select(src, typeInfo[0], typeInfo[1]);

        var targetGroups = [];
        groups.forEach(function(group) {
            var len = group.length * typeInfo[0];
            if (len >= lDst.length) {
                targetGroups.push(group);
            }
        }.bind(this));

        if (targetGroups.length > 0) {
            var arr = [];
            var withFollow = typeInfo[2].length > 0;
            for (var i = 0; i < targetGroups.length; i++) {
                var targetGroup = targetGroups[i];
                var smoothArr = this._smooth(targetGroup, src);
                var maxSrc = this._getMax(smoothArr);

                if (maxSrc <= maxDst) {
                    continue;
                }

                var components = this._generateComponents(smoothArr, lDst);

                for (var j = 0; j < components.length; j++) {
                    var component = components[j];

                    if (withFollow) {
                        var pickCount = dst.length - lDst.length;
                        var listLeft = this._unselect_smooth(src, component);
                        var selected = this._pick(listLeft, pickCount);

                        arr.push(component.concat(selected));
                    } else {
                        arr.push(component);
                    }
                }
            }
            if (arr.length > 0) {
                return {matches : arr, withFollow : withFollow};
            } else {
                return lastMatch();
            }
        } else {
            return lastMatch();
        }
    },

    judge : function(dst) {
        var lDst = this.pickLongest(dst);
        var numDst = this._getSortNum(lDst);
        var type = lDst.length / numDst;

        // console.log(lDst)

        return {
            type : type,
            repeat : lDst.length / type,
            length : dst.length,
            bonus : dst.length - lDst.length
        }
    },
};

module.exports = struct;