import type { DashboardStateDescriptor } from '@rotorjs/dashboard';
import type { JPLDashboardTileNode, JPLStateReducerParams } from '@rotorjs/jpl';
import { DashboardTiles, useDashboardState } from '@rotorjs/react';
import { useMemo } from 'react';

export function JPLTile({ type, src, vars, initial }: JPLDashboardTileNode) {
  const descriptor = useMemo<DashboardStateDescriptor>(
    () => ({ type, params: { src, vars } satisfies JPLStateReducerParams }),
    [type, src, vars],
  );

  const content = useDashboardState(descriptor, initial);

  return <DashboardTiles content={content} />;
}
