export interface ListProps {
  user?: {
    username?: string;
    photo?: string;
  };
  id: number;
  image?: string;
  likes?: number;
  liked: boolean;
  tags?: string;
  caption?: string;
}
