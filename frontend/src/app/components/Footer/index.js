// @flow
import { Localized } from "fluent-react/compat";
import React from "react";

import LayoutWrapper from "../LayoutWrapper";

import "./index.scss";

type FooterProps = {
  sendToGA: Function
}

export default class Footer extends React.Component {
  props: FooterProps

  render() {
    return (
      <footer id="main-footer">
        <LayoutWrapper flexModifier="row-bottom-breaking">
          <div className="legal-links">
            <a href="https://www.mozilla.org" className="mozilla-logo"></a>
            <Localized id="footerLinkLegal">
              <a href="https://www.mozilla.org/about/legal/" className="boilerplate">Legal</a>
            </Localized>
            <Localized id="footerLinkFeedback">
              <a href="https://qsurvey.mozilla.com/s3/test-pilot-general-feedback" className="boilerplate">Give Feedback</a>
            </Localized>
            <Localized id="footerLinkAbout">
              <a href="/about" className="boilerplate">About Test Pilot</a>
            </Localized>
            <Localized id="footerLinkPrivacy">
              <a href="/privacy" className="boilerplate">Privacy</a>
            </Localized>
            <Localized id="footerLinkTerms">
              <a href="/terms" className="boilerplate">Terms</a>
            </Localized>
            <Localized id="footerLinkCookies">
              <a href="https://www.mozilla.org/privacy/websites/#cookies" className="boilerplate">Cookies</a>
            </Localized>
          </div>
          <div className="social-links">
            <a onClick={(e) => this.eventToGA(e)} href="https://github.com/mozilla/testpilot"
              target="_blank" className="link-icon github"
              rel="noopener noreferrer" title="GitHub"></a>
            <a onClick={(e) => this.eventToGA(e)} href="https://twitter.com/FxTestPilot"
              target="_blank" rel="noopener noreferrer"
              className="link-icon twitter" title="Twitter"></a>
          </div>
        </LayoutWrapper>
      </footer>
    );
  }

  eventToGA(e: Object) {
    e.preventDefault();
    const label = e.target.getAttribute("title");
    this.props.sendToGA("event", {
      eventCategory: "FooterView Interactions",
      eventAction: "social link clicked",
      eventLabel: label,
      outboundURL: e.target.href
    });
  }

}
