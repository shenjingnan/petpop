import {
  getAllPets,
  getAvailablePetIds,
  getPetById,
  getRandomPet,
  listPets,
  renderPet,
} from '../src/pet/index';

console.log('=== PetPop - 电子宠物 ASCII Art ===\n');

// 列出所有宠物
console.log('📋 可用宠物列表:');
console.log(listPets(getAllPets()));
console.log();

// 显示所有宠物 ID
console.log('🆔 所有宠物 ID:', getAvailablePetIds().join(', '));
console.log();

// 根据 ID 获取宠物
console.log('🐱 通过 ID 获取猫:');
const cat = getPetById('cat');
if (cat) {
  console.log(renderPet(cat));
}
console.log();

// 随机获取宠物
console.log('🎲 随机宠物:');
const randomPet = getRandomPet();
console.log(renderPet(randomPet, { border: true }));
console.log();

// 带边框显示
console.log('🐉 带边框的龙:');
const dragon = getPetById('dragon');
if (dragon) {
  console.log(renderPet(dragon, { border: true }));
}
console.log();

// 只显示 art
console.log('🐶 只显示 art:');
const dog = getPetById('dog');
if (dog) {
  console.log(renderPet(dog, { showTitle: false, showDescription: false }));
}
