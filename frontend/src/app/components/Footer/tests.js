/* global describe, beforeEach, it */

import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import { shallow } from "enzyme";

import Footer from "./index";

describe("app/components/Footer", () => {
  const clickEventFactory = label => {
    const getAttribute = sinon.spy(() => label);
    const mockClickEvent = {
      preventDefault: sinon.spy(),
      stopPropagation: sinon.spy(),
      target: {
        getAttribute,
        href: '/foo'
      }
    };
    return { mockClickEvent, getAttribute };
  };
  let getAttribute, subject, sendToGA;
  beforeEach(() => {
    sendToGA = sinon.spy();
    subject = shallow(<Footer sendToGA={sendToGA} />);
  });

  it("should render expected default legal links", () => {
    expect(subject.find(".legal-links")).to.have.property("length", 1);
  });

  it("should render expected social links", () => {
    expect(subject.find(".social-links")).to.have.property("length", 1);
  });

  it("should ping GA on social link clicks", () => {
    ["github", "twitter"].forEach(label => {
      const { mockClickEvent, getAttribute } = clickEventFactory(label);

      subject.find(`.social-links .link-icon.${label}`)
        .simulate("click", mockClickEvent);

      expect(getAttribute.called).to.be.true;
      expect(sendToGA.lastCall.args).to.deep.equal(["event", {
        eventCategory: "FooterView Interactions",
        eventAction: "social link clicked",
        eventLabel: label,
        outboundURL: mockClickEvent.target.href
      }]);
    });
  });
});
