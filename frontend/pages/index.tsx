import { useEffect, useState, useMemo, useRef } from "react";
import { Typography, Button, withStyles } from "@material-ui/core";
import { format, isAfter } from "date-fns";

import initialRestaurants from "../constants/restaurants";
import styles from "../components/styles";
import RestaurantGrid from "../components/restaurantGrid";
import SelectRestaurantsDialog from "../components/dialogs/selectRestaurants";
import { logEvent, categories } from "../utils/analytics";
import Restaurant from "../models/Restaurant";

interface Props {
  classes: any;
}

const Index = (props: Props) => {
  const { classes } = props;
  const [restaurants, setRestaurants] = useState<Restaurant[]>(
    initialRestaurants
  );
  const [updatedAt, setUpdatedAt] = useState<Date | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isBlacklistLoaded, setIsBlacklistLoaded] = useState(false);
  const [blacklistedRestaurants, setBlacklistedRestaurants] = useState<
    string[]
  >([]);
  const didMountRef = useRef(false);

  useEffect(() => {
    const blacklistedRestaurants = localStorage.getItem(
      "blacklistedRestaurantIds"
    );
    if (blacklistedRestaurants) {
      setBlacklistedRestaurants(JSON.parse(blacklistedRestaurants));
    } else {
      setBlacklistedRestaurants([]);
    }
    setIsBlacklistLoaded(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
    return restaurants.reduce((acc: Restaurant[], restaurant: Restaurant) => {
      const blacklistIndex = blacklistedRestaurants.findIndex(
        bId => bId === restaurant.id
      );
      if (blacklistIndex === -1) {
        acc.push(restaurant);
      }
      return acc;
    }, []);
  }, [blacklistedRestaurants]);

  const handleSetBlacklist = (blacklist: string[]) => {
    setBlacklistedRestaurants(blacklist);
    localStorage.setItem("blacklistedRestaurantIds", JSON.stringify(blacklist));
  };

  const getFood = async () => {
    filteredRestaurants.forEach(async (restaurant: Restaurant) => {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://food-267613.appspot.com/?id=${restaurant.id}&url=${restaurant.url}`
          : `http://localhost:5000/?id=${restaurant.id}&url=${restaurant.url}`
      );
      const data = await response.json();
      setRestaurants((restaurants: Restaurant[]) => {
        const newRestaurants = [...restaurants];
        let restaurant = newRestaurants.find(r => r.id === data.id);
        if (restaurant) {
          restaurant.menuItems = data.menuItems;
        }
        return newRestaurants;
      });
      setUpdatedAt((updatedAt: Date | undefined) => {
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

  const handleOpenSelectRestaurants = () => {
    setDialogOpen(true);
    logEvent({
      category: categories.SELECT_RESTAURANTS,
      action: "Open Select Restaurant"
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
          onClick={handleOpenSelectRestaurants}
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
