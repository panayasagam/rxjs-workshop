import { EMPTY } from 'rxjs';
import { Exercise } from './exercise.interface';

/**
 * Exercise 02: Mapping, Filtering, and Taking
 * 
 * In this exercise, you'll learn how to transform, filter, and limit data using RxJS operators.
 * 
 * Instructions:
 * 1. Create an Observable that emits an array of numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * 2. Use operators to:
 *    - Filter out even numbers (keep only odd numbers)
 *    - Map each number to its square
 *    - Take only the first 4 results (limit the output)
 *    - Filter out numbers less than 10
 * 3. The final Observable should emit a single array: [25, 49]
 * 
 * Hint: You'll need to flatten the array, apply operators, then collect results back into an array.
 * 
 * Expected behavior:
 * - Start with: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * - After filtering evens: [1, 3, 5, 7, 9]
 * - After squaring: [1, 9, 25, 49, 81]
 * - After taking first 4: [1, 9, 25, 49]
 * - After filtering >= 10: [25, 49] (removes 1 and 9)
 * - Final result: [25, 49] (as a single array emission)
 */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const exercise02 = EMPTY;

export default {
  id: '02',
  title: 'Mapping, Filtering, and Taking',
  description: 'Learn how to transform, filter, and limit data using RxJS operators',
  expectedValues: [[25, 49]], // Single array emission after filtering < 10
  expectedTimings: [0], // Should emit immediately
  timingTolerance: 100, // 100ms tolerance
  timeout: 10000, // 10 seconds
  observable: exercise02
} as Exercise;
