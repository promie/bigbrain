import { validateEmail, getInitialFromLoggedInUser } from './helpers';

describe('helpers', () => {
  describe('validateEmail', () => {
    it('should return true if the valid email is passed into the function', () => {
      const email = 'hello@hireup.com.au';

      expect(validateEmail(email)).toBe(true);
    });

    it('should return false if an invalid email is passed into the function', () => {
      const email = 'hello';

      expect(validateEmail(email)).toBe(false);
    });
  });

  describe('getInitialFromLoggedInUser', () => {
    it('should return the first two letter from the email address', () => {
      const email = 'promie@example.com';

      expect(getInitialFromLoggedInUser(email)).toBe('PR');
    });

    it('should return undefined if no email is passed into the function', () => {
      const email = undefined;

      expect(getInitialFromLoggedInUser(email)).toBe(undefined);
    });
  });
});
