import ReactGA from "react-ga";

export const initGA = () => {
  if (!process.env.GOOGLE_ANALYTICS_TRACKER_ID) {
    return;
  }
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKER_ID, {
    debug: true,
    testMode: process.env.NODE_ENV === "development"
  });
};

export const categories = {
  SELECT_RESTAURANTS: "SELECT_RESTAURANTS"
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const sendEvent = ({ category, action, label, value }) =>
  ReactGA.event({
    category,
    action,
    label,
    value
  });
