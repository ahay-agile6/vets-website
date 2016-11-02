import React from 'react';

class AskVAQuestions extends React.Component {
  render() {
    return (
      <div className="ask-va-questions claims-sidebar-box">
        <h4 className="claims-sidebar-header">Questions?</h4>
        <p className="talk">Talk to a VA representative:</p>
        <p className="phone-number">
          <a href="tel:+1-800-827-1000">1-800-827-1000</a><br/>
          Monday - Friday, 8:00 am - 9:00 pm ET
        </p>
        <p><a href="https://iris.custhelp.com/">Submit a question to the VA</a></p>
      </div>
    );
  }
}

export default AskVAQuestions;
