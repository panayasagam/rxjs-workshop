import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ExercisesService } from './exercises/exercises.service';
import { ExerciseTesterService } from './exercises/exercise-tester.service';
import { Exercise, ExerciseResult } from './exercises/exercise.interface';
import { AppStateService } from './services/app-state.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  protected title = 'RxJS Workshop';
  
  protected exercises: Exercise[] = [];
  protected activeExercise: Exercise | null = null;
  protected exerciseOutput: string[] = [];
  protected testOutput: string[] = [];
  protected isRunning = false;
  protected testResult: ExerciseResult | null = null;
  protected testPanelExpanded = false;
  private subscription: Subscription | null = null;

  constructor(
    private exercisesService: ExercisesService,
    private exerciseTester: ExerciseTesterService,
    private appStateService: AppStateService
  ) {}

  ngOnInit() {
    // Load exercises from service
    this.exercises = this.exercisesService.getExercises();
    
    // Restore app state from service
    this.restoreAppState();
    
    // Subscribe to state changes
    this.subscribeToStateChanges();
    
    // If no saved state, initialize with first exercise
    if (!this.activeExercise && this.exercises.length > 0) {
      this.selectExercise(this.exercises[0]);
    }
  }

  ngOnDestroy() {
    this.cleanup();
  }

  protected selectExercise(exercise: Exercise) {
    this.cleanup();
    this.activeExercise = exercise;
    this.exerciseOutput = [];
    this.testOutput = [];
    this.isRunning = false;
    this.testResult = null;
    // Don't reset testPanelExpanded - keep it independent
    
    // Save state to service
    this.appStateService.setActiveExerciseId(exercise.id);
  }

  protected runExercise() {
    if (!this.activeExercise || this.isRunning) return;
    
    this.cleanup();
    this.exerciseOutput = [];
    this.testOutput = [];
    this.testResult = null;
    this.isRunning = true;
    
    this.addOutput(`Exercise running...`);
    
    // Create a shared observable so both subscriptions can receive values
    const sharedObservable = this.activeExercise.observable.pipe(shareReplay());
    
    // Subscribe to the exercise observable for output
    const exerciseSubscription = sharedObservable.subscribe({
      next: (value) => {
        this.addOutput(`Received: ${JSON.stringify(value)}`);
      },
      error: (error) => {
        this.addOutput(`Error: ${error.message}`);
        this.isRunning = false;
      },
      complete: () => {
        this.addOutput('Observable completed!');
        this.isRunning = false;
      }
    });
    
    // Subscribe to the test observable in parallel
    const testSubscription = this.exerciseTester.testExercise(this.activeExercise).subscribe({
      next: (testResult) => {
        this.testResult = testResult;
        this.addTestOutput(`Test Result: ${testResult.message}`);
        
        // If test fails, unsubscribe from exercise as well
        if (!testResult.passed) {
          this.addTestOutput('Test failed - stopping exercise');
          exerciseSubscription.unsubscribe();
          this.isRunning = false;
        }
        
        if (testResult.details.actualValues.length > 0) {
          // Format expected values
          const expectedDisplay = Array.isArray(testResult.details.expectedValues[0]) 
            ? testResult.details.expectedValues[0] 
            : testResult.details.expectedValues;
          
          // Format actual values
          const actualDisplay = Array.isArray(testResult.details.actualValues[0]) 
            ? testResult.details.actualValues[0] 
            : testResult.details.actualValues;
          
          // Check if this is an array emission (single array) or individual emissions
          const isArrayEmission = testResult.details.expectedValues.length === 1 && 
                                 Array.isArray(testResult.details.expectedValues[0]);
          
          if (isArrayEmission) {
            // Show as array for exercises that emit a single array
            this.addTestOutput(`Expected values: [${expectedDisplay.join(', ')}]`);
            this.addTestOutput(`Actual values: [${actualDisplay.join(', ')}]`);
          } else {
            // Show as individual values for exercises that emit one by one
            this.addTestOutput(`Expected values: ${expectedDisplay.join(', ')}`);
            this.addTestOutput(`Actual values: ${actualDisplay.join(', ')}`);
          }
        }
        
        if (testResult.details.actualTimings.length > 0) {
          this.addTestOutput(`Expected timings: ${testResult.details.expectedTimings.map(t => `${t}ms`).join(', ')}`);
          this.addTestOutput(`Actual timings: ${testResult.details.actualTimings.map(t => `${t}ms`).join(', ')}`);
        }
      },
      error: (error) => {
        this.addTestOutput(`Test error: ${error.message}`);
        exerciseSubscription.unsubscribe();
        this.isRunning = false;
      }
    });
    
    // Store both subscriptions for cleanup
    this.subscription = new Subscription();
    this.subscription.add(exerciseSubscription);
    this.subscription.add(testSubscription);
  }

  protected stopExercise() {
    this.cleanup();
    this.addOutput('Exercise stopped by user');
    this.addTestOutput('Test monitoring stopped');
    this.isRunning = false;
  }

  private cleanup() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private addOutput(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.exerciseOutput.push(`[${timestamp}] ${message}`);
  }

  private addTestOutput(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.testOutput.push(`[${timestamp}] ${message}`);
  }

  protected toggleTestPanel() {
    this.appStateService.toggleTestPanel();
  }

  private restoreAppState() {
    // Restore active exercise from service
    const restoredExercise = this.appStateService.restoreActiveExercise(this.exercises);
    if (restoredExercise) {
      this.activeExercise = restoredExercise;
    }
    
    // Restore test panel state
    this.testPanelExpanded = this.appStateService.testPanelExpanded;
  }

  private subscribeToStateChanges() {
    // Subscribe to test panel state changes
    this.appStateService.testPanelExpanded$.subscribe(expanded => {
      this.testPanelExpanded = expanded;
    });
  }
}
