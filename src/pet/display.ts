import type { Pet, PetDisplayOptions } from './types';

/** 获取字符串的可见宽度（支持 CJK 字符） */
function getVisibleWidth(str: string): number {
  let width = 0;
  for (const char of str) {
    const code = char.codePointAt(0) ?? 0;
    // CJK 字符占两个字符宽度
    if (
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0x3000 && code <= 0x303f) ||
      (code >= 0xff00 && code <= 0xffef)
    ) {
      width += 2;
    } else {
      width += 1;
    }
  }
  return width;
}

/** 重复字符串到指定可见宽度 */
function padToWidth(str: string, targetWidth: number): string {
  const currentWidth = getVisibleWidth(str);
  const padding = Math.max(0, targetWidth - currentWidth);
  return str + ' '.repeat(padding);
}

/** 渲染单个宠物 */
export function renderPet(pet: Pet, options?: PetDisplayOptions): string {
  const { showTitle = true, showDescription = true, border = false } = options ?? {};

  const lines: string[] = [];
  const maxArtWidth = Math.max(...pet.art.map((line) => getVisibleWidth(line)));

  // 标题
  if (showTitle) {
    lines.push(`【${pet.name}】`);
  }

  // 如果需要边框
  if (border) {
    const borderPadding = 4; // 2 左 + 2 右
    const borderWidth = maxArtWidth + borderPadding;
    lines.push(`┌${'─'.repeat(borderWidth)}┐`);
    for (const line of pet.art) {
      const padded = padToWidth(line, maxArtWidth);
      lines.push(`│ ${padded} │`);
    }
    lines.push(`└${'─'.repeat(borderWidth)}┘`);
  } else {
    lines.push(...pet.art);
  }

  // 描述
  if (showDescription) {
    lines.push(pet.description);
  }

  return lines.join('\n');
}

/** 列出所有宠物的摘要信息 */
export function listPets(pets: readonly Pet[]): string {
  return pets.map((pet) => `- ${pet.name} (${pet.id}): ${pet.description}`).join('\n');
}
