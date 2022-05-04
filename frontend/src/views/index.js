import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { APIURL, gridSpacing } from "../store/constant";

// project import
import getChartOption from "./chartData";
import DosesStatCard from "./dosesStatCard";
import StatByCountryCard from "./statByCountryCard";
import StatCard from "./statCard";

const Views = () => {
  const theme = useTheme();
  const [totalCases, setTotalCases] = useState("0");
  const [totalDeath, setTotalDeath] = useState("0");
  const [totalVaccineDoses, set_total_vaccine_doses] = useState("0");
  const [casesByCountry, setCasesByCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dosesTimeSeries, setDosesTimeSeries] = useState([]);
  const [dosesByCountry, setDosesByCountry] = useState([]);

  const urls = [
    `${APIURL}/total_case_statistics`,
    `${APIURL}/total_vaccination_doses`,
    `${APIURL}/sum_of_cases_by_country`,
    `${APIURL}/vaccination_time_series`,
    `${APIURL}/vaccination_doses_by_country`,
  ];

  useEffect(() => {
    const requests = urls.map((url) =>
      fetch(url).then((res) => {
        setLoading(true);
        return res.json();
      })
    );
    Promise.all(requests).then((data) => {
      setTotalCases(data[0]?.total_case?.toLocaleString());
      setTotalDeath(data[0]?.total_death?.toLocaleString());
      set_total_vaccine_doses(data[1]?.total_doses.toLocaleString());
      setCasesByCountry(data[2]);
      setDosesTimeSeries(data[3]);
      setDosesByCountry(data[4]);
      setLoading(false);
    });
  }, []);

  const options = getChartOption(dosesTimeSeries, theme);

  if (loading) {
    return (
      <Grid container>
        <Box sx={{ display: "flex" }}>
          <CircularProgress disableShrink />;
        </Box>
      </Grid>
    );
  }

  return (
    <Grid container spacing={gridSpacing} mt={2} mx={1}>
      <Grid item xs={12} sm={2}>
        <PerfectScrollbar
          style={{
            height: "100%",
            maxHeight: "calc(100vh)",
            overflowX: "hidden",
          }}
        >
          {casesByCountry.map((el, index) => {
            return (
              <Box key={index}>
                <StatByCountryCard
                  country={el.country}
                  cases={el.confirmed?.toLocaleString()}
                  death={el.death?.toLocaleString()}
                />
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Box>
            );
          })}
        </PerfectScrollbar>
      </Grid>

      <Grid item xs={12} sm={7}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={4}>
            <StatCard
              primary="Total Cases"
              secondary={totalCases}
              secondaryColor={theme.palette.error.dark}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <StatCard
              primary="Total Death"
              secondary={totalDeath}
              secondaryColor={theme.palette.warning.dark}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <StatCard
              primary="Total Vaccine Doses Administered"
              secondary={totalVaccineDoses}
              secondaryColor={theme.palette.success.dark}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} m={3}>
          <Grid item xs={12} alignContent="center">
            <Typography alignItems="center" variant="h3">
              Vaccination Time Series
            </Typography>
          </Grid>
          <Chart {...options} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3}>
        <PerfectScrollbar
          style={{
            height: "100%",
            maxHeight: "calc(100vh)",
            overflowX: "hidden",
          }}
        >
          {dosesByCountry.map((el, index) => {
            return (
              <Box key={index}>
                <DosesStatCard
                  country={el.country}
                  doses={el.total_doses.toLocaleString()}
                />
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Box>
            );
          })}
        </PerfectScrollbar>
      </Grid>
    </Grid>
  );
};

export default Views;
