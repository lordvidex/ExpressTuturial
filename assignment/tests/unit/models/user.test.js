const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require("mongoose")
const { User } = require("../../../models/user")

describe('Generating UserAuthToken',()=>{
    test('should return a valid token',()=>{
        // Given
        const payload = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const user = new User(payload);

        // When
        const token = user.generateAuthToken();
        
        // Then
        expect(token).not.toBeUndefined();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
})