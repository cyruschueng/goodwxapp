import React from 'react';
import classnames from 'classnames';
import svg4everybody from 'svg4everybody';

const webkitUA = /\bAppleWebKit\/(\d+)\b/;

class Symbol extends React.Component {
  componentDidMount() {
    const webkitUAVersion = (navigator.userAgent.match(webkitUA) || [])[1];
    svg4everybody({
      polyfill: webkitUAVersion === '600' || webkitUAVersion < 537,
    });
  }

  prefixClass(str) {
    return `${this.props.prefixCls}-${str}`;
  }

  render() {
    const t = this;
    const { className, name, onClick, ...others } = t.props;

    return (
      <div
        onClick={onClick} className={classnames(t.prefixClass('icon'), {
          [className]: !!className,
        })}
      >
        <svg className={t.prefixClass('icon-svg')} {...others}>
          <use xlinkHref={`#${name}`} />
        </svg>
        <div className={t.prefixClass('icon-mask')} />
      </div>
    );
  }
}

Symbol.defaultProps = {
  className: '',
  prefixCls: 't',
  name: '',
  width: 32,
  height: 32,
  fill: '#000',
  onClick: () => {},
};


// http://facebook.github.io/react/docs/reusable-components.html
Symbol.propTypes = {
  className: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fill: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

Symbol.displayName = 'Symbol';

export default Symbol;
