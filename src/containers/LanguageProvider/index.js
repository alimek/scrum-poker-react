import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { IntlProvider } from 'react-intl';

class LanguageProvider extends React.Component {
  render() {
    return (
      <IntlProvider locale={this.props.locale} messages={this.props.messages[this.props.locale]}>
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};


export default connect(
  store => ({
    locale: store.app.locale,
  }),
)(LanguageProvider);
