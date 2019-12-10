import { withStyles, Link } from "@material-ui/core";

const styles = theme => {
  return {
    root: {
      padding: "10px"
    },
    paper: {
      width: "100%",
      padding: "10px",
      margin: "0px 20px 20px 0px",
      [theme.breakpoints.down("sm")]: {
        marginRight: "0px"
      }
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        marginBottom: "10px"
      }
    },
    restaurants: {
      columns: "4 450px",
      [theme.breakpoints.up("md")]: {
        columnCount: 3
      },
      [theme.breakpoints.up("lg")]: {
        columnCount: 4
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
    titleWrapper: {
      display: "flex",
      alignItems: "flex-end"
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
