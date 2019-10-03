import { withStyles } from "@material-ui/styles";
import Link from "@material-ui/core/Link";

const styles = theme => {
  return {
    root: {
      padding: "10px"
    },
    paper: {
      maxWidth: "500px",
      padding: "10px",
      margin: "0px 20px 20px 0px"
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px"
    },
    restaurants: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      gridTemplateAreas:
        '"vinka gastro piap rozaSlon" "vinka barbado favola rozaSlon" "vinka vivo restavracija123 gostilna1987" "vinka vivo restavracija123 gostilna1987"',
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexWrap: "wrap"
      }
    },
    restaurantName: {
      fontWeight: "bold"
    },
    menuItem: {
      fontSize: "1rem"
    },
    restaurantItem: {
      width: "calc(100% - 20px)",
      height: "calc(100% - 20px)"
    },
    title: {
      marginRight: "11px"
    },
    loaderWrapper: {
      height: "calc(100% - 40px)",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  };
};

export const StyledLink = withStyles({
  root: {
    cursor: "pointer",
    color: "rgba(0, 0, 0, 0.87)"
  }
})(Link);

export default styles;
