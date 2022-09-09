import CookieConsent, {getCookieConsentValue} from 'react-cookie-consent';
import React from 'react';
import {translate, Translate} from "react-jhipster";

const AppCookieConsent = () => {
  const cookieConsentValue = getCookieConsentValue();
  const show = cookieConsentValue === null || cookieConsentValue === undefined;
  return (
    show && (
      <>
        <CookieConsent
          buttonText={translate('cookieConsent.content.allow')}
          onAccept={() => {
            alert('yay!');
          }}
          debug={true}
          enableDeclineButton
          declineButtonText={translate('cookieConsent.content.deny')}
          onDecline={() => {
            alert('nay!');
          }}
        >
          <Translate contentKey="cookieConsent.content.header">Cookies used on the website!</Translate>
          <a href="{{translate('')}}" style={{fontSize: 'x-small'}}>
            <Translate contentKey="cookieConsent.content.policy">Cookie Policy</Translate>
          </a>
        </CookieConsent>
      </>
    )
  );
};

export default AppCookieConsent;
