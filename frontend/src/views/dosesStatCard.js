import PropTypes from "prop-types";

// material-ui
import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";

// ===========================|| HOVER SOCIAL CARD ||=========================== //

const DosesStatCard = ({ country, doses }) => {
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
                  doses administered:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h3" color={theme.palette.success.dark}>
                  {doses}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

DosesStatCard.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  secondaryColor: PropTypes.string,
};

export default DosesStatCard;
