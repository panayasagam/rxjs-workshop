import { DataSimulationService } from '../services/data-simulation.service';
import { Exercise } from './exercise.interface';

const data = new DataSimulationService();
const ids = data.getProductIds();

/**
 * Exercise 05: Batching and Combining Observables
 * 
 * In this exercise, you'll learn how to handle API limitations by batching requests
 * and combining the results using RxJS operators.
 */

/**
 * Instructions:
 * 1️⃣ Refactor this function to allow the caller to request data for an infinite amount of ids.
 * 2️⃣ Use a single pipe.
 * 3️⃣ Use a single line per operator.
 * 
 * The API can only handle up to 10 items at once, so you need to:
 *
 * Expected behavior:
 * - For 25 IDs: Split into [1-10], [11-20], [21-25] and process sequentially
 * - Each batch should be processed one after another (not in parallel)
 * - Final result should be a single array with all 25 items
 */

const exercise05 = data.getProducts(ids);

export default {
  id: '05',
  title: 'Batching and Combining Observables',
  description: 'Learn how to handle API limitations by batching requests and combining results using RxJS operators',
  expectedValues: [data.products],
  expectedTimings: [6000], // Sequential processing with delays for 3 batches
  timingTolerance: 2000, // 2 second tolerance for async operations
  timeout: 15000, // 15 seconds
  observable: exercise05
} as Exercise;
