import type { DashboardState } from '@rotorjs/dashboards';
import type {
  JPLDashboardLayoutNode,
  JPLDashboardReducerInit,
} from '@rotorjs/jpl';
import {
  DashboardLayout,
  DashboardLayoutError,
  useDashboardState,
} from '@rotorjs/react';
import { useMemo, type PropsWithChildren } from 'react';

// TODO: implement placeholder
const initialState: DashboardState = [];

export function JPLLayout({
  src,
  children,
}: PropsWithChildren<JPLDashboardLayoutNode>) {
  const init = useMemo<JPLDashboardReducerInit>(
    () => ({ src: src ?? '', initialState }),
    [src],
  );

  const content = useDashboardState(init, initialState);

  if (!content.length) return null;

  if (content.length > 1) {
    return (
      <DashboardLayoutError error="State reducer returned more than one layout node" />
    );
  }

  const [layout] = content;

  return <DashboardLayout layout={layout}>{children}</DashboardLayout>;
}
