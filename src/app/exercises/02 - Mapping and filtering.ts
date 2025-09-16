import { EMPTY } from 'rxjs';
import { Exercise } from './exercise.interface';

/**
 * Exercise 02: Mapping and Filtering
 * 
 * In this exercise, you'll learn how to transform and filter data using RxJS operators.
 * 
 * Instructions:
 * 1. Create an Observable that emits an array of numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * 2. Use operators to:
 *    - Filter out even numbers (keep only odd numbers)
 *    - Map each number to its square
 *    - Filter out numbers greater than 50
 * 3. The final Observable should emit a single array: [1, 9, 25, 49]
 * 
 * Hint: You'll need to flatten the array, apply operators, then collect results back into an array.
 * 
 * Expected behavior:
 * - Start with: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * - After filtering evens: [1, 3, 5, 7, 9]
 * - After squaring: [1, 9, 25, 49, 81]
 * - After filtering > 50: [1, 9, 25, 49]
 * - Final result: [1, 9, 25, 49] (as a single array emission)
 */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const exercise02 = EMPTY;

export default {
  id: '02',
  title: 'Mapping and Filtering',
  description: 'Learn how to transform and filter data using RxJS operators',
  expectedValues: [[1, 9, 25, 49]], // Single array emission
  expectedTimings: [0], // Should emit immediately
  timingTolerance: 100, // 100ms tolerance
  timeout: 10000, // 10 seconds
  observable: exercise02
} as Exercise;
