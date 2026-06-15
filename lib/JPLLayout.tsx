import type { DashboardStateDescriptor } from '@rotorjs/dashboard';
import type {
  JPLDashboardLayoutNode,
  JPLStateReducerParams,
} from '@rotorjs/jpl';
import {
  DashboardLayout,
  DashboardLayoutError,
  useDashboardState,
} from '@rotorjs/react';
import { useMemo, type PropsWithChildren } from 'react';

export function JPLLayout({
  type,
  src,
  vars,
  initial,
  children,
}: PropsWithChildren<JPLDashboardLayoutNode>) {
  const descriptor = useMemo<DashboardStateDescriptor>(
    () => ({ type, params: { src, vars } satisfies JPLStateReducerParams }),
    [type, src, vars],
  );

  const content = useDashboardState(descriptor, initial ? [initial] : []);

  if (!content.length) return null;

  if (content.length > 1) {
    return (
      <DashboardLayoutError error="State reducer returned more than one layout node" />
    );
  }

  const [layout] = content;

  return <DashboardLayout layout={layout}>{children}</DashboardLayout>;
}
JPLLayout.displayName = 'JPLLayout';
