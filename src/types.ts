export interface Wish {
  id: string;
  name: string;
  attendance: 'dateng' | 'usahakan' | 'doa';
  message: string;
  emoji: string;
  timestamp: string;
  likes: number;
}

export interface VirtualGift {
  id: string;
  name: string;
  icon: string;
  count: number;
}
