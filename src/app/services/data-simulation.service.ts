import { Injectable } from '@angular/core';
import { defer, Observable, of, from } from 'rxjs';
import { concatMap, delay, map } from 'rxjs/operators';

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

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sku: string;
  inStock: boolean;
}

export interface ProductSpecification {
  id: number;
  description: string;
  specifications: {
    dimensions: {
      width: number;
      height: number;
      depth: number;
      unit: string;
    };
    weight: {
      value: number;
      unit: string;
    };
    features: string[];
    warranty: string;
    manufacturer: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DataSimulationService {
  
  // Mock data for users
  public readonly users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', username: 'alice', phone: '555-0101', website: 'alice.dev' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', username: 'bob', phone: '555-0102', website: 'bob.dev' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', username: 'charlie', phone: '555-0103', website: 'charlie.dev' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', username: 'diana', phone: '555-0104', website: 'diana.dev' },
    { id: 5, name: 'Eve Wilson', email: 'eve@example.com', username: 'eve', phone: '555-0105', website: 'eve.dev' }
  ] as const;

  // Mock data for posts
  public readonly posts: Post[] = [
    { id: 1, userId: 1, title: 'Getting Started with RxJS', body: 'RxJS is a powerful library for reactive programming...' },
    { id: 2, userId: 1, title: 'Understanding Observables', body: 'Observables are the foundation of RxJS...' },
    { id: 3, userId: 2, title: 'Operators Deep Dive', body: 'Operators are the building blocks of reactive programming...' },
    { id: 4, userId: 2, title: 'Error Handling in RxJS', body: 'Proper error handling is crucial for robust applications...' },
    { id: 5, userId: 3, title: 'Testing RxJS Code', body: 'Testing reactive code requires special considerations...' },
    { id: 6, userId: 3, title: 'Performance Optimization', body: 'Optimizing RxJS applications for better performance...' },
    { id: 7, userId: 4, title: 'Real-world Examples', body: 'Practical examples of RxJS in production applications...' },
    { id: 8, userId: 5, title: 'Advanced Patterns', body: 'Advanced patterns and techniques in reactive programming...' }
  ] as const;

  // Mock data for comments
  public readonly comments: Comment[] = [
    { id: 1, postId: 1, name: 'John Doe', email: 'john@example.com', body: 'Great article! Very helpful.' },
    { id: 2, postId: 1, name: 'Jane Smith', email: 'jane@example.com', body: 'Thanks for sharing this knowledge.' },
    { id: 3, postId: 2, name: 'Mike Johnson', email: 'mike@example.com', body: 'This cleared up a lot of confusion.' },
    { id: 4, postId: 3, name: 'Sarah Wilson', email: 'sarah@example.com', body: 'Excellent explanation of operators.' },
    { id: 5, postId: 4, name: 'Tom Brown', email: 'tom@example.com', body: 'Error handling is so important.' }
  ] as const;

  // Mock data for API simulation
  public readonly products: Product[] = [
    { id: 1, name: 'Wireless Bluetooth Headphones', price: 99.99, category: 'Electronics', sku: 'WBH-001', inStock: true },
    { id: 2, name: 'Mechanical Gaming Keyboard', price: 149.99, category: 'Electronics', sku: 'MGK-002', inStock: true },
    { id: 3, name: 'Ergonomic Office Chair', price: 299.99, category: 'Furniture', sku: 'EOC-003', inStock: false },
    { id: 4, name: 'Smart Fitness Watch', price: 199.99, category: 'Electronics', sku: 'SFW-004', inStock: true },
    { id: 5, name: 'Standing Desk Converter', price: 179.99, category: 'Furniture', sku: 'SDC-005', inStock: true },
    { id: 6, name: 'USB-C Hub', price: 79.99, category: 'Electronics', sku: 'UCH-006', inStock: true },
    { id: 7, name: 'Adjustable Monitor Stand', price: 89.99, category: 'Furniture', sku: 'AMS-007', inStock: false },
    { id: 8, name: 'Wireless Mouse', price: 49.99, category: 'Electronics', sku: 'WM-008', inStock: true },
    { id: 9, name: 'Desk Lamp with USB Ports', price: 59.99, category: 'Furniture', sku: 'DLU-009', inStock: true },
    { id: 10, name: 'Laptop Stand', price: 39.99, category: 'Furniture', sku: 'LS-010', inStock: true },
    { id: 11, name: 'Bluetooth Speaker', price: 79.99, category: 'Electronics', sku: 'BS-011', inStock: true },
    { id: 12, name: 'Cable Management Tray', price: 24.99, category: 'Furniture', sku: 'CMT-012', inStock: true },
    { id: 13, name: 'Webcam HD 1080p', price: 69.99, category: 'Electronics', sku: 'WH-013', inStock: false },
    { id: 14, name: 'Desk Organizer', price: 34.99, category: 'Furniture', sku: 'DO-014', inStock: true },
    { id: 15, name: 'Gaming Mouse Pad', price: 19.99, category: 'Electronics', sku: 'GMP-015', inStock: true },
    { id: 16, name: 'Monitor Mount Dual', price: 129.99, category: 'Furniture', sku: 'MMD-016', inStock: true },
    { id: 17, name: 'External Hard Drive 1TB', price: 89.99, category: 'Electronics', sku: 'EHD-017', inStock: true },
    { id: 18, name: 'Desk Drawer Unit', price: 149.99, category: 'Furniture', sku: 'DDU-018', inStock: false },
    { id: 19, name: 'Tablet Stand Adjustable', price: 44.99, category: 'Furniture', sku: 'TSA-019', inStock: true },
    { id: 20, name: 'RGB LED Strip Lights', price: 29.99, category: 'Electronics', sku: 'RLS-020', inStock: true },
    { id: 21, name: 'Footrest Under Desk', price: 39.99, category: 'Furniture', sku: 'FUD-021', inStock: true },
    { id: 22, name: 'Wireless Charging Pad', price: 34.99, category: 'Electronics', sku: 'WCP-022', inStock: true },
    { id: 23, name: 'Monitor Privacy Filter', price: 49.99, category: 'Electronics', sku: 'MPF-023', inStock: false },
    { id: 24, name: 'Desk Cable Grommet', price: 14.99, category: 'Furniture', sku: 'DCG-024', inStock: true },
    { id: 25, name: 'Smart Home Hub', price: 199.99, category: 'Electronics', sku: 'SHH-025', inStock: true }
  ] as const;

  // Mock product specifications data
  private readonly productSpecifications: ProductSpecification[] = [
    { id: 1, description: 'High-quality wireless headphones with noise cancellation', specifications: { dimensions: { width: 20, height: 18, depth: 8, unit: 'cm' }, weight: { value: 250, unit: 'g' }, features: ['Noise Cancellation', '30hr Battery', 'Quick Charge', 'Bluetooth 5.0'], warranty: '2 years', manufacturer: 'AudioTech' } },
    { id: 2, description: 'Mechanical keyboard with RGB lighting and tactile switches', specifications: { dimensions: { width: 45, height: 15, depth: 3, unit: 'cm' }, weight: { value: 1200, unit: 'g' }, features: ['RGB Backlight', 'Mechanical Switches', 'USB-C', 'Macro Keys'], warranty: '1 year', manufacturer: 'KeyMaster' } },
    { id: 3, description: 'Ergonomic office chair with lumbar support and adjustable height', specifications: { dimensions: { width: 65, height: 120, depth: 65, unit: 'cm' }, weight: { value: 15000, unit: 'g' }, features: ['Lumbar Support', 'Height Adjustable', '360° Swivel', 'Breathable Mesh'], warranty: '5 years', manufacturer: 'ComfortSeat' } },
    { id: 4, description: 'Smart fitness watch with heart rate monitoring and GPS', specifications: { dimensions: { width: 4, height: 4, depth: 1, unit: 'cm' }, weight: { value: 50, unit: 'g' }, features: ['Heart Rate Monitor', 'GPS', 'Water Resistant', 'Sleep Tracking'], warranty: '1 year', manufacturer: 'FitTech' } },
    { id: 5, description: 'Standing desk converter with electric height adjustment', specifications: { dimensions: { width: 80, height: 20, depth: 60, unit: 'cm' }, weight: { value: 25000, unit: 'g' }, features: ['Electric Motor', 'Memory Presets', 'Cable Management', 'Stable Base'], warranty: '3 years', manufacturer: 'StandUp' } },
    { id: 6, description: 'USB-C hub with multiple ports for laptop connectivity', specifications: { dimensions: { width: 12, height: 2, depth: 8, unit: 'cm' }, weight: { value: 150, unit: 'g' }, features: ['USB-C', 'HDMI', 'USB 3.0', 'SD Card Reader'], warranty: '1 year', manufacturer: 'ConnectPro' } },
    { id: 7, description: 'Adjustable monitor stand with gas spring mechanism', specifications: { dimensions: { width: 60, height: 5, depth: 25, unit: 'cm' }, weight: { value: 5000, unit: 'g' }, features: ['Gas Spring', 'Tilt Adjustment', 'VESA Compatible', 'Cable Management'], warranty: '2 years', manufacturer: 'MonitorMount' } },
    { id: 8, description: 'Wireless mouse with precision sensor and long battery life', specifications: { dimensions: { width: 12, height: 6, depth: 4, unit: 'cm' }, weight: { value: 100, unit: 'g' }, features: ['Wireless', 'Precision Sensor', 'Long Battery', 'Ergonomic Design'], warranty: '1 year', manufacturer: 'MouseTech' } },
    { id: 9, description: 'Desk lamp with integrated USB charging ports and adjustable brightness', specifications: { dimensions: { width: 30, height: 45, depth: 15, unit: 'cm' }, weight: { value: 800, unit: 'g' }, features: ['USB Ports', 'Adjustable Brightness', 'Touch Control', 'LED Technology'], warranty: '2 years', manufacturer: 'LightWorks' } },
    { id: 10, description: 'Portable laptop stand with adjustable height and angle', specifications: { dimensions: { width: 35, height: 3, depth: 25, unit: 'cm' }, weight: { value: 600, unit: 'g' }, features: ['Adjustable Height', 'Portable', 'Stable Base', 'Ventilation'], warranty: '1 year', manufacturer: 'LaptopPro' } },
    { id: 11, description: 'Bluetooth speaker with 360-degree sound and waterproof design', specifications: { dimensions: { width: 8, height: 8, depth: 8, unit: 'cm' }, weight: { value: 300, unit: 'g' }, features: ['360° Sound', 'Waterproof', 'Bluetooth 5.0', '12hr Battery'], warranty: '1 year', manufacturer: 'SoundSphere' } },
    { id: 12, description: 'Cable management tray for organized desk setup', specifications: { dimensions: { width: 40, height: 5, depth: 15, unit: 'cm' }, weight: { value: 200, unit: 'g' }, features: ['Cable Routing', 'Easy Access', 'Durable Material', 'Desk Mount'], warranty: '1 year', manufacturer: 'CableOrganizer' } },
    { id: 13, description: 'HD webcam with 1080p resolution and built-in microphone', specifications: { dimensions: { width: 10, height: 6, depth: 3, unit: 'cm' }, weight: { value: 120, unit: 'g' }, features: ['1080p HD', 'Built-in Mic', 'Auto Focus', 'Privacy Cover'], warranty: '1 year', manufacturer: 'VideoTech' } },
    { id: 14, description: 'Desk organizer with multiple compartments for office supplies', specifications: { dimensions: { width: 25, height: 15, depth: 20, unit: 'cm' }, weight: { value: 500, unit: 'g' }, features: ['Multiple Compartments', 'Pen Holders', 'Phone Stand', 'Modular Design'], warranty: '1 year', manufacturer: 'DeskOrganizer' } },
    { id: 15, description: 'Gaming mouse pad with RGB lighting and smooth surface', specifications: { dimensions: { width: 35, height: 30, depth: 0.3, unit: 'cm' }, weight: { value: 200, unit: 'g' }, features: ['RGB Lighting', 'Smooth Surface', 'Non-slip Base', 'Gaming Optimized'], warranty: '1 year', manufacturer: 'GameGear' } },
    { id: 16, description: 'Dual monitor mount with gas spring and VESA compatibility', specifications: { dimensions: { width: 100, height: 8, depth: 30, unit: 'cm' }, weight: { value: 8000, unit: 'g' }, features: ['Dual Monitor', 'Gas Spring', 'VESA Compatible', 'Cable Management'], warranty: '3 years', manufacturer: 'DualMount' } },
    { id: 17, description: 'External hard drive with 1TB storage and USB 3.0 connectivity', specifications: { dimensions: { width: 12, height: 8, depth: 2, unit: 'cm' }, weight: { value: 200, unit: 'g' }, features: ['1TB Storage', 'USB 3.0', 'Portable', 'Plug & Play'], warranty: '2 years', manufacturer: 'StorageTech' } },
    { id: 18, description: 'Desk drawer unit with multiple compartments and soft-close mechanism', specifications: { dimensions: { width: 40, height: 20, depth: 30, unit: 'cm' }, weight: { value: 3000, unit: 'g' }, features: ['Multiple Drawers', 'Soft Close', 'Key Lock', 'Durable Construction'], warranty: '2 years', manufacturer: 'DrawerPro' } },
    { id: 19, description: 'Adjustable tablet stand with multiple viewing angles', specifications: { dimensions: { width: 25, height: 3, depth: 20, unit: 'cm' }, weight: { value: 400, unit: 'g' }, features: ['Adjustable Angle', 'Universal Fit', 'Stable Base', 'Portable'], warranty: '1 year', manufacturer: 'TabletStand' } },
    { id: 20, description: 'RGB LED strip lights with remote control and multiple colors', specifications: { dimensions: { width: 200, height: 1, depth: 0.5, unit: 'cm' }, weight: { value: 100, unit: 'g' }, features: ['RGB Colors', 'Remote Control', 'Adhesive Backing', 'Cuttable'], warranty: '1 year', manufacturer: 'LEDStrip' } },
    { id: 21, description: 'Under-desk footrest with adjustable height and massage function', specifications: { dimensions: { width: 40, height: 15, depth: 30, unit: 'cm' }, weight: { value: 1500, unit: 'g' }, features: ['Adjustable Height', 'Massage Function', 'Ergonomic Design', 'Non-slip Base'], warranty: '1 year', manufacturer: 'FootRest' } },
    { id: 22, description: 'Wireless charging pad with fast charging and LED indicator', specifications: { dimensions: { width: 10, height: 1, depth: 10, unit: 'cm' }, weight: { value: 150, unit: 'g' }, features: ['Fast Charging', 'LED Indicator', 'Universal Compatible', 'Non-slip Surface'], warranty: '1 year', manufacturer: 'ChargeTech' } },
    { id: 23, description: 'Monitor privacy filter with anti-glare and easy installation', specifications: { dimensions: { width: 50, height: 30, depth: 0.1, unit: 'cm' }, weight: { value: 50, unit: 'g' }, features: ['Privacy Protection', 'Anti-glare', 'Easy Install', 'Universal Size'], warranty: '1 year', manufacturer: 'PrivacyFilter' } },
    { id: 24, description: 'Desk cable grommet for clean cable management', specifications: { dimensions: { width: 7, height: 1, depth: 7, unit: 'cm' }, weight: { value: 20, unit: 'g' }, features: ['Cable Management', 'Easy Install', 'Durable Material', 'Clean Look'], warranty: '1 year', manufacturer: 'CableGrommet' } },
    { id: 25, description: 'Smart home hub with voice control and multiple device support', specifications: { dimensions: { width: 12, height: 3, depth: 12, unit: 'cm' }, weight: { value: 300, unit: 'g' }, features: ['Voice Control', 'WiFi', 'Multiple Protocols', 'Mobile App'], warranty: '2 years', manufacturer: 'SmartHome' } }
  ] as const;

  /**
   * Simulate fetching a user by ID with network delay
   */
  fetchUser(userId: number): Observable<User> {
    return defer(() => {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    return of(user).pipe(
      delay(this.getRandomDelay(500, 1500)) // 0.5-1.5 second delay
    );
    });
  }

  /**
   * Simulate fetching all users with network delay
   */
  fetchAllUsers(): Observable<User[]> {
    return defer(() => {
    return of([...this.users]).pipe(
      delay(this.getRandomDelay(800, 2000)) // 0.8-2 second delay
    );
    });
  }

  /**
   * Simulate fetching posts by user ID with network delay
   */
  fetchUserPosts(userId: number): Observable<Post[]> {
    return defer(() => {
    const userPosts = this.posts.filter(p => p.userId === userId);
    return of(userPosts).pipe(
      delay(this.getRandomDelay(600, 1800)) // 0.6-1.8 second delay
    );
    });
  }

  /**
   * Simulate fetching all posts with network delay
   */
  fetchAllPosts(): Observable<Post[]> {
    return defer(() => {
    return of([...this.posts]).pipe(
      delay(this.getRandomDelay(1000, 2500)) // 1-2.5 second delay
    );
    });
  }

  /**
   * Simulate fetching comments by post ID with network delay
   */
  fetchPostComments(postId: number): Observable<Comment[]> {
    return defer(() => {
    const postComments = this.comments.filter(c => c.postId === postId);
    return of(postComments).pipe(
      delay(this.getRandomDelay(400, 1200)) // 0.4-1.2 second delay
    );
    });
  }

  /**
   * Simulate fetching a post by ID with network delay
   */
  fetchPost(postId: number): Observable<Post> {
    return defer(() => {
    const post = this.posts.find(p => p.id === postId);
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`);
    }
    
    return of(post).pipe(
      delay(this.getRandomDelay(300, 1000)) // 0.3-1 second delay
    );
    });
  }

  /**
   * Simulate a search operation with network delay
   */
  searchUsers(query: string): Observable<User[]> {
    return defer(() => {
    const filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    
    return of(filteredUsers).pipe(
      delay(this.getRandomDelay(500, 1500)) // 0.5-1.5 second delay
    );
    });
  }

  /**
   * Simulate a batch operation with network delay
   */
  batchFetchUsers(userIds: number[]): Observable<User[]> {
    return defer(() => {
    const users = userIds.map(id => this.users.find(u => u.id === id)).filter(Boolean) as User[];
    return of(users).pipe(
      delay(this.getRandomDelay(1000, 3000)) // 1-3 second delay for batch operations
    );
    });
  }

  /**
   * Simulate a slow operation (for timeout testing)
   */
  slowOperation(): Observable<string> {
    return defer(() => {
    return of('Operation completed').pipe(
      delay(5000) // 5 second delay
    );
    });
  }

  /**
   * Simulate an operation that might fail
   */
  unreliableOperation(successRate: number = 0.7): Observable<string> {
    return defer(() => {
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
    });
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

  /**
   * Simulate API that can only handle limited batch requests
   * This simulates a real-world scenario where APIs have batch size limits
   */
  getProducts(ids: number[]): Observable<Product[]> {
    return defer(() => {
      // Simulate API limitation - can only handle up to 10 items at once
      if (ids.length > 10) {
        throw new Error(`API Error: Batch size too large. Maximum 10 items allowed, got ${ids.length}`);
      }

      // Simulate network delay based on batch size
      const delayTime = ids.length * 200 + this.getRandomDelay(300, 800);

      const results = ids
        .map(id => this.products.find(item => item.id === id))
        .filter(Boolean) as Product[];

      return of(results).pipe(
        delay(delayTime)
      );
    });
  }

  /**
   * Get all available data item IDs
   */
  getProductIds(): number[] {
    return this.products.map(item => item.id);
  }

  /**
   * Get data item count
   */
  getProductCount(): number {
    return this.products.length;
  }

  /**
   * Get all product specifications
   */
  getProductSpecifications(): ProductSpecification[] {
    return [...this.productSpecifications];
  }

  /**
   * Simulate querying items based on user input
   * Returns a subset of items based on the query
   */
  query(input: string): Observable<Product[]> {
    return defer(() => {
      const query = input.toLowerCase();
      const filteredItems = this.products.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
      
      return of(filteredItems).pipe(
        delay(this.getRandomDelay(500, 1200))
      );
    });
  }

  /**
   * Simulate getting detailed information for a specific item
   */
  getObjectDetails(item: Product): Observable<ProductSpecification> {
    return defer(() => {
      const details = this.productSpecifications.find(d => d.id === item.id);
      if (!details) {
        throw new Error(`Details for item ${item.id} not found`);
      }
      
      return of(details).pipe(
        delay(this.getRandomDelay(300, 800))
      );
    });
  }

  /**
   * Simulate user input stream
   */
  getUserInput(): Observable<string> {
    return defer(() => {
      const inputs = ['wireless', 'desk', 'gaming', 'monitor', 'usb'];
      return from(inputs).pipe(
        concatMap((input, index) => 
          of(input).pipe(delay(index * 1000)) // Emit every second
        )
      );
    });
  }
}

