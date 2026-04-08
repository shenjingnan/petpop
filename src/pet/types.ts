/** 宠物 ID 联合类型 */
export type PetId = 'cat' | 'dog' | 'rabbit' | 'fish' | 'owl' | 'penguin' | 'dragon' | 'hamster';

/** 宠物数据 */
export interface Pet {
  /** 宠物唯一标识 */
  readonly id: PetId;
  /** 宠物名称 */
  readonly name: string;
  /** 宠物描述 */
  readonly description: string;
  /** ASCII 艺术图案（每行一个字符串） */
  readonly art: readonly string[];
}

/** 宠物显示选项 */
export interface PetDisplayOptions {
  /** 是否显示标题（名称） */
  showTitle?: boolean;
  /** 是否显示描述 */
  showDescription?: boolean;
  /** 是否显示边框 */
  border?: boolean;
}
