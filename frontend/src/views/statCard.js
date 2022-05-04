import PropTypes from "prop-types";

// material-ui
import { Card, CardContent, Grid, Typography } from "@mui/material";

// ===========================|| HOVER SOCIAL CARD ||=========================== //

const StatCard = ({ primary, secondary, secondaryColor = "inherit" }) => {
  return (
    <Card
      sx={{
        position: "relative",
        color: "#fff",
        "&:hover svg": {
          opacity: "1",
          transform: "scale(1.1)",
        },
      }}
    >
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h2" color={secondaryColor}>
              {secondary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color="inherit">
              {primary}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

StatCard.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  secondaryColor: PropTypes.string,
};

export default StatCard;
