import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles, { StyledLink } from "../components/styles";

const RestaurantGrid = props => {
  const { classes, filteredRestaurants } = props;

  return (
    <div className={classes.restaurants}>
      {filteredRestaurants &&
        filteredRestaurants.map(restaurant => (
          <Paper
            classes={{ root: classes.paper }}
            style={{ gridArea: restaurant.id }}
            className={classes.restaurantItem}
            key={restaurant.id}
          >
            <StyledLink
              variant="h5"
              component="h3"
              classes={{ root: classes.restaurantName }}
              onClick={() => window.open(restaurant.url, "_blank")}
            >
              {restaurant.name}
            </StyledLink>
            {restaurant.menuItems ? (
              restaurant.menuItems
                .filter(m => m)
                .map((menuItem, i) => (
                  <Typography
                    component="p"
                    key={i}
                    classes={{ root: classes.menuItem }}
                  >
                    - {menuItem.toLowerCase()}
                  </Typography>
                ))
            ) : (
              <div className={classes.loaderWrapper}>
                <CircularProgress className={classes.progress} />
              </div>
            )}
          </Paper>
        ))}
    </div>
  );
};

export default withStyles(styles)(RestaurantGrid);
