// @flow

import classnames from "classnames";
import { Localized } from "fluent-react/compat";
import React from "react";

import { buildSurveyURL, experimentL10nId } from "../../lib/utils";
import { justUpdated, justLaunched } from "../../lib/experiment";

import "./index.scss";

import type { InstalledExperiments } from "../../reducers/addon";

import ExperimentPlatforms from "../ExperimentPlatforms";

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_WEEK = 7 * ONE_DAY;

type ExperimentRowCardProps = {
  experiment: Object,
  hasAddon: any,
  enabled: Boolean,
  isFirefox: Boolean,
  isMinFirefox: Boolean,
  installed: InstalledExperiments,
  clientUUID: ?string,
  eventCategory: string,
  sendToGA: Function,
  navigateTo: Function,
  isAfterCompletedDate: Function
}

export default class ExperimentRowCard extends React.Component {
  props: ExperimentRowCardProps

  l10nId(pieces: string) {
    return experimentL10nId(this.props.experiment, pieces);
  }

  render() {
    const { hasAddon, experiment, enabled, isAfterCompletedDate,
      isFirefox, isMinFirefox } = this.props;

    const { description, title, subtitle, slug } = experiment;
    const isCompleted = isAfterCompletedDate(experiment);

    // enabled trumps justUpdated
    const updated = enabled ? false : justUpdated(experiment);
    // justUpdated and enabled trump justLaunched
    const launched = (enabled || updated) ? false : justLaunched(experiment);

    return (
      <a href={`/experiments/${slug}`} onClick={evt => this.openDetailPage(evt)}
        className={classnames("experiment-summary", {
          enabled,
          "just-launched": launched,
          "just-updated": updated,
          "has-addon": hasAddon
        })}
      >
        <div className="experiment-actions">
          {enabled && <Localized id="experimentListEnabledTab">
            <div className="tab enabled-tab">Enabled</div>
          </Localized>}
          {launched && <Localized id="experimentListJustLaunchedTab">
            <div className="tab just-launched-tab">Just Launched</div>
          </Localized>}
          {updated && <Localized id="experimentListJustUpdatedTab">
            <div className="tab just-updated-tab">Just Updated</div>
          </Localized>}
        </div>
        <div className={`experiment-icon-wrapper-${experiment.slug} experiment-icon-wrapper`}>
          <div className={`experiment-icon-${experiment.slug} experiment-icon`}></div>
        </div>
        <div className="experiment-information">
          <header>
            <div>
              <h3>{title}</h3>
              {subtitle && <Localized id={this.l10nId("subtitle")}>
                <h4 className="subtitle">{subtitle}</h4>
              </Localized>}
              {this.statusMsg() &&
                <h4>{this.statusMsg()}</h4>
              }
            </div>
            {this.renderFeedbackButton()}
          </header>
          <ExperimentPlatforms experiment={experiment} />
          <Localized id={this.l10nId("description")}>
            <p>{description}</p>
          </Localized>
          { this.renderManageButton(enabled, hasAddon, isCompleted, isFirefox, isMinFirefox) }
        </div>
      </a>
    );
  }

  renderFeedbackButton() {
    if (!this.props.enabled) { return null; }

    const { experiment, installed, clientUUID } = this.props;
    const { title, survey_url } = experiment;
    const surveyURL = buildSurveyURL("givefeedback", title, installed, clientUUID, survey_url);
    return (
      <div>
        <Localized id="experimentCardFeedback">
          <a onClick={() => this.handleFeedback()}
            href={surveyURL} target="_blank" rel="noopener noreferrer"
            className="experiment-feedback">
            Feedback
          </a>
        </Localized>
      </div>
    );
  }

  handleFeedback() {
    const { experiment, eventCategory } = this.props;
    this.props.sendToGA("event", {
      eventCategory,
      eventAction: "Give Feedback",
      eventLabel: experiment.title
    });
  }

  renderManageButton(enabled: Boolean, hasAddon: Boolean, isCompleted: Boolean,
    isFirefox: Boolean, isMinFirefox: Boolean) {
    if (enabled && hasAddon) {
      return (
        <Localized id="experimentCardManage">
          <div className="button secondary">Manage</div>
        </Localized>
      );
    } else if (isCompleted) {
      return (
        <Localized id="experimentCardLearnMore">
          <div className="button secondary">Learn More</div>
        </Localized>
      );
    } else if (!isFirefox || !isMinFirefox) {
      return (
        <Localized id="experimentCardLearnMore">
          <div className="button secondary">Learn More</div>
        </Localized>
      );
    }
    return (
      <Localized id="experimentCardGetStarted">
        <div className="button default">Get Started</div>
      </Localized>
    );
  }

  statusMsg() {
    const { experiment } = this.props;

    if (experiment.completed) {
      const delta = (new Date(experiment.completed)).getTime() - Date.now();
      if (delta < 0) {
        return "";
      } else if (delta < ONE_DAY) {
        return <Localized id="experimentListEndingTomorrow">
          <span className="eol-message">Ending Tomorrow</span>
        </Localized>;
      } else if (delta < ONE_WEEK) {
        return <Localized id="experimentListEndingSoon">
          <span className="eol-message">Ending Soon</span>
        </Localized>;
      }
    }
    return "";
  }

  openDetailPage(evt) {
    const { eventCategory, experiment, sendToGA } = this.props;
    const { title } = experiment;
    evt.preventDefault();
    sendToGA("event", {
      eventCategory,
      eventAction: "Open detail page",
      eventLabel: title,
      outboundURL: evt.target.href
    });
  }

}
