import { useEffect, useState, useMemo, useRef } from "react";
import { Typography, Button, withStyles } from "@material-ui/core";
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
  const didMountRef = useRef(false);

  useEffect(() => {
    const blacklistedRestaurants = localStorage.getItem(
      "blacklistedRestaurants"
    );
    if (blacklistedRestaurants) {
      setBlacklistedRestaurants(JSON.parse(blacklistedRestaurants));
    }
    setIsBlacklistLoaded(true);
  }, []);

  useEffect(() => {
    let interval;
    if (didMountRef.current) {
      getFood();
      interval = setInterval(() => {
        getFood();
      }, 30 * 60 * 1000);
    } else {
      didMountRef.current = true;
    }
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
        <div className={classes.titleWrapper}>
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
