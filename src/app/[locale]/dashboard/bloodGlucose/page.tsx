import React from "react";
import { Stack } from "@mui/material";
import { BloodReportContainer } from "@/components/dashboard/bloodGlucose/blood-report-container";

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
        <BloodReportContainer/>
    </Stack>
  );
}