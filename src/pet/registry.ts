import { cat } from './pets/cat';
import { dog } from './pets/dog';
import { dragon } from './pets/dragon';
import { fish } from './pets/fish';
import { hamster } from './pets/hamster';
import { owl } from './pets/owl';
import { penguin } from './pets/penguin';
import { rabbit } from './pets/rabbit';
import type { Pet, PetId } from './types';

const petMap = new Map<PetId, Pet>([
  [cat.id, cat],
  [dog.id, dog],
  [rabbit.id, rabbit],
  [fish.id, fish],
  [owl.id, owl],
  [penguin.id, penguin],
  [dragon.id, dragon],
  [hamster.id, hamster],
]);

/** 获取所有可用的宠物 ID */
export function getAvailablePetIds(): readonly PetId[] {
  return [...petMap.keys()];
}

/** 获取所有宠物 */
export function getAllPets(): readonly Pet[] {
  return [...petMap.values()];
}

/** 根据 ID 获取宠物 */
export function getPetById(id: PetId): Pet | undefined {
  return petMap.get(id);
}

/** 随机获取一只宠物 */
export function getRandomPet(): Pet {
  const pets = getAllPets();
  const index = Math.floor(Math.random() * pets.length);
  const pet = pets[index];
  if (!pet) {
    throw new Error('No pets available');
  }
  return pet;
}

/** 获取宠物数量 */
export function getPetCount(): number {
  return petMap.size;
}
