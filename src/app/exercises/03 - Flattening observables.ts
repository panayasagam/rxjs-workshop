import { EMPTY } from 'rxjs';
import { DataSimulationService } from '../services/data-simulation.service';
import { Exercise } from './exercise.interface';

const data = new DataSimulationService();

/**
 * Exercise 03: Flattening Observables
 * 
 * In this exercise, you'll learn how to flatten observables inside a pipe.
 * This is crucial for handling nested observables and managing their emissions.
 * 
 * Instructions:
 * 1. Create an Observable that emits user IDs: [1, 2, 3]
 * 2. For each user ID, use `data.fetchUser(userId)` to simulate fetching user data
 * 3. Transform the user data to get only the user's name
 * 4. Collect all names into a single array emission
 * 
 * Expected behavior:
 * - Start with: [1, 2, 3] (user IDs)
 * - Fetch user data for each ID using the data service
 * - Extract names: ['Alice Johnson', 'Bob Smith', 'Charlie Brown']
 * - Final result: ['Alice Johnson', 'Bob Smith', 'Charlie Brown'] (as a single array emission)
 * 
 * Hint: You'll need to flatten the inner observables and collect the results.
 * Consider using operators like mergeMap, switchMap, or concatMap.
 */

const exercise03 = EMPTY;

export default {
  id: '03',
  title: 'Flattening Observables',
  description: 'Learn how to flatten observables inside a pipe using operators like mergeMap, switchMap, and concatMap',
  expectedValues: [['Alice Johnson', 'Bob Smith', 'Charlie Brown']], // Single array emission
  expectedTimings: [0], // Should emit immediately after all data is fetched
  timingTolerance: 2000, // 2 seconds tolerance for async operations
  timeout: 10000, // 10 seconds
  observable: exercise03
} as Exercise;
