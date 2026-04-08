import type { MockInstance } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { main, printHelp, printVersion, showPet } from '../cli';

describe('CLI', () => {
  let logSpy: MockInstance<(message?: unknown, ...optionalParams: unknown[]) => void>;
  let errorSpy: MockInstance<(message?: unknown, ...optionalParams: unknown[]) => void>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit');
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('main', () => {
    it('无参数时应随机显示一只宠物', () => {
      process.argv = ['node', 'cli.js'];
      main();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('│');
    });

    it('list 命令应列出所有宠物', () => {
      process.argv = ['node', 'cli.js', 'list'];
      main();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('Mochi');
      expect(output).toContain('Buddy');
    });

    it('ls 命令应同 list', () => {
      process.argv = ['node', 'cli.js', 'ls'];
      main();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('Mochi');
    });

    it('show 命令加有效 ID 应显示指定宠物', () => {
      process.argv = ['node', 'cli.js', 'show', 'cat'];
      main();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('Mochi');
    });

    it('show 命令缺少 ID 应报错退出', () => {
      process.argv = ['node', 'cli.js', 'show'];
      expect(() => main()).toThrow('process.exit');
      expect(errorSpy).toHaveBeenCalledWith('请指定宠物 ID，例如: petpop show cat');
    });

    it('random 命令应随机显示一只宠物', () => {
      process.argv = ['node', 'cli.js', 'random'];
      main();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('│');
    });

    it('help 命令应显示帮助信息', () => {
      process.argv = ['node', 'cli.js', 'help'];
      main();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('用法');
      expect(output).toContain('petpop');
    });

    it('--help 应同 help', () => {
      process.argv = ['node', 'cli.js', '--help'];
      main();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('用法');
    });

    it('-h 应同 help', () => {
      process.argv = ['node', 'cli.js', '-h'];
      main();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('用法');
    });

    it('version 命令应显示版本信息', () => {
      process.argv = ['node', 'cli.js', 'version'];
      main();
      expect(logSpy).toHaveBeenCalledWith('petpop v0.3.0');
    });

    it('--version 应同 version', () => {
      process.argv = ['node', 'cli.js', '--version'];
      main();
      expect(logSpy).toHaveBeenCalledWith('petpop v0.3.0');
    });

    it('-v 应同 version', () => {
      process.argv = ['node', 'cli.js', '-v'];
      main();
      expect(logSpy).toHaveBeenCalledWith('petpop v0.3.0');
    });

    it('直接用有效宠物 ID 应显示该宠物', () => {
      process.argv = ['node', 'cli.js', 'cat'];
      main();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('Mochi');
    });

    it('未知命令或无效 ID 应报错退出', () => {
      process.argv = ['node', 'cli.js', 'unknown'];
      expect(() => main()).toThrow('process.exit');
      expect(errorSpy).toHaveBeenCalledWith('未知命令或宠物 ID: "unknown"');
    });
  });

  describe('printHelp', () => {
    it('应输出包含用法和可用 ID 的帮助信息', () => {
      printHelp();
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('用法');
      expect(output).toContain('petpop list');
      expect(output).toContain('cat, dog');
    });
  });

  describe('printVersion', () => {
    it('应输出版本号', () => {
      printVersion();
      expect(logSpy).toHaveBeenCalledWith('petpop v0.3.0');
    });
  });

  describe('showPet', () => {
    it('无效 ID 应报错退出', () => {
      expect(() => showPet('invalid')).toThrow('process.exit');
      expect(errorSpy).toHaveBeenCalledWith('未知宠物 ID: "invalid"');
    });

    it('有效 ID 应显示宠物', () => {
      showPet('cat');
      expect(logSpy).toHaveBeenCalled();
      const output = String(logSpy.mock.calls[0]?.[0] ?? '');
      expect(output).toContain('Mochi');
    });
  });
});
