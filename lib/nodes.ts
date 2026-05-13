import type { DashboardLayoutMap, DashboardTileMap } from '@rotorjs/react';
import { JPLLayout } from './JPLLayout';
import { JPLTile } from './JPLTile';

export const jplLayouts: DashboardLayoutMap = {
  jpl: JPLLayout,
};

export const jplTiles: DashboardTileMap = {
  jpl: JPLTile,
};
