import {
  Paper,
  Typography,
  CircularProgress,
  withStyles
} from "@material-ui/core";

import styles, { StyledLink } from "./styles";
import Restaurant from "../models/Restaurant";

interface Props {
  classes: any;
  filteredRestaurants: Restaurant[];
}

const RestaurantGrid = (props: Props) => {
  const { classes, filteredRestaurants } = props;

  return (
    <div className={classes.restaurants}>
      {filteredRestaurants &&
        filteredRestaurants.map(restaurant => (
          <Paper
            style={{ backgroundColor: restaurant.color }}
            classes={{ root: classes.paper }}
            className={classes.restaurantItem}
            key={restaurant.id}
          >
            <StyledLink
              variant="h5"
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
