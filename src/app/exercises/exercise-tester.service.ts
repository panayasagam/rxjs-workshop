import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap, finalize, shareReplay } from 'rxjs/operators';
import { Exercise, ExerciseResult } from './exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class ExerciseTesterService {
  private testResults: Map<string, ExerciseResult> = new Map();

  testExercise(exercise: Exercise): Observable<ExerciseResult> {
    return new Observable<ExerciseResult>(observer => {

      const actualValues: any[] = [];
      const actualTimings: number[] = [];
      const startTime = Date.now();
      let completed = false;

      // Use shareReplay to make the observable multicast so both subscriptions can receive values
      const sharedObservable = exercise.observable.pipe(shareReplay());
      
      const subscription = sharedObservable.pipe(
        tap(value => {
          const currentTime = Date.now();
          const relativeTime = currentTime - startTime;
          
          actualValues.push(value);
          actualTimings.push(relativeTime);
        }),
        finalize(() => {
          completed = true;
          const result = this.evaluateResult(exercise, actualValues, actualTimings);
          this.testResults.set(exercise.id, result);
          observer.next(result);
          observer.complete();
        })
      ).subscribe({
        error: (error) => {
          const result: ExerciseResult = {
            passed: false,
            message: `Exercise failed with error: ${error.message}`,
            details: {
              valuesMatch: false,
              timingMatch: false,
              expectedValues: exercise.expectedValues,
              actualValues,
              expectedTimings: exercise.expectedTimings,
              actualTimings,
              timingTolerance: exercise.timingTolerance
            }
          };
          this.testResults.set(exercise.id, result);
          observer.next(result);
          observer.complete();
        }
      });

      // Timeout based on exercise configuration
      setTimeout(() => {
        if (!completed) {
          subscription.unsubscribe();
          const result: ExerciseResult = {
            passed: false,
            message: `Exercise timed out after ${exercise.timeout}ms`,
            details: {
              valuesMatch: false,
              timingMatch: false,
              expectedValues: exercise.expectedValues,
              actualValues,
              expectedTimings: exercise.expectedTimings,
              actualTimings,
              timingTolerance: exercise.timingTolerance
            }
          };
          this.testResults.set(exercise.id, result);
          observer.next(result);
          observer.complete();
        }
      }, exercise.timeout);

      return () => subscription.unsubscribe();
    });
  }

  private evaluateResult(
    exercise: Exercise, 
    actualValues: any[], 
    actualTimings: number[]
  ): ExerciseResult {
    const valuesMatch = this.compareValues(exercise.expectedValues, actualValues);
    const timingMatch = this.compareTimings(exercise.expectedTimings, actualTimings, exercise.timingTolerance);
    
    const passed = valuesMatch && timingMatch;
    
    let message = '';
    if (passed) {
      message = 'Exercise passed! All values and timings are correct.';
    } else {
      const issues = [];
      if (!valuesMatch) issues.push('values');
      if (!timingMatch) issues.push('timings');
      message = `Exercise failed. Issues with: ${issues.join(' and ')}.`;
    }

    return {
      passed,
      message,
      details: {
        valuesMatch,
        timingMatch,
        expectedValues: exercise.expectedValues,
        actualValues: [...actualValues],
        expectedTimings: exercise.expectedTimings,
        actualTimings: [...actualTimings],
        timingTolerance: exercise.timingTolerance
      }
    };
  }

  private compareValues(expected: any[], actual: any[]): boolean {
    if (expected.length !== actual.length) {
      return false;
    }

    return expected.every((expectedValue, index) => {
      const actualValue = actual[index];
      
      // Handle array comparison
      if (Array.isArray(expectedValue) && Array.isArray(actualValue)) {
        return expectedValue.length === actualValue.length &&
               expectedValue.every((item, i) => item === actualValue[i]);
      }
      
      // Handle primitive comparison
      return expectedValue === actualValue;
    });
  }

  private compareTimings(expected: number[], actual: number[], tolerance: number): boolean {
    if (expected.length !== actual.length) {
      return false;
    }

    return expected.every((expectedTime, index) => {
      const actualTime = actual[index];
      const difference = Math.abs(expectedTime - actualTime);
      return difference <= tolerance;
    });
  }

  getTestResult(exerciseId: string): ExerciseResult | undefined {
    return this.testResults.get(exerciseId);
  }

  clearTestResults(): void {
    this.testResults.clear();
  }
}
