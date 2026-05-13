import type { DashboardState, ErrorDashboardNode } from '@rotorjs/dashboards';
import type {
  JPLDashboardLayoutNode,
  JPLDashboardReducerInit,
} from '@rotorjs/jpl';
import {
  DashboardContext,
  DashboardError,
  DashboardLayout,
  getKey,
  useDashboardState,
} from '@rotorjs/react';
import {
  useContext,
  useMemo,
  type ComponentType,
  type PropsWithChildren,
} from 'react';

// TODO: implement placeholder
const initialState: DashboardState = [];

export function JPLLayout({
  src,
  children,
}: PropsWithChildren<JPLDashboardLayoutNode>) {
  const { layouts } = useContext(DashboardContext);

  const init = useMemo<JPLDashboardReducerInit>(
    () => ({ src: src ?? '', initialState }),
    [src],
  );

  const content = useDashboardState(init, initialState);

  if (!content.length) return null;

  if (content.length > 1) {
    const Error = (layouts.error ??
      DashboardError) as ComponentType<ErrorDashboardNode>;
    const errorNode = {
      type: 'error' as const,
      error: `JPL reducer returned more than one layout node`,
    };
    return <Error {...errorNode} key={getKey(errorNode)} />;
  }

  const [layout] = content;

  return <DashboardLayout layout={layout}>{children}</DashboardLayout>;
}
