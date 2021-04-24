const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    it('should return a +ve number if number is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    it('should return a +ve number if number is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    it('should return 0 if number is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })
});

describe('greet', () => {
    it('should contain name of user when greeting', () => {
        const name = 'Evans';
        const greeting = lib.greet(name);
        expect(greeting).toMatch(name);
    });
});

describe('getCurrencies', () => {
    it('should contain USD, AUD and EUR', () => {
        const currencies = lib.getCurrencies();
        expect(currencies).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));

    });
});

describe('getProduct', () => {
    it('should return an object with id and price', () => {
        const product = lib.getProduct(1);
        // variant 1 - must match all keys and values must be equal
        // expect(product).toEqual({id:1,price: 10 });

        // variant 2 - provided keys should be equal
        expect(product).toMatchObject({ id: 1, price: 10 });
    });
});

describe('registering a user', () => {
    let username;
    it('should throw an exception if username is not provided', () => {
        expect(() => lib.registerUser(username)).toThrow();
    });
    it('should return a user object if username is specified', () => {
        username = 'Evans';
        const response = lib.registerUser(username);
        expect(response).toMatchObject({ username: username });
        expect(response.id).not.toBeUndefined();
    });
});

describe('applying discounts', () => {
    //Given
    const order = { customerId: 1, totalPrice: 10 };
    db.getCustomerSync = jest.fn().mockReturnValue({ id: order.id, points: 12 });

    // When
    lib.applyDiscount(order);

    // Then
    expect(order.totalPrice).toBe(9);
});

describe('notifyCustomers', () => {
    // Given
    const order = { customerId: 1, totalPrice: 10 };
    db.getCustomerSync = jest.fn().mockReturnValue({ id: order.customerId, points: 12, email: 'test@gmail.com' });
    mail.send = jest.fn();

    // When
    lib.notifyCustomer(order);

    //Then
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('test@gmail.com');
    expect(mail.send.mock.calls[0][1]).toBe('Your order was placed successfully.');
})