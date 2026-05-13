import type { DashboardState } from '@rotorjs/dashboards';
import type {
  JPLDashboardReducerInit,
  JPLDashboardTileNode,
} from '@rotorjs/jpl';
import { DashboardTiles, useDashboardState } from '@rotorjs/react';
import { useMemo } from 'react';

// TODO: implement placeholder
const initialState: DashboardState = [];

export function JPLTile({ src }: JPLDashboardTileNode) {
  const init = useMemo<JPLDashboardReducerInit>(
    () => ({ src: src ?? '', initialState }),
    [src],
  );

  const content = useDashboardState(init, initialState);

  return <DashboardTiles content={content} />;
}
