import PropTypes from "prop-types";

// material-ui
import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";

// ===========================|| HOVER SOCIAL CARD ||=========================== //

const StatByCountryCard = ({ cases, death, country }) => {
  const theme = useTheme();
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
            <Typography variant="h2" color="inherit">
              {country}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography variant="h5" color="inherit">
                  cases:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h3" color={theme.palette.error.dark}>
                  {cases}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography variant="h5" color="inherit">
                  death:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h3" color={theme.palette.warning.dark}>
                  {death}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

StatByCountryCard.propTypes = {
  cases: PropTypes.string,
  confirmed: PropTypes.string,
  death: PropTypes.string,
};

export default StatByCountryCard;
