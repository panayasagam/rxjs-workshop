import { Observable } from 'rxjs';

export interface ExerciseConfig {
  id: string;
  title: string;
  description: string;
  expectedValues: any[];
  expectedTimings: number[]; // relative timings in milliseconds
  timingTolerance: number; // timing tolerance in milliseconds
  timeout: number; // timeout in milliseconds
}

export interface Exercise extends ExerciseConfig {
  observable: Observable<any>;
}

export interface ExerciseResult {
  passed: boolean;
  message: string;
  details: {
    valuesMatch: boolean;
    timingMatch: boolean;
    expectedValues: any[];
    actualValues: any[];
    expectedTimings: number[];
    actualTimings: number[];
    timingTolerance: number;
  };
}
