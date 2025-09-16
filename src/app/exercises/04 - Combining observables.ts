import { Observable, of, from, combineLatest, merge, zip, timer, interval, EMPTY } from 'rxjs';
import { map, switchMap, withLatestFrom, startWith, take, tap, delay } from 'rxjs/operators';
import { Exercise } from './exercise.interface';
import { DataSimulationService } from '../services/data-simulation.service';

/**
 * Exercise 04: Combining Observables
 * 
 * In this exercise, you'll learn how to combine multiple observables to solve real-world scenarios.
 * You'll need to choose the right combination operator for each scenario based on the requirements.
 * 
 * Instructions:
 * Implement 4 different scenarios. For each scenario, think about:
 * - Do you need to wait for all observables to emit before proceeding?
 * - Should you emit every time any observable emits?
 * - Do you need to pair values in order?
 * - Do you need to combine the latest value from one observable with values from another?
 * 
 * Scenarios:
 * 1. Create enriched user profiles that include both user data and their posts
 * 2. Aggregate search results from multiple search queries into a single list
 * 3. Create user profiles by pairing user IDs with their corresponding names in order
 * 4. Add timestamps to user data by combining with a time source
 * 
 * Choose the right operator for each scenario: combineLatest, merge, zip, or withLatestFrom
 */

// Create data simulation service instance
const dataService = new DataSimulationService();

/**
 * Scenario 1: Enriched User Profiles
 * 
 * You need to create user profiles that include both the user's basic information
 * and all their posts. The user data and posts are fetched separately and may
 * complete at different times.
 * 
 * Requirements:
 * - Wait for both user data and posts to be available
 * - Combine them into a single enriched user object
 * - Include a postCount field
 * 
 * Expected: User object with posts array and postCount
 */
const scenario1_enrichedProfiles = EMPTY; // TODO: Implement scenario 1

/**
 * Scenario 2: Aggregated Search Results
 * 
 * You're building a search feature that needs to run multiple search queries
 * simultaneously and collect all results into a single list. Each search
 * query may return different users, and you want to combine all results.
 * 
 * Requirements:
 * - Run multiple search queries at the same time
 * - Collect all results from all queries
 * - Return a single array with all unique users found
 * 
 * Expected: Array of all users found across all search queries
 */
const scenario2_aggregatedSearch = EMPTY; // TODO: Implement scenario 2

/**
 * Scenario 3: Ordered User Profiles
 * 
 * You have two separate data sources: one with user IDs and another with
 * corresponding user names. You need to create user profiles by pairing
 * each ID with its corresponding name in the exact same order.
 * 
 * Requirements:
 * - Pair values from two observables in order (1st with 1st, 2nd with 2nd, etc.)
 * - Create objects with id and name pairs
 * - Handle cases where observables might have different lengths
 * 
 * Expected: Array of objects with id and name pairs in order
 */
const scenario3_orderedProfiles = EMPTY; // TODO: Implement scenario 3

/**
 * Scenario 4: Timestamped User Data
 * 
 * You need to add a timestamp to user data to track when it was fetched.
 * The user data comes from an async operation, but you want to combine it
 * with the current time from a separate time source.
 * 
 * Requirements:
 * - Fetch user data asynchronously
 * - Combine it with current timestamp from a time source
 * - Add the timestamp as a 'fetchedAt' field
 * - The time source should provide the current time when user data is ready
 * 
 * Expected: User object with added fetchedAt timestamp
 */
const scenario4_timestampedData = EMPTY; // TODO: Implement scenario 4

/**
 * Main exercise observable that combines all scenarios
 * This will be the observable that students need to implement
 */
const exercise04 = EMPTY; // TODO: Implement the main observable

export default {
  id: '04',
  title: 'Combining Observables',
  description: 'Learn how to combine multiple observables by solving real-world scenarios that require different combination strategies',
  expectedValues: [{
    enrichedProfiles: {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      username: 'alice',
      phone: '555-0101',
      website: 'alice.dev',
      posts: [
        { id: 1, userId: 1, title: 'Getting Started with RxJS', body: 'RxJS is a powerful library for reactive programming...' },
        { id: 2, userId: 1, title: 'Understanding Observables', body: 'Observables are the foundation of RxJS...' }
      ],
      postCount: 2
    },
    aggregatedSearch: [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', username: 'alice', phone: '555-0101', website: 'alice.dev' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', username: 'bob', phone: '555-0102', website: 'bob.dev' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', username: 'charlie', phone: '555-0103', website: 'charlie.dev' }
    ],
    orderedProfiles: [
      { id: 1, name: 'Alice Johnson' },
      { id: 2, name: 'Bob Smith' },
      { id: 3, name: 'Charlie Brown' }
    ],
    timestampedData: {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      username: 'alice',
      phone: '555-0101',
      website: 'alice.dev',
      fetchedAt: '2024-01-01T00:00:00.000Z' // Will be a valid ISO string (actual timestamp will vary)
    }
  }],
  expectedTimings: [0], // Should emit after all async operations complete
  timingTolerance: 3000, // 3 seconds tolerance for async operations
  timeout: 15000, // 15 seconds
  observable: exercise04
} as Exercise;
