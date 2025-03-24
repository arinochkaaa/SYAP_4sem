// 1
function createNumber(numbers: number[]): string {
    return `(${numbers.slice(0, 3).join('')}) ${numbers.slice(3, 6).join('')}-${numbers.slice(6).join('')}`;
}

console.log(createNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])); 

// 2
class Challenge {
    static solution(number: number): number {
        if (number < 0) return 0;
        let sum = 0;
        for (let i = 0; i < number; i++) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }
        return sum;
    }
}

console.log(Challenge.solution(10)); 

// 3
function rotate(nums: number[], k: number): void {
    k %= nums.length; 
    nums.unshift(...nums.splice(-k));
}

const nums = [1, 2, 3, 4, 5, 6, 7];
rotate(nums, 3);
console.log(nums); 

// 4.
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const mid = Math.floor(merged.length / 2);

    if (merged.length % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    } else {
        return merged[mid];
    }
}

console.log(findMedianSortedArrays([1, 3], [2])); 
console.log(findMedianSortedArrays([1, 2], [3, 4])); 
