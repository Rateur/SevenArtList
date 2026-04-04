import { describe, it, expect, vi } from 'vitest';
import { authService } from './auth';

// Mocking Supabase client
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
    },
  },
}));

describe('authService', () => {
  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should have a getSession method', () => {
    expect(authService.getSession).toBeInstanceOf(Function);
  });

  it('should return null when no session exists', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = {} as any; // Mock Supabase client
    const session = await authService.getSession(supabase);
    expect(session).toBeNull();
  });
});
