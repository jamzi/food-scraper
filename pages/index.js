import { useEffect, useState, useMemo } from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { format, isAfter } from "date-fns";

import initialRestaurants from "../constants/restaurants";
import styles from "../components/styles";
import RestaurantGrid from "../components/restaurantGrid";
import SelectRestaurantsDialog from "../components/dialogs/selectRestaurants";

const Index = props => {
  const { classes } = props;
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [updatedAt, setUpdatedAt] = useState(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isBlacklistLoaded, setIsBlacklistLoaded] = useState(false);
  const [blacklistedRestaurants, setBlacklistedRestaurants] = useState([]);

  useEffect(() => {
    const br = localStorage.getItem("blacklistedRestaurants");
    if (br) {
      setBlacklistedRestaurants(JSON.parse(br));
      setIsBlacklistLoaded(true);
    }
  }, []);

  useEffect(() => {
    getFood();
    const interval = setInterval(() => {
      getFood();
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [blacklistedRestaurants]);

  const filteredRestaurants = useMemo(() => {
    if (!restaurants) {
      return [];
    }
    return restaurants.reduce((acc, restaurant) => {
      const blacklistIndex = blacklistedRestaurants.findIndex(
        bId => bId === restaurant.id
      );
      if (blacklistIndex === -1) {
        acc.push(restaurant);
      }
      return acc;
    }, []);
  }, [blacklistedRestaurants]);

  const handleSetBlacklist = blacklist => {
    setBlacklistedRestaurants(blacklist);
    localStorage.setItem("blacklistedRestaurants", JSON.stringify(blacklist));
  };

  const getFood = async () => {
    filteredRestaurants.forEach(async restaurant => {
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

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <div>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
          Select Restaurants
        </Button>
      </div>
      {isBlacklistLoaded && (
        <RestaurantGrid filteredRestaurants={filteredRestaurants} />
      )}
      <SelectRestaurantsDialog
        blacklistedRestaurants={blacklistedRestaurants}
        setBlacklistedRestaurants={handleSetBlacklist}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        restaurants={restaurants}
      />
    </div>
  );
};

export default withStyles(styles)(Index);
