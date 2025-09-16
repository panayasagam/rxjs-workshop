import { Observable } from 'rxjs';
import { Exercise } from './exercise.interface';

/**
 * Exercise 01: Observable Creation
 * 
 * In this exercise, you'll learn how to create a new Observable using the Observable constructor.
 * 
 * Instructions:
 * 1. Create a new Observable that emits the values: 1, 2, 3, 4, 5
 * 2. The Observable should emit these values with a 1-second delay between each emission
 * 3. After emitting all values, the Observable should complete
 * 
 * 🧙‍♂️ Bonus challenge:
 * Allows the subscriber to cancel the emission by unsubscribing.
 */

const exercise01 = new Observable<number>(observer => {

});

export default {
  id: '01',
  title: 'Observable Creation',
  description: 'Learn how to create a new Observable using the Observable constructor',
  expectedValues: [1, 2, 3, 4, 5],
  expectedTimings: [1000, 2000, 3000, 4000, 5000], // 1s, 2s, 3s, 4s, 5s
  timingTolerance: 200, // 200ms tolerance
  timeout: 10000, // 10 seconds
  observable: exercise01
} as Exercise;
