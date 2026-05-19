import { DashboardEngine } from '@rotorjs/dashboard';
import { createJPLStateReducerConfig } from '@rotorjs/jpl';
import { attachWorker } from '@rotorjs/state';

const engine = new DashboardEngine({ script: createJPLStateReducerConfig() });
attachWorker(engine, self);
