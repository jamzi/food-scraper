import { useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { format, isAfter } from "date-fns";

import initialRestaurants from "../constants/restaurants";
import styles from "./styles";

const Index = props => {
  const { classes } = props;
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [updatedAt, setUpdatedAt] = useState(undefined);

  const getFood = async () => {
    initialRestaurants.forEach(async restaurant => {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `api/food?id=${restaurant.id}&url=${restaurant.url}`
          : `http://localhost:9999/api/food?id=${restaurant.id}&url=${restaurant.url}`
      );

      const data = await response.json();

      setRestaurants(restaurants => {
        const newRestaurants = [...restaurants];
        let restaurant = newRestaurants.find(r => r.id === data.id);
        if (restaurant) {
          restaurant.menuItems = data.menuItems;
        }
        return newRestaurants;
      });

      setUpdatedAt(updatedAt => {
        const dateHeader = response.headers.get("date");
        if (!dateHeader) {
          return;
        }
        const date = new Date(dateHeader);
        if (!updatedAt || (date && updatedAt && isAfter(date, updatedAt))) {
          updatedAt = date;
        }
        return updatedAt;
      });
    });
  };

  useEffect(() => {
    getFood();
    const interval = setInterval(() => {
      getFood();
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Typography
          variant="h4"
          component="h2"
          classes={{ root: classes.title }}
        >
          <span>{`LJ Food `}</span>
          {updatedAt && <span>{format(updatedAt, "dd.MM.yyyy")}</span>}
        </Typography>
        {updatedAt && (
          <Typography variant="h6">
            {`(updated at ${format(updatedAt, "HH:mm")}) `}
          </Typography>
        )}
      </div>
      <div className={classes.restaurants}>
        {restaurants &&
          restaurants.map(restaurant => (
            <Paper
              classes={{ root: classes.paper }}
              style={{ gridArea: restaurant.id }}
              className={classes.restaurantItem}
              key={restaurant.id}
            >
              <Typography
                variant="h5"
                component="h3"
                classes={{ root: classes.restaurantName }}
              >
                {restaurant.name}
              </Typography>
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
    </div>
  );
};

export default withStyles(styles)(Index);
