import expect from 'expect.js';
import Formatter from '../src';

String.prototype.padStart = function (targetLength, padString) {
  padString = padString || ' ';
  if (this.length >= targetLength) {
    return this;
  }
  const gap = targetLength - this.length;
  const times = Math.floor(gap / padString.length);
  let result = '';
  for (let i = 0; i < times; i++) {
    result += padString;
  }
  return result + padString.slice(0, gap % padString.length) + this;
};

describe('Formatter.date', () => {
  const date = new Date();
  it('returns empty string when date is invalid', () => {
    expect(Formatter.date('test!@#$%^', 'YYYY-MM-DD')).to.be('');
  });

  it('returns empty string when date is null', () => {
    expect(Formatter.date(null, 'YYYY-MM-DD')).to.be('');
  });

  it('works fine', () => {
    expect(Formatter.date(date, 'YYYY-MM-DD')).to.be(`${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`);
  });

  it('works without pattern', () => {
    expect(Formatter.date(date)).to.be(`${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`);
  });

  it('works with custom pattern', () => {
    expect(Formatter.date(date, 'MM-DD')).to.be(`${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`);
    expect(Formatter.date(date, 'DD')).to.be(`${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`);
    expect(Formatter.date(date, 'MM-dd')).to.be(`${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`);
    expect(Formatter.date(date, 'QQ')).to.be(`${Math.floor(date.getMonth() / 3) + 1}`.padStart(2, '0'));
    expect(Formatter.date(date, 'qq')).to.be(`${Math.floor(date.getMonth() / 3) + 1}`.padStart(2, '0'));
    expect(Formatter.date(date, 'hh:mm:ss S')).to.be(`${`${date.getHours()}`.padStart(2, '0')}:${`${date.getMinutes()}`.padStart(2, '0')}:${`${date.getSeconds()}`.padStart(2, '0')} ${`${date.getMilliseconds()}`.padStart(3, '0')}`);
  });
});

describe('Formatter.money', () => {
  it('works fine', () => {
    expect(Formatter.money('100', ' ')).to.be('100');
    expect(Formatter.money('1000000000', ' ')).to.be('1 000 000 000');
    expect(Formatter.money('1000000000.999999', ' ')).to.be('1 000 000 000.999999');
  });

  it('works without delimiter', () => {
    expect(Formatter.money('100')).to.be('100');
    expect(Formatter.money('1000000000')).to.be('1 000 000 000');
    expect(Formatter.money('1000000000.999999')).to.be('1 000 000 000.999999');
  });

  it('works with custom delimiter', () => {
    expect(Formatter.money('100', ',')).to.be('100');
    expect(Formatter.money('1000000000', ',')).to.be('1,000,000,000');
    expect(Formatter.money('1000000000.999999', ',')).to.be('1,000,000,000.999999');
    expect(Formatter.money('1000000000', '')).to.be('1000000000');
  });

  it('works with fixed number', () => {
    expect(Formatter.money('100', ',', 0)).to.be('100');
    expect(Formatter.money('100', ',', 2)).to.be('100.00');
    expect(Formatter.money('1000000000.8888', ',', 2)).to.be('1,000,000,000.89');
    expect(Formatter.money('1000000000.99', ',', 5)).to.be('1,000,000,000.99000');
  });
});

describe('Formatter.cnmobile', () => {
  it('works fine', () => {
    expect(Formatter.cnmobile('13888888888', ' ')).to.be('1388 8888 888');
    expect(Formatter.cnmobile('+8613888888888', ' ')).to.be('+86 1388 8888 888');
    expect(Formatter.cnmobile('08613888888888', ' ')).to.be('086 1388 8888 888');
  });

  it('works without delimiter', () => {
    expect(Formatter.cnmobile('13888888888')).to.be('1388 8888 888');
    expect(Formatter.cnmobile('+8613888888888')).to.be('+86 1388 8888 888');
    expect(Formatter.cnmobile('08613888888888')).to.be('086 1388 8888 888');
  });

  it('works with custom delimiter', () => {
    expect(Formatter.cnmobile('13888888888', ',')).to.be('1388,8888,888');
    expect(Formatter.cnmobile('+8613888888888', ',')).to.be('+86,1388,8888,888');
    expect(Formatter.cnmobile('08613888888888', ',')).to.be('086,1388,8888,888');
  });
});

describe('Formatter.card', () => {
  it('works fine', () => {
    expect(Formatter.card('1234', ' ')).to.be('1234');
    expect(Formatter.card('12345678', ' ')).to.be('1234 5678');
    expect(Formatter.card('123456789012', ' ')).to.be('1234 5678 9012');
    expect(Formatter.card('1234567890123456', ' ')).to.be('1234 5678 9012 3456');
    expect(Formatter.card('1234567890123456789', ' ')).to.be('1234 5678 9012 3456 789');
  });

  it('works without delimiter', () => {
    expect(Formatter.card('1234')).to.be('1234');
    expect(Formatter.card('12345678')).to.be('1234 5678');
    expect(Formatter.card('123456789012')).to.be('1234 5678 9012');
    expect(Formatter.card('1234567890123456')).to.be('1234 5678 9012 3456');
    expect(Formatter.card('1234567890123456789')).to.be('1234 5678 9012 3456 789');
  });

  it('works with custom delimiter', () => {
    expect(Formatter.card('12345678', ',')).to.be('1234,5678');
    expect(Formatter.card('123456789012', ',')).to.be('1234,5678,9012');
    expect(Formatter.card('1234567890123456', ',')).to.be('1234,5678,9012,3456');
    expect(Formatter.card('1234567890123456789', ',')).to.be('1234,5678,9012,3456,789');
  });
});
