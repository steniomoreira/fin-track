export const COLOR_MAP = {
  blue: {
    bgColor: 'bg-blue-600',
    contentColor: 'bg-blue-600/10 text-blue-600',
  },
  rose: {
    bgColor: 'bg-rose-600',
    contentColor: 'bg-rose-600/10 text-rose-600',
  },
  green: {
    bgColor: 'bg-green-600',
    contentColor: 'bg-green-600/10 text-green-600',
  },
  orange: {
    bgColor: 'bg-orange-600',
    contentColor: 'bg-orange-600/10 text-orange-600',
  },
  purple: {
    bgColor: 'bg-purple-600',
    contentColor: 'bg-purple-600/10 text-purple-600',
  },
  red: { bgColor: 'bg-red-600', contentColor: 'bg-red-600/10 text-red-600' },
  yellow: {
    bgColor: 'bg-yellow-600',
    contentColor: 'bg-yellow-600/10 text-yellow-600',
  },
  black: {
    bgColor: 'bg-black',
    contentColor: 'bg-black/50 text-gray-300',
  },
  fuchsia: {
    bgColor: 'bg-fuchsia-600',
    contentColor: 'bg-fuchsia-600/10 text-fuchsia-600',
  },
  cyan: {
    bgColor: 'bg-cyan-600',
    contentColor: 'bg-cyan-600/10 text-cyan-600',
  },
  indigo: {
    bgColor: 'bg-indigo-600',
    contentColor: 'bg-indigo-600/10 text-indigo-600',
  },
  pink: {
    bgColor: 'bg-pink-600',
    contentColor: 'bg-pink-600/10 text-pink-600',
  },
} as const;

export type ColorName = keyof typeof COLOR_MAP;
export const COLOR_NAMES = Object.keys(COLOR_MAP) as ColorName[];
