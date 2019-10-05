import ReactGA from "react-ga";

export const categories = {
  SELECT_RESTAURANTS: "SELECT_RESTAURANTS"
};

export const initGA = () => {
  ReactGA.initialize("UA-149454652-1", {
    titleCase: false,
    testMode: process.env.NODE_ENV === "development",
    debug: false /* Set to true to test out new events */
  });
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
