import { render } from '@testing-library/react';
import React from 'react';
import { App } from '../App';

const mockUser: any = null;
const mockAuthReady = true;
const mockAdminFlag = false;

describe('placeholder', () => {
    it('placeholder', () => {
        expect(true).toBe(true);
    })
})

/*

jest.mock('../context/hooks/useAuthorizationContext', () => {
    return jest.fn(() => ({
        user: mockUser,
        authIsReady: mockAuthReady,
        adminFlag: mockAdminFlag
    }))
})

*/
/*
test('can show logged in message', () => {
    //mockIsLoggedIn = true
    //const { getByText } = render(<App />)
    //expect(getByText('Welcome')).toBeTruthy()

    expect(false).toBe(true);
})
*/