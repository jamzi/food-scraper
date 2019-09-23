import { useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { format, isAfter } from "date-fns";

const styles = theme => ({
  root: {
    padding: "10px"
  },
  paper: {
    maxWidth: "500px",
    padding: "10px",
    margin: "0px 20px 20px 0px"
  },
  topBar: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: "20px"
  },
  restaurants: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
    gridTemplateAreas:
      '"vinka gastro piap rozaslon" "vinka gastro favola rozaslon" "vinka barbado restavracija123 rozaslon" "vinka barbado restavracija123 rozaslon"',
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
  vinka: {
    gridArea: "vinka",
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)"
  },
  gastro: {
    gridArea: "gastro",
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)"
  },
  barbado: {
    gridArea: "barbado",
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)"
  },
  piap: {
    gridArea: "piap",
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)"
  },
  favola: {
    gridArea: "favola",
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)"
  },
  restavracija123: {
    gridArea: "restavracija123",
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)"
  },
  rozaSlon: {
    gridArea: "rozaslon",
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)"
  },
  title: {
    marginRight: "11px"
  },
  loaderWrapper: {
    height: "calc(100% - 40px)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const initialRestaurants = [
  {
    id: "vinka",
    name: "Vinka",
    menuItems: undefined
  },
  {
    id: "gastro",
    name: "Gastro House 151",
    menuItems: undefined
  },
  {
    id: "restavracija123",
    name: "Restavracija 123",
    menuItems: undefined
  },
  {
    id: "barbado",
    name: "Barbado",
    menuItems: undefined
  },
  {
    id: "piap",
    name: "Piap",
    menuItems: undefined
  },
  {
    id: "favola",
    name: "Favola",
    menuItems: undefined
  },
  {
    id: "rozaSlon",
    name: "Roza Slon",
    menuItems: undefined
  },
  {
    id: "gostilna1987",
    name: "Gostilna 1987",
    menuItems: undefined
  }
];

const Index = props => {
  const { classes } = props;
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [updatedAt, setUpdatedAt] = useState(undefined);

  const getFood = async () => {
    initialRestaurants.forEach(async restaurant => {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `api/food?restaurantId=${restaurant.id}`
          : `http://localhost:9999/api/food?restaurantId=${restaurant.id}`
      );

      const data = await response.json();

      if (restaurant.id === "gostilna1987") {
        console.log(data);
      }

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
              className={classes[`${restaurant.id}`]}
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
