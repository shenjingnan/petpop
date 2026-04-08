import {
  getAllPets,
  getAvailablePetIds,
  getPetById,
  getRandomPet,
  listPets,
  renderPet,
} from './pet/index';
import type { PetId } from './pet/types';

const AVAILABLE_IDS: ReadonlySet<string> = new Set(getAvailablePetIds());

function printHelp(): void {
  console.log(`
petpop - 电子宠物 ASCII Art

用法:
  petpop              随机显示一只宠物
  petpop list         列出所有宠物
  petpop show <id>    显示指定宠物
  petpop random       随机显示一只宠物
  petpop help         显示帮助信息

可用的宠物 ID:
  ${getAvailablePetIds().join(', ')}
`);
}

function printVersion(): void {
  console.log('petpop v0.3.0');
}

function showPet(id: string): void {
  if (!AVAILABLE_IDS.has(id)) {
    console.error(`未知宠物 ID: "${id}"`);
    console.error(`可用的 ID: ${getAvailablePetIds().join(', ')}`);
    process.exit(1);
  }
  const pet = getPetById(id as PetId);
  if (pet) {
    console.log(renderPet(pet, { border: true }));
  }
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(renderPet(getRandomPet(), { border: true }));
    return;
  }

  const command = args[0];
  if (command === undefined) {
    return;
  }

  switch (command) {
    case 'list':
    case 'ls': {
      console.log(listPets(getAllPets()));
      break;
    }
    case 'show': {
      const id = args[1];
      if (!id) {
        console.error('请指定宠物 ID，例如: petpop show cat');
        process.exit(1);
      }
      showPet(id);
      break;
    }
    case 'random': {
      console.log(renderPet(getRandomPet(), { border: true }));
      break;
    }
    case 'help':
    case '--help':
    case '-h': {
      printHelp();
      break;
    }
    case 'version':
    case '--version':
    case '-v': {
      printVersion();
      break;
    }
    default: {
      // 尝试当作宠物 ID 处理
      if (AVAILABLE_IDS.has(command)) {
        showPet(command);
      } else {
        console.error(`未知命令或宠物 ID: "${command}"`);
        console.error('运行 petpop help 查看帮助');
        process.exit(1);
      }
    }
  }
}

main();
