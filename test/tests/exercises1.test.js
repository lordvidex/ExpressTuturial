const { fizzBuzz } = require('../exercise1');

require('../exercise1');
describe('FizzBuzz',()=>{
    test('should throw an Error if input is not a number',()=>{
        expect(()=>fizzBuzz('a')).toThrow();
        expect(()=>fizzBuzz(null)).toThrow();
        expect(()=>fizzBuzz(undefined)).toThrow();
        expect(()=>fizzBuzz({})).toThrow();
        expect(()=>fizzBuzz(true)).toThrow();
    });

    test('should return FizzBuzz if input is divisible by both 3 and 5',()=>{
        expect(fizzBuzz(15)).toBe('FizzBuzz');
    });
    test('should return Fizz if input is divisible by only 3',()=>{
        expect(fizzBuzz(6)).toBe('Fizz');
    });
    test('should return Buzz if input is divisible by only 5',()=>{
        expect(fizzBuzz(10)).toBe('Buzz');
    })
    test('should return input if the input is not divisible by 3 or 5',()=>{
        expect(fizzBuzz(4)).toBe(4);
    })
})