import ReactGA from "react-ga";

export const initGA = () => {
  if (
    !(
      process.env.NODE_ENV === "production" &&
      process.env.GOOGLE_ANALYTICS_TRACKER_ID
    )
  ) {
    return;
  }
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKER_ID, { debug: true });
};

export const categories = {
  SELECT_RESTAURANTS: "SELECT_RESTAURANTS"
};

export const logPageView = () => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = ({ category = "", action = "", label = "" }) => {
  if (category && action) {
    ReactGA.event({ category, action, label });
  }
};
