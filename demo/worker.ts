import { attachWorker } from '@rotorjs/core';
import { DashboardEngine } from '@rotorjs/dashboards';
import { createJPLDashboardReducer } from '@rotorjs/jpl';

const engine = new DashboardEngine(createJPLDashboardReducer());
attachWorker(engine, self);
