import indexService from '../pages/index/indexService';
import indexInteractor from '../pages/index/indexInteractor';
import factory from './common/InteractorTestFactory.js';
import spyutil from './common/spyutil';
import mocha from 'mocha';
import chai from 'chai';
import sinon from 'sinon';

let expect = chai.expect;
let assert = chai.assert;

var model = new indexService(),
    view = {
        setUserInfo: function () {

        },
    };

describe('Test Index Page', function () {
    var instance;
    var sandbox;
    var userInfo;

    beforeEach(function () {
        userInfo = {
            name: 'khrystal'
        };
        sandbox = sinon.sandbox.create();
        spyutil.spyAll(sandbox);
        spyutil.spyObj(sandbox, view);
        instance = factory.createTestInteractor(indexInteractor, view, model);
    });

    afterEach(function () {
        sandbox.restore();
    });


    describe('When Page onLoad', function () {
        describe('if globalData has userInfo', function () {
            it('should setUserInfo to page', function () {
                sandbox.restore();
                sandbox.spy(instance.view, 'setUserInfo');
                // given
                sandbox.stub(instance.globalData, 'getUserInfo').returns(userInfo);
                // when
                instance.onLoad();
                // then
                expect(instance.view.setUserInfo.calledWith(userInfo)).to.be.ok;
            });
        });
    });

    describe('When click userInfo', function () {

        it('should setUserInfo to page', function () {
            sandbox.restore();
            sandbox.spy(instance.view, 'setUserInfo');
            // when
            instance.onClickUserInfo({detail: {userInfo: {name: 'khrystal'}}});
            // then
            expect(instance.view.setUserInfo.called).to.be.ok;
        });
    });

    describe('When click userInfo', function () {
        it('should setUserInfo to globalData', function () {
            // when
            sandbox.restore();
            sandbox.spy(instance.globalData, 'setUserInfo');
            instance.onClickUserInfo({detail: {userInfo: {name: 'khrystal'}}});
            // then
            expect(instance.globalData.setUserInfo.calledWith({name: 'khrystal'})).to.be.ok;
        });
    });
});

