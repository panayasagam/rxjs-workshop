import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Exercise } from '../exercises/exercise.interface';

export interface AppState {
  activeExerciseId: string | null;
  testPanelExpanded: boolean;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private readonly STORAGE_KEY = 'rxjs-workshop-state';
  private readonly MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  private _activeExerciseId = new BehaviorSubject<string | null>(null);
  private _testPanelExpanded = new BehaviorSubject<boolean>(false);

  // Observables for reactive state management
  public activeExerciseId$ = this._activeExerciseId.asObservable();
  public testPanelExpanded$ = this._testPanelExpanded.asObservable();

  constructor() {
    this.loadState();
  }

  // Getters
  get activeExerciseId(): string | null {
    return this._activeExerciseId.value;
  }

  get testPanelExpanded(): boolean {
    return this._testPanelExpanded.value;
  }

  // Setters
  setActiveExerciseId(exerciseId: string | null): void {
    this._activeExerciseId.next(exerciseId);
    this.saveState();
  }

  setTestPanelExpanded(expanded: boolean): void {
    this._testPanelExpanded.next(expanded);
    this.saveState();
  }

  toggleTestPanel(): void {
    this.setTestPanelExpanded(!this._testPanelExpanded.value);
  }

  // State persistence methods
  private saveState(): void {
    try {
      const appState: AppState = {
        activeExerciseId: this._activeExerciseId.value,
        testPanelExpanded: this._testPanelExpanded.value,
        timestamp: Date.now()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(appState));
    } catch (error) {
      console.warn('Failed to save app state:', error);
    }
  }

  private loadState(): void {
    try {
      const savedState = localStorage.getItem(this.STORAGE_KEY);
      if (savedState) {
        const appState: AppState = JSON.parse(savedState);
        
        // Check if state is not too old
        if (Date.now() - appState.timestamp < this.MAX_AGE) {
          this._activeExerciseId.next(appState.activeExerciseId);
          this._testPanelExpanded.next(appState.testPanelExpanded);
          return;
        }
      }
    } catch (error) {
      console.warn('Failed to load app state:', error);
    }
    
    // Reset to defaults if loading failed or no saved state
    this._activeExerciseId.next(null);
    this._testPanelExpanded.next(false);
  }

  // Utility methods
  clearState(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      this._activeExerciseId.next(null);
      this._testPanelExpanded.next(false);
    } catch (error) {
      console.warn('Failed to clear app state:', error);
    }
  }

  clearExerciseState(): void {
    // Clear only exercise-related state, preserve panel state
    this._activeExerciseId.next(null);
    this.saveState();
  }

  hasValidState(): boolean {
    return this._activeExerciseId.value !== null;
  }

  // Method to restore exercise from service
  restoreActiveExercise(exercises: Exercise[]): Exercise | null {
    const exerciseId = this._activeExerciseId.value;
    if (exerciseId) {
      return exercises.find(ex => ex.id === exerciseId) || null;
    }
    return null;
  }
}
