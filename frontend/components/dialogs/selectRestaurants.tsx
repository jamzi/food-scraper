import { useState } from "react";
import {
  withStyles,
  Button,
  Dialog,
  FormControl,
  FormGroup,
  FormControlLabel,
  DialogContent,
  DialogActions,
  Checkbox
} from "@material-ui/core";

import styles from "../styles";
import { logEvent, categories } from "../../utils/analytics";

interface Props {
  classes: any;
  blacklistedRestaurants: string[];
  setBlacklistedRestaurants(currentBlacklistedRestaurants: string[]): void;
  dialogOpen: boolean;
  setDialogOpen(state: boolean): void;
  restaurants: any[];
}

const SelectRestaurants = (props: Props) => {
  const {
    classes,
    blacklistedRestaurants,
    setBlacklistedRestaurants,
    dialogOpen,
    setDialogOpen,
    restaurants
  } = props;

  const [
    currentBlacklistedRestaurants,
    setCurrentBlacklistedRestaurants
  ] = useState<string[]>([]);

  const isRestaurantBlacklisted = (id: string) => {
    if (!id) {
      return false;
    }

    const index = currentBlacklistedRestaurants.findIndex(bId => bId === id);
    return index !== -1 ? true : false;
  };

  const handleBlacklistRestaurant = (id: string, checked: boolean) => {
    const blacklistIndex = currentBlacklistedRestaurants.findIndex(
      bId => bId === id
    );
    if (!checked) {
      if (blacklistIndex === -1) {
        const newBlacklist = [...currentBlacklistedRestaurants, id];
        setCurrentBlacklistedRestaurants(newBlacklist);
      }
    } else {
      if (blacklistIndex !== -1) {
        const newBlacklist = currentBlacklistedRestaurants.filter(
          bId => id !== bId
        );
        setCurrentBlacklistedRestaurants(newBlacklist);
      }
    }
  };

  const areArraysDifferent = (arr1: string[], arr2: string[]) => {
    return arr1.join(",") !== arr2.join(",");
  };

  const handleSave = () => {
    setBlacklistedRestaurants(currentBlacklistedRestaurants);

    if (
      areArraysDifferent(blacklistedRestaurants, currentBlacklistedRestaurants)
    ) {
      if (
        currentBlacklistedRestaurants &&
        currentBlacklistedRestaurants.length > 0
      ) {
        logEvent({
          category: categories.SELECT_RESTAURANTS,
          action: "Save Blacklisted Restaurant",
          label: currentBlacklistedRestaurants.join(",")
        });
      } else {
        logEvent({
          category: categories.SELECT_RESTAURANTS,
          action: "Clear Blacklisted Restaurant"
        });
      }
    }

    handleClose();
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog
      onEnter={() => setCurrentBlacklistedRestaurants(blacklistedRestaurants)}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={dialogOpen}
    >
      <DialogContent>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            {restaurants.map(restaurant => (
              <FormControlLabel
                key={restaurant.id}
                control={
                  <Checkbox
                    checked={!isRestaurantBlacklisted(restaurant.id)}
                    onChange={(_, checked: boolean) =>
                      handleBlacklistRestaurant(restaurant.id, checked)
                    }
                    color="primary"
                  />
                }
                label={restaurant.name}
              />
            ))}
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(SelectRestaurants);
