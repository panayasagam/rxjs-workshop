import { EMPTY, of, timer } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { DataSimulationService } from '../services/data-simulation.service';
import { Exercise } from './exercise.interface';

const data = new DataSimulationService();

/**
 * Exercise 04: Combining Observables
 * 
 * In this exercise, you'll learn how to combine multiple observables using different RxJS operators.
 */

// ============================================================================
// SCENARIO 1: Independent Streams
// ============================================================================
/**
 * Instructions:
 * - Combine the two timers into a single stream that emits values as they arrive
 * - Expected: [0, 0, 1, 1, 2] (interleaved emissions)
 * 
 * Hint: You want to emit values as soon as they arrive from either timer
 */
const timer1$ = timer(0, 1000).pipe(take(3)); // 0, 1, 2
const timer2$ = timer(0, 2000).pipe(take(2)); // 0, 1

const exercise04_scenario1 = EMPTY;

// ============================================================================
// SCENARIO 2: Latest Values from Multiple Streams
// ============================================================================
/**
 * Instructions:
 * - Get both the latest search query AND filter whenever either changes
 * - Expected: [['alice', 'active'], ['bob', 'active'], ['bob', 'inactive']]
 * 
 * Hint: You want to emit whenever either stream emits, using the latest value from both
 */
const searchQuery$ = of('alice', 'bob').pipe(
  map(query => query),
  startWith('')
);
const filter$ = of('active', 'inactive').pipe(
  map(filter => filter),
  startWith('all')
);

const exercise04_scenario2 = EMPTY;

// ============================================================================
// SCENARIO 3: Wait for All to Complete
// ============================================================================
/**
 * Instructions:
 * - Fetch user data for IDs [1, 2, 3] simultaneously
 * - Wait for all requests to complete, then emit the final results
 * - Extract only the names from the results
 * - Expected: [['Alice Johnson', 'Bob Smith', 'Charlie Brown']]
 * 
 * Hint: You want to wait for ALL requests to complete before emitting anything
 */
const user1$ = data.fetchUser(1).pipe(map(user => user.name));
const user2$ = data.fetchUser(2).pipe(map(user => user.name));
const user3$ = data.fetchUser(3).pipe(map(user => user.name));
const exercise04_scenario3 = EMPTY; // TODO: Wait for all user requests to complete

// ============================================================================
// MAIN EXERCISE OBSERVABLE
// ============================================================================
/**
 * Instructions:
 * - Combine all three scenarios into a single observable
 * - The observable should emit an array containing the results from all scenarios
 * - Expected: [
 *     [0, 0, 1, 1, 2],  // Scenario 1 result
 *     [['alice', 'active'], ['bob', 'active'], ['bob', 'inactive']],  // Scenario 2 result
 *     [['Alice Johnson', 'Bob Smith', 'Charlie Brown']]  // Scenario 3 result
 *   ]
 * 
 * Hint: You'll need to combine the three scenario observables into a single stream
 */
const exercise04 = EMPTY;

export default {
  id: '04',
  title: 'Combining Observables',
  description: 'Learn how to combine multiple observables using different RxJS combination operators',
  expectedValues: [
    [0, 0, 1, 1, 2],  // Scenario 1 result
    [['alice', 'active'], ['bob', 'active'], ['bob', 'inactive']],  // Scenario 2 result
    [['Alice Johnson', 'Bob Smith', 'Charlie Brown']]  // Scenario 3 result
  ],
  expectedTimings: [0, 0, 2000], // Scenario 1&2 emit immediately, Scenario 3 after async operations
  timingTolerance: 1000, // 1 second tolerance for async operations
  timeout: 10000, // 10 seconds
  observable: exercise04
} as Exercise;
