import { describe, expect, it, vi } from 'vitest';
import {
  getAllPets,
  getAvailablePetIds,
  getPetById,
  getPetCount,
  getRandomPet,
} from '../../pet/registry';
import type { PetId } from '../../pet/types';

describe('宠物注册表', () => {
  describe('getPetCount', () => {
    it('应该返回 8 个宠物', () => {
      expect(getPetCount()).toBe(8);
    });
  });

  describe('getAvailablePetIds', () => {
    it('应该返回所有 8 个 ID', () => {
      const ids = getAvailablePetIds();
      expect(ids).toHaveLength(8);
    });

    it('应该包含所有预期的 ID', () => {
      const ids = getAvailablePetIds();
      const expectedIds: PetId[] = [
        'cat',
        'dog',
        'rabbit',
        'fish',
        'owl',
        'penguin',
        'dragon',
        'hamster',
      ];
      for (const id of expectedIds) {
        expect(ids).toContain(id);
      }
    });
  });

  describe('getAllPets', () => {
    it('应该返回 8 个宠物', () => {
      const pets = getAllPets();
      expect(pets).toHaveLength(8);
    });

    it('每个宠物都应该有完整的属性', () => {
      const pets = getAllPets();
      for (const pet of pets) {
        expect(pet.id).toBeTruthy();
        expect(pet.name).toBeTruthy();
        expect(pet.description).toBeTruthy();
        expect(pet.art.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getPetById', () => {
    it('应该通过 ID 获取正确的宠物', () => {
      const cat = getPetById('cat');
      expect(cat).toBeDefined();
      expect(cat?.name).toBe('Mochi');

      const dog = getPetById('dog');
      expect(dog).toBeDefined();
      expect(dog?.name).toBe('Buddy');
    });

    it('对于存在的 ID 应该返回匹配的 id 属性', () => {
      const ids = getAvailablePetIds();
      for (const id of ids) {
        const pet = getPetById(id);
        expect(pet).toBeDefined();
        expect(pet?.id).toBe(id);
      }
    });

    it('传入无效 ID 应返回 undefined', () => {
      const result = getPetById('invalid' as PetId);
      expect(result).toBeUndefined();
    });
  });

  describe('getRandomPet', () => {
    it('应该返回一个有效的宠物', () => {
      const pet = getRandomPet();
      expect(pet).toBeTruthy();
      expect(pet.id).toBeTruthy();
      expect(pet.name).toBeTruthy();
    });

    it('返回的宠物应该在所有宠物列表中', () => {
      const allPets = getAllPets();
      // 多次随机确保稳定性
      for (let i = 0; i < 20; i++) {
        const pet = getRandomPet();
        expect(allPets.some((p) => p.id === pet.id)).toBe(true);
      }
    });

    it('当随机索引越界时应抛出错误', () => {
      vi.spyOn(Math, 'random').mockReturnValue(999);
      expect(() => getRandomPet()).toThrow('No pets available');
      vi.restoreAllMocks();
    });
  });
});
