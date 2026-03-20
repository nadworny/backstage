/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { msw } from './index';

describe('msw', () => {
  describe('setupDefaultHandlers', () => {
    const createMockWorker = () => ({
      listen: jest.fn(),
      close: jest.fn(),
      resetHandlers: jest.fn(),
    });

    it('should export msw object with setupDefaultHandlers function', () => {
      expect(msw).toBeDefined();
      expect(msw.setupDefaultHandlers).toBeDefined();
      expect(typeof msw.setupDefaultHandlers).toBe('function');
    });

    it('should be a function that accepts a worker with required methods', () => {
      const worker = createMockWorker();

      // The function should be callable and not throw
      expect(() => msw.setupDefaultHandlers(worker)).not.toThrow();
    });

    it('should accept worker with listen, close, and resetHandlers methods', () => {
      const validWorker = {
        listen: jest.fn(),
        close: jest.fn(),
        resetHandlers: jest.fn(),
      };

      // Should not throw with valid worker
      msw.setupDefaultHandlers(validWorker);
    });

    it('should not throw when worker methods are functions', () => {
      const worker = {
        listen: () => {},
        close: () => {},
        resetHandlers: () => {},
      };

      // Function type check passes at runtime
      expect(msw.setupDefaultHandlers(worker)).toBeUndefined();
    });
  });
});
