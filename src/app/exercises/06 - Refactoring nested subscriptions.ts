import { EMPTY, forkJoin, Observable } from 'rxjs';
import { DataSimulationService, Product, ProductSpecification } from '../services/data-simulation.service';
import { Exercise } from './exercise.interface';

const data = new DataSimulationService();

/**
 * Exercise 06: Refactoring Nested Subscriptions
 * 
 * In this exercise, you'll learn how to refactor nested subscriptions into a clean,
 * reactive stream using RxJS tools.
 */

// ============================================================================
// SCENARIO: Nested Subscriptions Anti-pattern
// ============================================================================
/**
 * Instructions:
 * 1️⃣ Refactor this function and return an Observable<DetailedProduct[]>
 * 2️⃣ Use a single pipe.
 * 3️⃣ Avoid nested subscriptions
 *  
 * Expected behavior:
 * - When user input changes, query for items
 * - For each batch of items, get details for all items in parallel
 * - Combine items with their details into DetailedProduct objects
 * - Return a single Observable that emits the combined results
 */

interface DetailedProduct {
    product: Product;
    productSpecs: ProductSpecification;
}

// This is the problematic nested subscription pattern
function __updateItemsOnUserInput__Bad__(): void {
    data.getUserInput().subscribe((input) => {
        data.query(input).subscribe((products) => {
            forkJoin(products.map((product) => data.getObjectDetails(product))).subscribe(
                (details) => {
                    const detailedProducts = products.reduce(
                        (all, product, index) => [...all, { product, productSpecs: details[index] }],
                        [] as DetailedProduct[]
                    );
                    console.log('Detailed items:', detailedProducts);
                }
            );
        });
    });
}

// TODO: Refactor this into a proper Observable stream
function updateItemsOnUserInput(): Observable<DetailedProduct[]> {
    return EMPTY;
}

// ============================================================================
// MAIN EXERCISE OBSERVABLE
// ============================================================================
/**
 * Instructions:
 * - Test the refactored function
 * - The observable should emit DetailedItem arrays for each user input
 * - Expected: Multiple emissions with different DetailedProduct arrays based on user input
 * 
 * Each DetailedProduct should contain:
 * - product: The original Product object
 * - productSpecs: The corresponding ProductSpecification object
 */
const exercise06 = updateItemsOnUserInput();

export default {
    id: '06',
    title: 'Refactoring Nested Subscriptions',
    description: 'Learn how to refactor nested subscriptions into clean, reactive streams using switchMap and forkJoin',
    expectedValues: createExpectedDetailedItems(),
    expectedTimings: [5000], // Last search term ('usb') emitted at 4 seconds + processing time
    timingTolerance: 1000, // 1 second tolerance for async operations
    timeout: 15000, // 15 seconds
    observable: exercise06
} as Exercise;


// Helper function to create expected DetailedItem arrays for the last search term
function createExpectedDetailedItems(): DetailedProduct[] {
    const products = data.products;
    const specifications = data.getProductSpecifications();

    // Consider the last search term since switchMap cancels previous requests and keeps only the last one
    const searchTerms = ['wireless', 'desk', 'gaming', 'monitor', 'usb'];
    const lastSearchTerm = searchTerms[searchTerms.length - 1]; // 'usb'

    const matchingProducts = products.filter(product =>
        product.name.toLowerCase().includes(lastSearchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(lastSearchTerm.toLowerCase())
    );

    return matchingProducts.map(product => {
        const spec = specifications.find(s => s.id === product.id) as ProductSpecification;
        return {
            product,
            productSpecs: spec
        };
    });
}
