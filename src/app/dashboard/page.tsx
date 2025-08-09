
'use client'

import React from 'react';
import { dashboardFeatureGroups } from "@/data/dashboard-features";
import { DashboardClient } from './ClientPage';

export default function DashboardPage() {
  return <DashboardClient featureGroups={dashboardFeatureGroups} />;
}
