import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";

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

  const isRestaurantBlacklisted = id => {
    if (!id) {
      return false;
    }

    const index = blacklistedRestaurants.findIndex(bId => bId === id);
    return index !== -1 ? true : false;
  };

  const handleBlacklistRestaurant = (id, checked) => {
    const blacklistIndex = blacklistedRestaurants.findIndex(bId => bId === id);
    if (!checked) {
      if (blacklistIndex === -1) {
        const newBlacklist = [...blacklistedRestaurants, id];
        setBlacklistedRestaurants(newBlacklist);
      }
    } else {
      if (blacklistIndex !== -1) {
        const newBlacklist = blacklistedRestaurants.filter(bId => id !== bId);
        setBlacklistedRestaurants(newBlacklist);
      }
    }
  };

  const handleSave = () => {
    console.log("save");
    setDialogOpen(false);
  };

  return (
    <Dialog
      onClose={() => setDialogOpen(false)}
      aria-labelledby="simple-dialog-title"
      open={props.dialogOpen}
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
        <Button onClick={handleSave}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(SelectRestaurants);
