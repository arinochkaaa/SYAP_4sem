var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 1
function createNumber(numbers) {
    return "(".concat(numbers.slice(0, 3).join(''), ") ").concat(numbers.slice(3, 6).join(''), "-").concat(numbers.slice(6).join(''));
}
console.log(createNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
// 2
var Challenge = /** @class */ (function () {
    function Challenge() {
    }
    Challenge.solution = function (number) {
        if (number < 0)
            return 0;
        var sum = 0;
        for (var i = 0; i < number; i++) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }
        return sum;
    };
    return Challenge;
}());
console.log(Challenge.solution(10));
// 3
function rotate(nums, k) {
    k %= nums.length;
    nums.unshift.apply(nums, nums.splice(-k));
}
var nums = [1, 2, 3, 4, 5, 6, 7];
rotate(nums, 3);
console.log(nums);
// 4.
function findMedianSortedArrays(nums1, nums2) {
    var merged = __spreadArray(__spreadArray([], nums1, true), nums2, true).sort(function (a, b) { return a - b; });
    var mid = Math.floor(merged.length / 2);
    if (merged.length % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    }
    else {
        return merged[mid];
    }
}
console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));
