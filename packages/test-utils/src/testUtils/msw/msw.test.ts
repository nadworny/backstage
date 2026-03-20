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
    let beforeAllSpy: jest.SpyInstance;
    let afterAllSpy: jest.SpyInstance;
    let afterEachSpy: jest.SpyInstance;

    beforeEach(() => {
      beforeAllSpy = jest.spyOn(global, 'beforeAll');
      afterAllSpy = jest.spyOn(global, 'afterAll');
      afterEachSpy = jest.spyOn(global, 'afterEach');
    });

    afterEach(() => {
      beforeAllSpy.mockRestore();
      afterAllSpy.mockRestore();
      afterEachSpy.mockRestore();
    });

    it('should export msw object with setupDefaultHandlers function', () => {
      expect(msw).toBeDefined();
      expect(msw.setupDefaultHandlers).toBeDefined();
      expect(typeof msw.setupDefaultHandlers).toBe('function');
    });

    it('should set up Jest lifecycle hooks with correct handlers', () => {
      const mockListen = jest.fn();
      const mockClose = jest.fn();
      const mockResetHandlers = jest.fn();
      const worker = { 
        listen: mockListen, 
        close: mockClose, 
        resetHandlers: mockResetHandlers 
      };

      msw.setupDefaultHandlers(worker);

      // Verify beforeAll was called with a function
      expect(beforeAllSpy).toHaveBeenCalledTimes(1);
      const beforeAllCallback = beforeAllSpy.mock.calls[0][0] as Function;
      
      // Simulate beforeAll execution by calling the callback
      beforeAllCallback();
      
      // Verify worker.listen was called with the correct options
      expect(mockListen).toHaveBeenCalledWith({ onUnhandledRequest: 'error' });

      // Verify afterAll was called with a function
      expect(afterAllSpy).toHaveBeenCalledTimes(1);
      const afterAllCallback = afterAllSpy.mock.calls[0][0] as Function;
      
      // Simulate afterAll execution
      afterAllCallback();
      expect(mockClose).toHaveBeenCalledTimes(1);

      // Verify afterEach was called with a function
      expect(afterEachSpy).toHaveBeenCalledTimes(1);
      const afterEachCallback = afterEachSpy.mock.calls[0][0] as Function;
      
      // Simulate afterEach execution
      afterEachCallback();
      expect(mockResetHandlers).toHaveBeenCalledTimes(1);
    });
  });
});
