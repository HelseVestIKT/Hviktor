import { describe, expect, it } from 'vitest';

describe('hviktor library', () => {
  it('should be importable', async () => {
    const lib = await import('./public-api');
    expect(lib).toBeDefined();
  });
});
