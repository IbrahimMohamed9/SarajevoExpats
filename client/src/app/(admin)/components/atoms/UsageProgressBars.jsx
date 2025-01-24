'use client'

import { Box, LinearProgress, Typography, Grid, Paper } from '@mui/material';

const UsageProgressBar = ({ label, current, max, unit }) => {
  const progress = (current / max) * 100;
  return (
    <Box sx={{ mb: 2, p: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          height: 10, 
          borderRadius: 5,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: progress > 90 ? '#f44336' : progress > 70 ? '#ff9800' : '#4caf50',
            borderRadius: 5,
          }
        }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {`${current.toFixed(2)} / ${max} ${unit}`}
      </Typography>
    </Box>
  );
};

const UsageProgressBars = ({ data }) => {
  if (!data?.data) return null;

  const { current, limits } = data.data;

  const metrics = [
    {
      label: 'Monthly Usage (USD)',
      current: current.monthlyUsageUsd,
      max: limits.maxMonthlyUsageUsd,
      unit: 'USD'
    },
    {
      label: 'Actor Compute Units',
      current: current.monthlyActorComputeUnits,
      max: limits.maxMonthlyActorComputeUnits,
      unit: 'units'
    },
    {
      label: 'Data Transfer',
      current: current.monthlyExternalDataTransferGbytes,
      max: limits.maxMonthlyExternalDataTransferGbytes,
      unit: 'GB'
    },
    {
      label: 'Proxy SERPS',
      current: current.monthlyProxySerps,
      max: limits.maxMonthlyProxySerps,
      unit: 'queries'
    },
    {
      label: 'Residential Proxy',
      current: current.monthlyResidentialProxyGbytes,
      max: limits.maxMonthlyResidentialProxyGbytes,
      unit: 'GB'
    },
    {
      label: 'Actor Tasks',
      current: current.actorTaskCount,
      max: limits.maxActorTaskCount,
      unit: 'tasks'
    },
    {
      label: 'Schedules',
      current: current.scheduleCount,
      max: limits.maxScheduleCount,
      unit: 'schedules'
    },
    {
      label: 'Team Members',
      current: current.teamAccountSeatCount,
      max: limits.maxTeamAccountSeatCount,
      unit: 'members'
    }
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Resource Usage</Typography>
      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <UsageProgressBar {...metric} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default UsageProgressBars;
