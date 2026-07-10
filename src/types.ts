export type ActiveTab =
  | 'dashboard'
  | 'traffic'
  | 'damage'
  | 'crowd'
  | 'waste'
  | 'cctv'
  | 'incidents'
  | 'heatmaps'
  | 'alerts'
  | 'reports'
  | 'settings';

export interface Incident {
  id: string;
  type: string;
  location: string;
  severity: 'critical' | 'warning' | 'normal';
  timestamp: string;
  timeAgo: string;
  status: 'active' | 'dispatched' | 'resolved';
  camera: string;
  detectorName: string;
  details: string;
  aiConfidence: number;
}

export interface AIModel {
  id: string;
  name: string;
  framework: string;
  accuracy: number;
  status: 'optimal' | 'degraded' | 'offline';
  speedMs: number;
  workload: number;
  lastUpdate: string;
}

export interface SmartBin {
  id: string;
  location: string;
  fillLevel: number; // 0 to 100
  status: 'normal' | 'warning' | 'critical';
  lastCleared: string;
  routeSequence: number;
}

export interface TrafficSection {
  id: string;
  roadName: string;
  flowRate: number; // vehicles / min
  congestionIndex: number; // 0 to 100
  avgSpeed: number; // km/h
  status: 'smooth' | 'moderate' | 'heavy' | 'gridlock';
  camerasCount: number;
}

export interface RoadDamageItem {
  id: string;
  type: 'pothole' | 'alligator_crack' | 'longitudinal_crack' | 'rutting';
  severity: 'critical' | 'moderate' | 'minor';
  location: string;
  detectedAt: string;
  confidence: number;
  image?: string;
  status: 'pending' | 'scheduled' | 'repaired';
}
