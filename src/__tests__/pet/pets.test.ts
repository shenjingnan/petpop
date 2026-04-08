import { describe, expect, it } from 'vitest';
import { cat } from '../../pet/pets/cat';
import { dog } from '../../pet/pets/dog';
import { dragon } from '../../pet/pets/dragon';
import { fish } from '../../pet/pets/fish';
import { hamster } from '../../pet/pets/hamster';
import { owl } from '../../pet/pets/owl';
import { penguin } from '../../pet/pets/penguin';
import { rabbit } from '../../pet/pets/rabbit';
import type { Pet, PetId } from '../../pet/types';

const allPets: Pet[] = [cat, dog, rabbit, fish, owl, penguin, dragon, hamster];

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

describe('宠物数据完整性', () => {
  for (const pet of allPets) {
    describe(`${pet.id} (${pet.name})`, () => {
      it('应该有有效的 id', () => {
        expect(pet.id).toBeTruthy();
        expect(expectedIds).toContain(pet.id);
      });

      it('应该有非空名称', () => {
        expect(pet.name).toBeTruthy();
        expect(typeof pet.name).toBe('string');
      });

      it('应该有非空描述', () => {
        expect(pet.description).toBeTruthy();
        expect(typeof pet.description).toBe('string');
      });

      it('应该有非空的 art 数组', () => {
        expect(pet.art).toBeTruthy();
        expect(pet.art.length).toBeGreaterThan(0);
      });

      it('art 的每一行应该不超过 80 字符宽度', () => {
        for (const line of pet.art) {
          expect(line.length).toBeLessThanOrEqual(80);
        }
      });

      it('art 的每一行应该是字符串', () => {
        for (const line of pet.art) {
          expect(typeof line).toBe('string');
        }
      });
    });
  }

  it('所有宠物 ID 应该是唯一的', () => {
    const ids = allPets.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('应该恰好有 8 个宠物', () => {
    expect(allPets).toHaveLength(8);
  });
});
