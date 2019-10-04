import { withStyles } from "@material-ui/styles";
import Link from "@material-ui/core/Link";

const styles = theme => {
  return {
    root: {
      padding: "10px"
    },
    paper: {
      width: "400px",
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
      columnFill: "balance",
      height: "calc(100vh - 100px)",
      [theme.breakpoints.up("md")]: {
        columnCount: 3
      },
      [theme.breakpoints.up("lg")]: {
        columnCount: 4
      },
      [theme.breakpoints.up("xl")]: {
        columnCount: 5
      },
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
      display: "inline-block"
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
