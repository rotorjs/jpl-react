import { DashboardEngine, DashboardEventTarget } from '@rotorjs/dashboard';
import { createJPLStateReducerConfig } from '@rotorjs/jpl';
import { attachWorker } from '@rotorjs/state';

const target = new DashboardEventTarget();
attachWorker(target, self);
const _engine = new DashboardEngine(target, {
  script: createJPLStateReducerConfig(),
});
