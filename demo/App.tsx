import { jplLayouts, jplTiles } from '@/nodes';
import {
  DashboardEventTarget,
  type DashboardLayoutNode,
  type DashboardTileNode,
  type ErrorDashboardNode,
} from '@rotorjs/dashboard';
import { Dashboard, type DashboardTileMap } from '@rotorjs/react';
import { attachWorker } from '@rotorjs/state';
import {
  type ComponentType,
  type CSSProperties,
  type PropsWithChildren,
} from 'react';
// eslint-disable-next-line import-x/default
import Worker from './worker?worker';

import type { JPLDashboardTileNode } from '@rotorjs/jpl';
import './App.css';

const worker = new Worker();
const target = new DashboardEventTarget();
attachWorker(target, worker);

(window as typeof window & { target: DashboardEventTarget }).target = target;

function CustomError({ error }: ErrorDashboardNode) {
  return (
    <div
      style={{
        minWidth: 100,
        minHeight: 100,
        color: 'red',
        textAlign: 'start',
        border: '1px dashed red',
        boxSizing: 'border-box',
        borderRadius: 10,
        padding: 10,
      }}
    >
      Error:
      <pre>{(error as Error)?.message ?? error?.toString()}</pre>
    </div>
  );
}

function StackLayout({ children }: PropsWithChildren<DashboardLayoutNode>) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {children}
    </div>
  );
}

function CardTile({ style }: DashboardTileNode) {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        placeSelf: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        ...(style as CSSProperties),
      }}
    />
  );
}

const layouts = {
  ...jplLayouts,
  error: CustomError as ComponentType<PropsWithChildren<DashboardLayoutNode>>,
  stack: StackLayout,
};

const defaultLayout = { type: 'stack' };

const tiles: DashboardTileMap = {
  ...jplTiles,
  error: CustomError as ComponentType<DashboardTileNode>,
  card: CardTile,
};

const placeholder = [
  {
    type: 'card',
    style: { backgroundColor: 'none', boxShadow: 'inset 0 0 0 3px red' },
  },
];

const content = [
  { type: 'card' },
  {
    type: 'script',
    src: '{ type: "card" }',
    initial: placeholder,
  } satisfies JPLDashboardTileNode,
  {
    type: 'script',
    src: 'error->("no")',
    initial: placeholder,
  } satisfies JPLDashboardTileNode,
];

export default function App() {
  return (
    <Dashboard
      target={target}
      layouts={layouts}
      defaultLayout={defaultLayout}
      tiles={tiles}
      content={content}
    />
  );
}
