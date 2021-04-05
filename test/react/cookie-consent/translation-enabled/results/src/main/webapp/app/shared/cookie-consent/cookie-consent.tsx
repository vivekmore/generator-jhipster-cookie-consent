import CookieConsent, {getCookieConsentValue} from 'react-cookie-consent';
import React from 'react';

const AppCookieConsent = () => {
  const cookieConsentValue = getCookieConsentValue();
  const show = cookieConsentValue === null || cookieConsentValue === undefined;
  return show && <>
    <CookieConsent
      buttonText={'Accept'}
      onAccept={() => {
        alert('yay!');
      }}
      debug={true}
      enableDeclineButton
      declineButtonText="Decline"
      onDecline={() => {
        alert('nay!');
      }}
    >
      Cookies used on the website!
      {' '}
      <a href="https://cookiesandyou.com" style={{fontSize: 'x-small'}}>Cookie Policy</a>
    </CookieConsent>
  </>;
}

export default AppCookieConsent;
