import { jplLayouts, jplTiles } from '@/nodes';
import { attachWorker } from '@rotorjs/core';
import {
  DashboardEventTarget,
  type DashboardLayoutNode,
  type DashboardTileNode,
  type ErrorDashboardNode,
} from '@rotorjs/dashboards';
import { Dashboard } from '@rotorjs/react';
import { type ComponentType, type PropsWithChildren } from 'react';
// eslint-disable-next-line import-x/default
import Worker from './worker?worker';

import './App.css';

const worker = new Worker();
const engine = new DashboardEventTarget();
attachWorker(engine, worker);

(window as typeof window & { engine: DashboardEventTarget }).engine = engine;

function CustomError({ error }: ErrorDashboardNode) {
  return (
    <div style={{ color: 'red', textAlign: 'start' }}>
      Error:
      <pre>{(error as Error)?.message ?? error?.toString()}</pre>
    </div>
  );
}

function StackLayout({ children }: PropsWithChildren<DashboardLayoutNode>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {children}
    </div>
  );
}

function CardTile(_: DashboardTileNode) {
  return (
    <div
      style={{ width: 100, height: 100, background: 'red', borderRadius: 10 }}
    />
  );
}

const layouts = {
  ...jplLayouts,
  error: CustomError as ComponentType<PropsWithChildren<DashboardLayoutNode>>,
  stack: StackLayout,
};

const defaultLayout = { type: 'stack' };

const tiles = {
  ...jplTiles,
  error: CustomError as ComponentType<DashboardTileNode>,
  card: CardTile,
};

const content = [
  { type: 'card' },
  { type: 'jpl', src: '{ type: "card" }' },
  { type: 'jpl' },
];

export default function App() {
  return (
    <Dashboard
      engine={engine}
      layouts={layouts}
      defaultLayout={defaultLayout}
      tiles={tiles}
      content={content}
    />
  );
}
