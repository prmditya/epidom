// Input validation utilities
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Name validation
export function isValidName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

// Company validation (optional)
export function isValidCompany(company: string): boolean {
  return company.trim().length <= 100;
}

// Waitlist form validation
export function validateWaitlistForm(data: {
  name: string;
  email: string;
  company: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || !isValidName(data.name)) {
    errors.push({
      field: "name",
      message: "Name must be between 2 and 100 characters",
    });
  }

  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  // Validate company (optional)
  if (data.company && !isValidCompany(data.company)) {
    errors.push({
      field: "company",
      message: "Company name must be less than 100 characters",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Rate limiting utility
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];

    // Remove old attempts outside the window
    const validAttempts = attempts.filter((time) => now - time < this.windowMs);

    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }

    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);

    return true;
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;

    const oldestAttempt = Math.min(...attempts);
    const timeElapsed = Date.now() - oldestAttempt;
    return Math.max(0, this.windowMs - timeElapsed);
  }
}

// Global rate limiter instance
export const waitlistRateLimiter = new RateLimiter(3, 15 * 60 * 1000); // 3 attempts per 15 minutes
