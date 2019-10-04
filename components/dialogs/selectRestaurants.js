import { useState, useEffect } from "react";
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

import styles from "../../components/styles";

const SelectRestaurants = props => {
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
  ] = useState([]);

  const isRestaurantBlacklisted = id => {
    if (!id) {
      return false;
    }

    const index = currentBlacklistedRestaurants.findIndex(bId => bId === id);
    return index !== -1 ? true : false;
  };

  const handleBlacklistRestaurant = (id, checked) => {
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

  const handleSave = () => {
    setBlacklistedRestaurants(currentBlacklistedRestaurants);
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
                    onChange={(e, checked) =>
                      handleBlacklistRestaurant(restaurant.id, checked)
                    }
                    color="primary"
                    value="gilad"
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
