import { describe, expect, it } from 'vitest';
import { listPets, renderPet } from '../../pet/display';
import type { Pet } from '../../pet/types';

const mockPet: Pet = {
  id: 'cat',
  name: 'TestCat',
  description: '测试用猫',
  art: ['  /\\_/\\  ', ' ( o.o ) ', '  > ^ <  '],
};

describe('renderPet', () => {
  it('默认应该包含标题、art 和描述', () => {
    const result = renderPet(mockPet);
    expect(result).toContain('TestCat');
    expect(result).toContain('/\\_/\\');
    expect(result).toContain('测试用猫');
  });

  it('showTitle=false 时不应包含标题', () => {
    const result = renderPet(mockPet, { showTitle: false });
    expect(result).not.toContain('【TestCat】');
    expect(result).toContain('/\\_/\\');
  });

  it('showDescription=false 时不应包含描述', () => {
    const result = renderPet(mockPet, { showDescription: false });
    expect(result).not.toContain('测试用猫');
    expect(result).toContain('TestCat');
  });

  it('border=true 时应包含边框', () => {
    const result = renderPet(mockPet, { border: true });
    expect(result).toContain('┌');
    expect(result).toContain('┐');
    expect(result).toContain('│');
    expect(result).toContain('└');
    expect(result).toContain('┘');
    expect(result).toContain('─');
  });

  it('border=false 时不应包含边框字符', () => {
    const result = renderPet(mockPet, { border: false });
    expect(result).not.toContain('┌');
    expect(result).not.toContain('│');
  });

  it('所有选项都关闭时只输出 art', () => {
    const result = renderPet(mockPet, {
      showTitle: false,
      showDescription: false,
      border: false,
    });
    expect(result).not.toContain('TestCat');
    expect(result).not.toContain('测试用猫');
    expect(result).not.toContain('┌');
    expect(result).toContain('/\\_/\\');
    // 应该只有 art 行，用换行连接
    const lines = result.split('\n');
    expect(lines).toHaveLength(mockPet.art.length);
  });

  it('空 art 应该正常处理', () => {
    const emptyPet: Pet = {
      id: 'cat',
      name: 'Empty',
      description: '空宠物',
      art: [],
    };
    const result = renderPet(emptyPet);
    expect(result).toContain('Empty');
    expect(result).toContain('空宠物');
  });

  it('带边框时每行应该有左右边框符号', () => {
    const result = renderPet(mockPet, { border: true });
    const lines = result.split('\n');
    const borderLines = lines.filter((line) => line.startsWith('│'));
    expect(borderLines.length).toBe(mockPet.art.length);
    for (const line of borderLines) {
      expect(line).toMatch(/^│.*│$/);
    }
  });
});

describe('listPets', () => {
  it('应该正确列出宠物摘要', () => {
    const pets = [mockPet];
    const result = listPets(pets);
    expect(result).toContain('TestCat');
    expect(result).toContain('cat');
    expect(result).toContain('测试用猫');
  });

  it('应该为每个宠物格式化一行', () => {
    const pets = [mockPet, mockPet];
    const result = listPets(pets);
    const lines = result.split('\n');
    expect(lines).toHaveLength(2);
  });

  it('空列表应返回空字符串', () => {
    const result = listPets([]);
    expect(result).toBe('');
  });

  it('格式应包含 id 和描述', () => {
    const result = listPets([mockPet]);
    expect(result).toMatch(/- TestCat \(cat\): 测试用猫/);
  });
});
