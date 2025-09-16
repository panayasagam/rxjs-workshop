import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataSimulationService {
  
  // Mock data for users
  private users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', username: 'alice', phone: '555-0101', website: 'alice.dev' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', username: 'bob', phone: '555-0102', website: 'bob.dev' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', username: 'charlie', phone: '555-0103', website: 'charlie.dev' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', username: 'diana', phone: '555-0104', website: 'diana.dev' },
    { id: 5, name: 'Eve Wilson', email: 'eve@example.com', username: 'eve', phone: '555-0105', website: 'eve.dev' }
  ];

  // Mock data for posts
  private posts: Post[] = [
    { id: 1, userId: 1, title: 'Getting Started with RxJS', body: 'RxJS is a powerful library for reactive programming...' },
    { id: 2, userId: 1, title: 'Understanding Observables', body: 'Observables are the foundation of RxJS...' },
    { id: 3, userId: 2, title: 'Operators Deep Dive', body: 'Operators are the building blocks of reactive programming...' },
    { id: 4, userId: 2, title: 'Error Handling in RxJS', body: 'Proper error handling is crucial for robust applications...' },
    { id: 5, userId: 3, title: 'Testing RxJS Code', body: 'Testing reactive code requires special considerations...' },
    { id: 6, userId: 3, title: 'Performance Optimization', body: 'Optimizing RxJS applications for better performance...' },
    { id: 7, userId: 4, title: 'Real-world Examples', body: 'Practical examples of RxJS in production applications...' },
    { id: 8, userId: 5, title: 'Advanced Patterns', body: 'Advanced patterns and techniques in reactive programming...' }
  ];

  // Mock data for comments
  private comments: Comment[] = [
    { id: 1, postId: 1, name: 'John Doe', email: 'john@example.com', body: 'Great article! Very helpful.' },
    { id: 2, postId: 1, name: 'Jane Smith', email: 'jane@example.com', body: 'Thanks for sharing this knowledge.' },
    { id: 3, postId: 2, name: 'Mike Johnson', email: 'mike@example.com', body: 'This cleared up a lot of confusion.' },
    { id: 4, postId: 3, name: 'Sarah Wilson', email: 'sarah@example.com', body: 'Excellent explanation of operators.' },
    { id: 5, postId: 4, name: 'Tom Brown', email: 'tom@example.com', body: 'Error handling is so important.' }
  ];

  /**
   * Simulate fetching a user by ID with network delay
   */
  fetchUser(userId: number): Observable<User> {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    return of(user).pipe(
      delay(this.getRandomDelay(500, 1500)) // 0.5-1.5 second delay
    );
  }

  /**
   * Simulate fetching all users with network delay
   */
  fetchAllUsers(): Observable<User[]> {
    return of([...this.users]).pipe(
      delay(this.getRandomDelay(800, 2000)) // 0.8-2 second delay
    );
  }

  /**
   * Simulate fetching posts by user ID with network delay
   */
  fetchUserPosts(userId: number): Observable<Post[]> {
    const userPosts = this.posts.filter(p => p.userId === userId);
    return of(userPosts).pipe(
      delay(this.getRandomDelay(600, 1800)) // 0.6-1.8 second delay
    );
  }

  /**
   * Simulate fetching all posts with network delay
   */
  fetchAllPosts(): Observable<Post[]> {
    return of([...this.posts]).pipe(
      delay(this.getRandomDelay(1000, 2500)) // 1-2.5 second delay
    );
  }

  /**
   * Simulate fetching comments by post ID with network delay
   */
  fetchPostComments(postId: number): Observable<Comment[]> {
    const postComments = this.comments.filter(c => c.postId === postId);
    return of(postComments).pipe(
      delay(this.getRandomDelay(400, 1200)) // 0.4-1.2 second delay
    );
  }

  /**
   * Simulate fetching a post by ID with network delay
   */
  fetchPost(postId: number): Observable<Post> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`);
    }
    
    return of(post).pipe(
      delay(this.getRandomDelay(300, 1000)) // 0.3-1 second delay
    );
  }

  /**
   * Simulate a search operation with network delay
   */
  searchUsers(query: string): Observable<User[]> {
    const filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    
    return of(filteredUsers).pipe(
      delay(this.getRandomDelay(500, 1500)) // 0.5-1.5 second delay
    );
  }

  /**
   * Simulate a batch operation with network delay
   */
  batchFetchUsers(userIds: number[]): Observable<User[]> {
    const users = userIds.map(id => this.users.find(u => u.id === id)).filter(Boolean) as User[];
    return of(users).pipe(
      delay(this.getRandomDelay(1000, 3000)) // 1-3 second delay for batch operations
    );
  }

  /**
   * Simulate a slow operation (for timeout testing)
   */
  slowOperation(): Observable<string> {
    return of('Operation completed').pipe(
      delay(5000) // 5 second delay
    );
  }

  /**
   * Simulate an operation that might fail
   */
  unreliableOperation(successRate: number = 0.7): Observable<string> {
    const shouldSucceed = Math.random() < successRate;
    
    return of('').pipe(
      delay(this.getRandomDelay(500, 1500)),
      map(() => {
        if (shouldSucceed) {
          return 'Operation succeeded';
        } else {
          throw new Error('Operation failed due to network issues');
        }
      })
    );
  }

  /**
   * Get a random delay between min and max milliseconds
   */
  private getRandomDelay(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Get all available user IDs
   */
  getUserIds(): number[] {
    return this.users.map(u => u.id);
  }

  /**
   * Get all available post IDs
   */
  getPostIds(): number[] {
    return this.posts.map(p => p.id);
  }

  /**
   * Get user count
   */
  getUserCount(): number {
    return this.users.length;
  }

  /**
   * Get post count
   */
  getPostCount(): number {
    return this.posts.length;
  }
}

